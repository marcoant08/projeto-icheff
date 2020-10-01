import React, { useContext, useState, useRef, useEffect } from "react";
import styles from "./styles";
import {
  View,
  Image,
  Text,
  ActivityIndicator,
  ToastAndroid,
  Keyboard,
} from "react-native";
import MyHeader from "../../components/MyHeader";
import { TemasContext } from "../../contexts/temas";
import { AuthContext } from "../../contexts/auth";
import avatarPadrao from "../../assets/avatares/avatar.jpg";
import {
  TouchableOpacity,
  TextInput,
  RectButton,
  ScrollView,
} from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ModalizeFotoOuCamera from "../../components/ModalizeFotoOuCamera";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { v4 as uuidv4 } from "uuid";
import firebase from "../../services/firebaseConnection";
import { useNavigation } from "@react-navigation/native";
import StyledInput from "../../components/StyledInput";

function EditarPerfil() {
  const { tema } = useContext(TemasContext);
  const { usuario, editarUsuario } = useContext(AuthContext);
  const [nome, setNome] = useState(usuario.nome);
  const [user, setUser] = useState(usuario.user);
  const [email, setEmail] = useState(usuario.email);
  const [cidade, setCidade] = useState(usuario.cidade);
  const [uf, setUf] = useState(usuario.uf);
  const [pais, setPais] = useState(usuario.pais);
  const [telefone, setTelefone] = useState(usuario.telefone);
  const [bio, setBio] = useState(usuario.bio);
  const [avatar, setAvatar] = useState(usuario.avatar);
  const refOptions = useRef(null);
  const [imagemEscolhida, setImagemEscolhida] = useState(null);
  const [postando, setPostando] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [userValido, setUservalido] = useState(true);
  const [transferido, setTransferido] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    function verificar() {
      for (let i = 0; i < user.length; i++) {
        if (
          "0123456789abcdefghijklmnopqrstuvwxyz._".includes(user.substr(i, 1))
        ) {
          setUservalido(true);
        } else {
          setUservalido(false);
          return;
        }
      }
    }

    verificar();
  }, [user]);

  async function abrirGaleria() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        ToastAndroid.show(
          "Nós precisamos dessa permissão para escolher uma imagem.",
          ToastAndroid.LONG
        );
        return;
      }
    }

    const data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    console.log(data);

    if (data.cancelled) {
      return;
    }

    if (!data.uri) {
      return;
    }

    setImagemEscolhida(data);
    setAvatar(data.uri);
    refOptions.current?.close();
  }

  async function abrirCamera() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        Alert.alert(
          "Erro!",
          "Nós precisamos dessa permissão para escolher uma imagem."
        );
        return;
      }
    }

    const data = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    console.log(data);

    if (data.cancelled) {
      return;
    }

    if (!data.uri) {
      return;
    }

    setImagemEscolhida(data);
    setAvatar(data.uri);
    refOptions.current?.close();
  }

  async function uploadFoto() {
    setUploading(true);
    setTransferido(0);

    const fileExtension = avatar.split(".").pop();
    console.log("EXT: " + fileExtension);

    let uuid = uuidv4();

    const fileName = `${uuid}.${fileExtension}`;
    console.log("FILENAME: " + fileName);

    const response = await fetch(avatar);
    const blob = await response.blob();

    let storageRef = firebase
      .storage()
      .ref(`usuario-${usuario.id}/avatares/foto-${fileName}`);

    storageRef.put(blob).on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        setTransferido(
          ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2)
        );
      },
      (error) => {
        ToastAndroid.show(
          "Erro ao realizar upload da imagem.",
          ToastAndroid.SHORT
        );
      },
      async () => {
        setUploading(false);
        await storageRef.getDownloadURL().then((downloadUrl) => {
          salvarDados(downloadUrl);
        });
      }
    );
  }

  async function salvarDados(URLFoto) {
    await firebase
      .firestore()
      .collection("usuarios")
      .doc(usuario.id)
      .update(
        !!URLFoto
          ? {
              nome: nome,
              user: user,
              bio: bio,
              email: email,
              telefone: telefone,
              cidade: cidade,
              uf: uf,
              pais: pais,
              avatar: URLFoto,
              updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            }
          : {
              nome: nome,
              user: user,
              bio: bio,
              email: email,
              telefone: telefone,
              cidade: cidade,
              uf: uf,
              pais: pais,
              updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            }
      )
      .then(() => {
        editarUsuario(
          usuario.id,
          nome,
          email,
          bio,
          URLFoto,
          user,
          cidade,
          uf,
          pais,
          telefone
        );
        ToastAndroid.show("Seu perfil foi alterado.", ToastAndroid.SHORT);
      })
      .catch((err) => {
        ToastAndroid.show("Erro ao editar perfil.", ToastAndroid.SHORT);
      });

    setPostando(false);
  }

  async function handleEditar() {
    if (!nome || !user || !email || !telefone || !cidade || !uf || !pais) {
      ToastAndroid.show("Algum campo não foi preenchido.");
      return;
    }

    if (!userValido) {
      ToastAndroid.show(
        "Os nomes de usuários só podem usar letras minúsculas, números, sublinhados e pontos.",
        ToastAndroid.LONG
      );
      return;
    }

    Keyboard.dismiss();
    setPostando(true);

    await firebase
      .firestore()
      .collection("usuarios")
      .where("user", "==", user)
      .get()
      .then(async (querySnapshot) => {
        if (user !== usuario.user && querySnapshot.size > 0) {
          ToastAndroid.show(
            "Este nome de usuário já está sendo utilizado. Por favor, digite outro.",
            ToastAndroid.SHORT
          );
          setPostando(false);
        } else {
          if (!!imagemEscolhida) {
            await uploadFoto();
          } else {
            await salvarDados(null);
          }
        }
      })
      .catch((err) => {
        ToastAndroid.show(
          "Erro ao verificar nome de usuário.",
          ToastAndroid.SHORT
        );
        setPostando(false);
      });
  }

  return (
    <View style={styles.container}>
      <MyHeader back />
      <ScrollView>
        <View style={[styles.cor, { backgroundColor: tema }]}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={
                !!avatar
                  ? () => navigation.navigate("VerFoto", avatar)
                  : () => refOptions.current?.open()
              }
            >
              <Image
                style={styles.avatar}
                source={avatar ? { uri: avatar } : avatarPadrao}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botaoCamera}
              activeOpacity={0.7}
              onPress={() => refOptions.current?.open()}
            >
              <MaterialCommunityIcons
                name="camera-outline"
                size={30}
                color={tema}
              />
            </TouchableOpacity>
          </View>
        </View>

        <StyledInput
          addMargin={{ marginTop: -60 }}
          label="Nome"
          labelColor="#fff"
          placeholder="Nome"
          placeholderTextColor="#aaa"
          onChangeText={setNome}
          value={nome}
        />

        <StyledInput
          AddStyle={{
            borderColor: userValido ? "#aaa" : "#cc0000",
            color: userValido ? "#222" : "#cc0000",
          }}
          label="Nome de Usuário"
          placeholder="Nome de Usuário"
          placeholderTextColor="#aaa"
          onChangeText={setUser}
          value={user}
        />

        <StyledInput
          label="Biografia"
          placeholder="Biografia"
          placeholderTextColor="#aaa"
          onChangeText={setBio}
          value={bio}
          multiline
        />

        <StyledInput
          label="Telefone"
          placeholder="Telefone"
          placeholderTextColor="#aaa"
          onChangeText={setTelefone}
          value={telefone}
        />

        <StyledInput
          label="Cidade"
          placeholder="Cidade"
          placeholderTextColor="#aaa"
          onChangeText={setCidade}
          value={cidade}
        />

        <StyledInput
          label="UF"
          placeholder="UF"
          placeholderTextColor="#aaa"
          onChangeText={setUf}
          value={uf}
        />

        <StyledInput
          label="País"
          placeholder="País"
          placeholderTextColor="#aaa"
          onChangeText={setPais}
          value={pais}
        />

        {uploading && (
          <View style={styles.transferenciaContainer}>
            <View style={styles.barra}>
              <View
                style={[
                  styles.barraTransferencia,
                  { backgroundColor: tema, width: `${transferido}%` },
                ]}
              />
            </View>
            <Text
              style={[
                styles.buttonText,
                { color: "#000", textAlign: "center" },
              ]}
            >
              Enviando foto: {transferido}%
            </Text>
          </View>
        )}
        {!uploading && postando && (
          <Text
            style={[styles.buttonText, { color: "#000", textAlign: "center" }]}
          >
            Salvando dados, aguarde...
          </Text>
        )}

        <RectButton
          style={[styles.button, { backgroundColor: tema, marginBottom: 80 }]}
          onPress={handleEditar}
        >
          {postando ? (
            <ActivityIndicator
              style={{ paddingHorizontal: 10 }}
              size={20}
              color="#fff"
            />
          ) : (
            <MaterialCommunityIcons
              style={{ paddingHorizontal: 10 }}
              name="account-check-outline"
              size={20}
              color="#fff"
            />
          )}
          <Text style={styles.buttonText}>Concluir</Text>
        </RectButton>
      </ScrollView>

      <ModalizeFotoOuCamera
        refOptions={refOptions}
        abrirCamera={() => abrirCamera()}
        abrirGaleria={() => abrirGaleria()}
      />
    </View>
  );
}

export default EditarPerfil;
