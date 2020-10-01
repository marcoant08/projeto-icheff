import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  Image,
  ToastAndroid,
} from "react-native";
import MyHeader from "../../components/MyHeader";
import styles from "./styles";
import {
  TouchableOpacity,
  ScrollView,
  RectButton,
} from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TemasContext } from "../../contexts/temas";
import firebase from "../../services/firebaseConnection";
import * as Animatable from "react-native-animatable";
import BalaoDetalhes from "../../components/BalaoDetalhes";
import foto from "../../assets/fotos/foto.jpg";
import avatar from "../../assets/avatares/avatar.jpg";
import { AuthContext } from "../../contexts/auth";

function Detalhes({ route }) {
  const { tema } = useContext(TemasContext);
  const { usuario } = useContext(AuthContext);
  const [carregando, setCarregando] = useState(true);
  const [carregandoAutor, setCarregandoAutor] = useState(true);
  const [favoritado, setFavoritado] = useState(false);
  const [favoritando, setFavoritando] = useState(false);
  const [receita, setReceita] = useState({});
  const [autor, setAutor] = useState({});
  const [nFavoritos, setNFavoritos] = useState(0);
  const [idFav, setIdFav] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      await firebase
        .firestore()
        .collection("receitas")
        .doc(route.params.id)
        .onSnapshot((snapshot) => {
          setReceita({ id: snapshot.id, ...snapshot.data() });
          setCarregando(false);
        });
    })();

    (async () => {
      await firebase
        .firestore()
        .collection("favoritos")
        .where("autor_id", "==", usuario.id)
        .where("receita_id", "==", route.params.id)
        .onSnapshot((querySnapshot) => {
          if (querySnapshot.size > 0) {
            setFavoritado(true);

            querySnapshot.forEach((documentSnapshot) => {
              setIdFav(documentSnapshot.id);
            });
          } else {
            setFavoritado(false);
          }
        })
        .catch((err) => {
          Toast.show("Erro ao favoritar receita.", Toast.SHORT);
        });
    })();

    (async () => {
      await firebase
        .firestore()
        .collection("favoritos")
        .where("receita_id", "==", route.params.id)
        .onSnapshot((querySnapshot) => {
          setNFavoritos(querySnapshot.size);
        })
        .catch((err) => {
          Toast.show("Erro carregar número de favoritos.", Toast.SHORT);
        });
    })();
  }, []);

  useEffect(() => {
    async function loadAutor() {
      await firebase
        .firestore()
        .collection("usuarios")
        .doc(receita.autor_id)
        .get()
        .then((snapshot) => {
          setAutor({ id: snapshot.id, ...snapshot.data() });
          setCarregandoAutor(false);
        });
    }

    if (!!receita) loadAutor();
  }, [receita]);

  async function handleExcluir() {
    await Alert.alert(
      "Excluir Receita",
      "Deseja excluir esta receita?\nObs.: A ação não poderá ser desfeita.",
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: async () => {
            await firebase
              .firestore()
              .collection("receitas")
              .doc(receita.id)
              .delete()
              .then(() => {
                const refFavoritos = firebase
                  .firestore()
                  .collection("favoritos")
                  .where("receita_id", "==", receita.id);

                refFavoritos.get().then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    doc.ref.delete();
                  });
                });

                const refAvaliacoes = firebase
                  .firestore()
                  .collection("avaliacoes")
                  .where("receita_id", "==", receita.id);

                refAvaliacoes.get().then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    doc.ref.delete();
                  });
                });

                ToastAndroid.show(
                  "Sua receita foi excluída.",
                  ToastAndroid.SHORT
                );
                navigation.goBack();
              })
              .catch((err) => {
                ToastAndroid.show(
                  "Erro ao exluir receita.",
                  ToastAndroid.SHORT
                );
              });
          },
        },
      ],
      { cancelable: false }
    );
  }

  async function toggleFavoritado() {
    setFavoritando(true);

    if (!favoritado) {
      await firebase
        .firestore()
        .collection("favoritos")
        .add({
          autor_id: usuario.id,
          receita_id: route.params.id,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((value) => {
          //setFavoritado(true);
          setFavoritando(false);
        })
        .catch((err) => {
          Toast.show("Erro ao favoritar receita.", Toast.SHORT);
        });
    } else {
      await firebase
        .firestore()
        .collection("favoritos")
        .doc(idFav)
        .delete()
        .then((value) => {
          //setFavoritado(false);
          setFavoritando(false);
        })
        .catch((err) => {
          Toast.show("Erro ao favoritar receita.", Toast.SHORT);
        });
    }
  }

  return (
    <View style={styles.container}>
      <MyHeader back />
      {carregando ? (
        <ActivityIndicator style={{ paddingTop: 120 }} size={40} color={tema} />
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.infos}>
            <RectButton
              style={styles.foto}
              onPress={
                !!receita.foto
                  ? () => navigation.push("VerFoto", receita.foto)
                  : () =>
                      ToastAndroid.show(
                        "O autor da receita não disponibilizou uma imagem.",
                        ToastAndroid.SHORT
                      )
              }
              activeOpacity={0.8}
            >
              <Image
                style={styles.foto}
                source={!!receita.foto ? { uri: receita.foto } : foto}
              />
            </RectButton>
            <View style={styles.tituloContainer}>
              <Text style={styles.nome}>{receita.nome}</Text>
            </View>

            <BalaoDetalhes
              titulo="Ingredientes"
              conteudo={receita.ingredientes}
            />

            <BalaoDetalhes
              titulo="Modo de Preparo"
              conteudo={receita.preparo}
            />

            <BalaoDetalhes
              titulo="Outras Informações"
              conteudo={receita.maisinfos}
            />

            <BalaoDetalhes titulo="Autor">
              {carregandoAutor ? (
                <ActivityIndicator size={25} color={tema} />
              ) : (
                <View>
                  <TouchableOpacity
                    style={styles.autorContainer}
                    activeOpacity={0.7}
                    onPress={() => navigation.push("OutroPerfil", autor.id)}
                  >
                    <Image
                      style={[
                        styles.avatar,
                        { borderWidth: 2, borderColor: tema },
                      ]}
                      source={!!autor.avatar ? { uri: autor.avatar } : avatar}
                    />
                    <View>
                      <Text style={styles.nomeAutor} numberOfLines={1}>
                        {autor.nome.length > 30
                          ? `${autor.nome.substr(0, 30)}...`
                          : autor.nome}
                      </Text>
                      <Text style={styles.userAutor} numberOfLines={1}>
                        {autor.user.length > 30
                          ? `${autor.user.substr(0, 30)}...`
                          : autor.user}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {usuario.id === autor.id && (
                    <Text style={styles.alerta}>
                      Esta receita é sua e você pode alterá-la!
                    </Text>
                  )}

                  {usuario.id === autor.id && (
                    <View style={styles.buttonsContainer}>
                      <RectButton
                        style={[styles.button, { backgroundColor: tema }]}
                        onPress={() =>
                          navigation.push("EditarReceita", receita.id)
                        }
                      >
                        <MaterialCommunityIcons
                          name="file-document-edit-outline"
                          size={20}
                          color="#fff"
                        />
                        <Text style={styles.buttonText}>Editar</Text>
                      </RectButton>

                      <RectButton
                        style={[styles.button, { backgroundColor: tema }]}
                        onPress={handleExcluir}
                      >
                        <MaterialCommunityIcons
                          name="trash-can-outline"
                          size={20}
                          color="#fff"
                        />
                        <Text style={styles.buttonText}>Excluir</Text>
                      </RectButton>
                    </View>
                  )}
                </View>
              )}
            </BalaoDetalhes>

            <View style={{ height: 70 }} />
          </ScrollView>

          <Animatable.View animation="bounceInRight">
            <TouchableOpacity
              style={styles.stats}
              onPress={() => navigation.push("Avaliacoes", receita.id)}
            >
              <MaterialCommunityIcons
                style={{ paddingLeft: 8, paddingRight: 4 }}
                name="comment-text-multiple-outline"
                color={"#777"}
                size={20}
              />
              <Text style={styles.statsText}>{route.params.nAvaliacoes}</Text>

              {route.params.nAvaliacoes > 0 && (
                <>
                  <MaterialCommunityIcons
                    style={{ paddingLeft: 8, paddingRight: 4 }}
                    name="star"
                    color={"#FFD700"}
                    size={20}
                  />
                  <Text style={styles.statsText}>
                    {route.params.mediaEstrelas}
                  </Text>
                </>
              )}

              <MaterialCommunityIcons
                style={{ paddingLeft: 8, paddingRight: 4 }}
                name="heart"
                color={"#cc0000"}
                size={20}
              />
              <Text style={styles.statsText}>{nFavoritos}</Text>
            </TouchableOpacity>
          </Animatable.View>
        </>
      )}

      {!carregando && (
        <View style={styles.containerButton}>
          <TouchableOpacity
            style={[styles.addReceitaButton, { backgroundColor: tema }]}
            onPress={toggleFavoritado}
            activeOpacity={0.7}
          >
            {favoritando ? (
              <ActivityIndicator color="#fff" size={25} />
            ) : (
              <MaterialCommunityIcons
                style={{ padding: 5 }}
                name={favoritado ? "heart" : "heart-outline"}
                color={"#fff"}
                size={25}
              />
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default Detalhes;
