import React, { useContext, useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  ActivityIndicator,
  Modal,
  ToastAndroid,
} from "react-native";
import styles from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/auth";
import firebase from "../../services/firebaseConnection";
import { TemasContext } from "../../contexts/temas";
import * as Animatable from "react-native-animatable";
import avatar from "../../assets/avatares/avatar.jpg";

function MyAvaliacao(props) {
  const navigation = useNavigation();
  const { usuario } = useContext(AuthContext);
  const { tema } = useContext(TemasContext);
  const [autor, setAutor] = useState({});
  const [carregando, setCarregando] = useState(true);
  const [carregandoRespostas, setCarregandoRespostas] = useState(true);
  const [nRespostas, setNRespostas] = useState(null);

  useEffect(() => {
    (async () => {
      await firebase
        .firestore()
        .collection("usuarios")
        .doc(props.autorId)
        .get()
        .then((snapshot) => {
          setAutor({ id: snapshot.id, ...snapshot.data() });
          //console.log({ id: snapshot.id, ...snapshot.data() });
          setCarregando(false);
        })
        .catch((err) =>
          ToastAndroid.show(
            "Erro ao carregar dados do autor.",
            ToastAndroid.SHORT
          )
        );
    })();

    (async () => {
      await firebase
        .firestore()
        .collection("respostas")
        .where("avaliacao_id", "==", props.id)
        .get()
        .then((snapshot) => {
          setNRespostas(snapshot.size);
          setCarregandoRespostas(false);
        })
        .catch((err) =>
          ToastAndroid.show(
            "Erro ao carregar número de respostas.",
            ToastAndroid.SHORT
          )
        );
    })();
  }, []);

  //if (!autor) return;

  if (!autor.nome) {
    return <View />;
  }

  return (
    <Animatable.View animation="zoomIn" style={styles.container}>
      {carregando ? (
        <ActivityIndicator
          style={{ paddingVertical: 35 }}
          size={40}
          color={tema}
        />
      ) : (
        <>
          <View style={[styles.autor, { justifyContent: "space-between" }]}>
            <TouchableOpacity
              style={styles.autor}
              onPress={() => navigation.push("OutroPerfil", autor.id)}
              activeOpacity={0.8}
            >
              <Image
                style={styles.avatar}
                source={!!autor.avatar ? { uri: autor.avatar } : avatar}
              />
              <View>
                {!!autor.nome ? (
                  <>
                    <Text style={styles.nomeAutor} numberOfLines={1}>
                      {autor.nome?.length > 25
                        ? `${autor.nome?.substr(0, 25)}...`
                        : autor.nome}
                    </Text>
                    <Text style={styles.userAutor} numberOfLines={1}>
                      {autor.user?.length > 25
                        ? `${autor.user?.substr(0, 25)}...`
                        : autor.user}
                    </Text>
                  </>
                ) : (
                  <Text style={styles.nomeAutor} numberOfLines={1}>
                    Anônimo
                  </Text>
                )}
              </View>
            </TouchableOpacity>
            {autor.id === usuario.id && (
              <TouchableOpacity
                style={styles.optionsButton}
                onPress={props.abrirOpcoes}
              >
                <MaterialCommunityIcons
                  style={{ paddingLeft: 8, paddingRight: 4 }}
                  name="dots-vertical"
                  color="#555"
                  size={20}
                />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.push("Respostas", {
                avaliacaoId: props.id,
                autorId: props.autorId,
              })
            }
            activeOpacity={0.8}
          >
            {!!props.comentario && (
              <View style={styles.conteudo}>
                <Text style={styles.comentario}>{props.comentario}</Text>
              </View>
            )}
            <View style={styles.stats}>
              <View style={styles.estrelas}>
                <MaterialCommunityIcons
                  style={{ paddingLeft: 8, paddingRight: 4 }}
                  name="star"
                  color="#FFD700"
                  size={20}
                />
                <Text style={styles.respostasText}>{props.avaliacao}</Text>
              </View>
              <View style={styles.respostasContainer}>
                <MaterialCommunityIcons
                  style={{ paddingLeft: 8, paddingRight: 4 }}
                  name="comment-text-multiple-outline"
                  color={nRespostas > 0 ? "#555" : "#aaa"}
                  size={20}
                />
                {carregandoRespostas ? (
                  <ActivityIndicator
                    size={20}
                    color={tema}
                    style={{ paddingHorizontal: 15, marginRight: 15 }}
                  />
                ) : (
                  <Text style={styles.respostasText}>
                    {nRespostas > 0
                      ? nRespostas > 1
                        ? `${nRespostas} respostas`
                        : `1 resposta`
                      : "Sem respostas"}
                  </Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        </>
      )}
    </Animatable.View>
  );
}

export default MyAvaliacao;
