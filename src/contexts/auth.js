import React, { createContext, useState, useEffect } from "react";
import { AsyncStorage, Alert, ToastAndroid } from "react-native";
import firebase from "../services/firebaseConnection";

export const AuthContext = createContext({});

console.disableYellowBox = true;

function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      await AsyncStorage.getItem("@icheff:usuario")
        .then((resp) => {
          setUsuario(JSON.parse(resp));
          setLoading(false);
        })
        .catch((err) => {
          console.log("erro asyncstorage");
        });
    }

    load();
  }, []);

  async function acessar(email, senha) {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, senha)
      .then(async (value) => {
        await firebase
          .firestore()
          .collection("usuarios")
          .doc(value.user.uid)
          .get()
          .then(async (snapshot) => {
            setUsuario({ id: snapshot.id, ...snapshot.data() });
            await AsyncStorage.setItem(
              "@icheff:usuario",
              JSON.stringify({
                id: snapshot.id,
                ...snapshot.data(),
              })
            );
          })
          .catch((err) => {
            ToastAndroid.show("Erro ao salvar usuário.", ToastAndroid.SHORT);
          });
      })
      .catch((err) => {
        //ToastAndroid.show(err.code);
        //console.log(err.code);
        if (err.code === "auth/invalid-email") {
          ToastAndroid.show("E-mail inválido.", ToastAndroid.SHORT);
          return;
        }
        if (err.code === "auth/user-not-found") {
          ToastAndroid.show("E-mail não cadastrado.", ToastAndroid.SHORT);
          return;
        }
        if (err.code === "auth/wrong-password") {
          ToastAndroid.show("Senha incorreta.", ToastAndroid.SHORT);
          return;
        }
        if (err.code === "auth/too-many-requests") {
          ToastAndroid.show(
            "Erro!",
            "Muitas tentativas erradas. Esqueceu sua senha? Você tem a opção de recuperá-la!"
          );
          return;
        }
        ToastAndroid.show("Algo deu errado.", ToastAndroid.SHORT);
      });
  }

  async function sair() {
    await firebase.auth().signOut();
    await AsyncStorage.removeItem("@icheff:usuario");
    setUsuario(null);
  }

  async function criar(nome, email, senha, user, cidade, uf, pais, telefone) {
    await firebase
      .firestore()
      .collection("usuarios")
      .where("user", "==", user)
      .get()
      .then(async (querySnapshot) => {
        if (querySnapshot.size > 0) {
          ToastAndroid.show(
            "Este nome de usuário já está sendo utilizado. Por favor, digite outro",
            ToastAndroid.LONG
          );
        } else {
          await firebase
            .auth()
            .createUserWithEmailAndPassword(email, senha)
            .then(async (value) => {
              await firebase
                .firestore()
                .collection("usuarios")
                .doc(value.user.uid)
                .set({
                  nome,
                  email,
                  user,
                  cidade,
                  uf,
                  pais,
                  telefone,
                  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                })
                .then(async (snapshot) => {
                  ToastAndroid.show(
                    "Usuário criado com sucesso.",
                    ToastAndroid.SHORT
                  );
                  setUsuario({
                    id: value.user.uid,
                    nome,
                    email,
                    user,
                    cidade,
                    uf,
                    pais,
                    telefone,
                  });
                  await AsyncStorage.setItem(
                    "@icheff:usuario",
                    JSON.stringify({
                      id: value.user.uid,
                      nome,
                      email,
                      user,
                      cidade,
                      uf,
                      pais,
                      telefone,
                    })
                  );
                })
                .catch((err) => {
                  ToastAndroid.show(
                    "Erro ao registrar dados do usuário.",
                    ToastAndroid.SHORT
                  );
                  console.log(err);
                });
            })
            .catch((err) => {
              //console.log(err.code);
              //ToastAndroid.show("Erro ao criar autenticação de usuário.");
              if (err.code === "auth/invalid-email") {
                ToastAndroid.show("E-mail inválido.", ToastAndroid.SHORT);
              }
              if (err.code === "auth/weak-password") {
                ToastAndroid.show("Senha muito fraca.", ToastAndroid.SHORT);
              }
              if (err.code === "auth/email-already-in-use") {
                ToastAndroid.show(
                  "O e-mail digitado já foi cadastrado.\nNão lembra a senha? Você pode recuperá-la.",
                  ToastAndroid.SHORT
                );
              }
            });
        }
      })
      .catch((err) => {
        ToastAndroid.show(
          "Erro",
          "Erro ao verificar nome de usuário.",
          ToastAndroid.SHORT
        );
      });
  }

  async function editarUsuario(
    id,
    nome,
    email,
    bio,
    avatar,
    user,
    cidade,
    uf,
    pais,
    telefone
  ) {
    setUsuario(
      !!avatar
        ? {
            id,
            nome,
            email,
            bio,
            avatar,
            user,
            cidade,
            uf,
            pais,
            telefone,
          }
        : {
            id,
            nome,
            email,
            bio,
            avatar: usuario.avatar,
            user,
            cidade,
            uf,
            pais,
            telefone,
          }
    );

    await AsyncStorage.setItem(
      "@icheff:usuario",
      JSON.stringify(
        !!avatar
          ? {
              id,
              nome,
              email,
              bio,
              avatar,
              user,
              cidade,
              uf,
              pais,
              telefone,
            }
          : {
              id,
              nome,
              email,
              bio,
              avatar: usuario.avatar,
              user,
              cidade,
              uf,
              pais,
              telefone,
            }
      )
    );
  }

  return (
    <AuthContext.Provider
      value={{
        loading,
        signed: !!usuario,
        usuario,
        acessar,
        sair,
        criar,
        editarUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
