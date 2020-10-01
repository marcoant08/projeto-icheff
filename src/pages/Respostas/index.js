import React, { useEffect, useState, useContext, useRef } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
} from "react-native";
import styles from "./styles";
import MyHeader from "../../components/MyHeader";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  FlatList,
  RectButton,
  TextInput,
} from "react-native-gesture-handler";
import MyResposta from "../../components/MyResposta";
import { TemasContext } from "../../contexts/temas";
import firebase from "../../services/firebaseConnection";
import { AuthContext } from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";
import NumerosHeader from "../../components/NumerosHeader";
import ModalizeOptions from "../../components/ModalizeOptions";
import * as Animatable from "react-native-animatable";
import { Modalize } from "react-native-modalize";
import avatar from "../../assets/avatares/avatar.jpg";
import Toast from "react-native-simple-toast";

function Respostas({ route }) {
  const { tema } = useContext(TemasContext);
  const { usuario } = useContext(AuthContext);
  const [carregando, setCarregando] = useState(true);
  const [carregandoAutor, setCarregandoAutor] = useState(true);
  const [carregandoAvaliacao, setCarregandoAvaliacao] = useState(true);
  const [postando, setPostando] = useState(false);
  const [respostas, setRespostas] = useState([]);
  const [avaliacao, setAvaliacao] = useState({});
  const [autor, setAutor] = useState({});
  const [resposta, setResposta] = useState("");
  const [atualizador, setAtualizador] = useState(false);
  const [atualizando, setAtualizando] = useState(false);
  const navigation = useNavigation();
  const [respostaNova, setRespostaNova] = useState("");
  const [idSelecionado, setIdSelecionado] = useState("");
  const refOptions = useRef(null);
  const refEditar = useRef(null);

  const onOpenOptions = (parametro) => {
    setIdSelecionado(parametro.id);
    setRespostaNova(parametro.resposta);
    refOptions.current?.open();
  };

  const onOpenEditar = async () => {
    refEditar.current?.open();
  };

  useEffect(() => {
    (async () => {
      await firebase
        .firestore()
        .collection("respostas")
        .where("avaliacao_id", "==", route.params.avaliacaoId)
        .get()
        .then((querySnapshot) => {
          setRespostas([]);

          querySnapshot.forEach((documentSnapshot) => {
            setRespostas((oldArray) => [
              ...oldArray,
              { id: documentSnapshot.id, ...documentSnapshot.data() },
            ]);
          });

          setCarregando(false);
          setAtualizando(false);
        })
        .catch((err) => {
          Toast.show("Erro ao carregar respostas.", Toast.SHORT);
        });
    })();
  }, [atualizador]);

  useEffect(() => {
    (async () => {
      await firebase
        .firestore()
        .collection("avaliacoes")
        .doc(route.params.avaliacaoId)
        .get()
        .then((snapshot) => {
          setAvaliacao({ id: snapshot.id, ...snapshot.data() });
          setCarregandoAvaliacao(false);
        })
        .catch((err) => {
          Toast.show("Erro ao carregar avaliação.", Toast.SHORT);
          //console.log(err.response);
        });
    })();

    (async () => {
      await firebase
        .firestore()
        .collection("usuarios")
        .doc(route.params.autorId)
        .get()
        .then((snapshot) => {
          setAutor({ id: snapshot.id, ...snapshot.data() });
          setCarregandoAutor(false);
        })
        .catch((err) => {
          Toast.show("Erro ao carregar autor.", Toast.SHORT);
          //consol.log(err);
        });
    })();
  }, []);

  async function handleResponder() {
    if (resposta === "" || resposta === null) {
      Toast.show("É necessário escrever algo.", Toast.SHORT);
    } else {
      setPostando(true);

      await firebase
        .firestore()
        .collection("respostas")
        .add({
          resposta,
          autor_id: usuario.id,
          avaliacao_id: route.params.avaliacaoId,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((value) => {
          Keyboard.dismiss();
          Toast.show("Sua resposta foi postada!", Toast.SHORT);
          setRespostas([
            ...respostas,
            {
              id: value.id,
              resposta,
              autor_id: usuario.id,
              avaliacao_id: route.params.avaliacaoId,
            },
          ]);
          setResposta("");
        })
        .catch((err) => {
          Toast.show("Erro ao postar resposta.", Toast.SHORT);
        });

      setPostando(false);
    }
  }

  async function handleEditar() {
    if (!respostaNova) {
      Toast.show("É necesário digitar algo.", Toast.SHORT);
      return;
    }

    Keyboard.dismiss();

    await firebase
      .firestore()
      .collection("respostas")
      .doc(idSelecionado)
      .update({
        resposta: respostaNova,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Toast.show("Sua resposta foi alterada.", Toast.SHORT);
        setRespostas(
          respostas.map((item) => {
            if (item.id !== idSelecionado) {
              return item;
            } else {
              return {
                id: item.id,
                avaliacao_id: item.avaliacao_id,
                autor_id: item.autor_id,
                resposta: respostaNova,
              };
            }
          })
        );
        refEditar.current?.close();
      })
      .catch((err) => {
        Toast.show("Erro ao editar resposta.", Toast.SHORT);
      });
  }

  return (
    <>
      <View style={styles.container}>
        <MyHeader back />
        {carregando ? (
          <ActivityIndicator
            style={{ paddingTop: 120 }}
            size={40}
            color={tema}
          />
        ) : (
          <>
            <NumerosHeader
              respostas={respostas}
              atualizando={atualizando}
              onPressAtualizar={() => {
                setAtualizando(true);
                setAtualizador(!atualizador);
              }}
            />
            <FlatList
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={
                <Animatable.View
                  animation="zoomIn"
                  style={styles.avaliacaoContainer}
                >
                  {carregandoAutor ? (
                    <View
                      style={[
                        styles.autorAvaliacao,
                        { marginLeft: 15, marginVertical: 10 },
                      ]}
                    >
                      <ActivityIndicator
                        style={{ paddingVertical: 10 }}
                        color={tema}
                        size={30}
                      />
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.autorAvaliacao}
                      activeOpacity={0.8}
                      onPress={() =>
                        navigation.push("OutroPerfil", route.params.autorId)
                      }
                    >
                      <Image
                        style={styles.avatar}
                        source={!!autor.avatar ? { uri: autor.avatar } : avatar}
                      />
                      <View style={styles.nomes}>
                        {!!autor.nome ? (
                          <>
                            <Text style={styles.autorNome} numberOfLines={1}>
                              {autor.nome.length > 30
                                ? `${autor.nome.substr(0, 30)}...`
                                : autor.nome}
                            </Text>
                            <Text style={styles.autorUser} numberOfLines={1}>
                              {autor.user.length > 30
                                ? `${autor.user.substr(0, 30)}...`
                                : autor.user}
                            </Text>
                          </>
                        ) : (
                          <Text style={styles.autorNome} numberOfLines={1}>
                            Anônimo
                          </Text>
                        )}
                      </View>
                    </TouchableOpacity>
                  )}
                  {!!avaliacao.comentario && (
                    <View style={styles.comentarioContainer}>
                      <Text style={styles.comentarioText}>
                        {avaliacao.comentario}
                      </Text>
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
                      {carregandoAvaliacao ? (
                        <ActivityIndicator
                          style={{ paddingVertical: 10 }}
                          size={20}
                          color={tema}
                        />
                      ) : (
                        <Text style={styles.avaliacoesText}>
                          {avaliacao.avaliacao}
                        </Text>
                      )}
                    </View>
                  </View>
                </Animatable.View>
              }
              data={respostas}
              renderItem={({ item, index }) => (
                <MyResposta
                  autorId={item.autor_id}
                  resposta={item.resposta}
                  onPressOptions={() => onOpenOptions(item)}
                />
              )}
              keyExtractor={(item) => String(item.id)}
            />
          </>
        )}
      </View>

      <View style={styles.comentarContainer}>
        <TextInput
          style={styles.input}
          placeholder="Resposta"
          placeholderTextColor="#aaa"
          onChangeText={setResposta}
          value={resposta}
        />
        <RectButton
          style={[styles.button, { backgroundColor: tema }]}
          onPress={handleResponder}
        >
          {postando ? (
            <ActivityIndicator
              style={{ paddingHorizontal: 40 }}
              size={20}
              color="#fff"
            />
          ) : (
            <Text style={styles.buttonText}>Responder</Text>
          )}
        </RectButton>
      </View>

      <ModalizeOptions
        refOptions={refOptions}
        idSelecionado={idSelecionado}
        colecao="respostas"
        placeholderTextColor="#aaa"
        onPressEditar={() => {
          refOptions.current?.close();
          onOpenEditar();
        }}
        onPressExcluir={() => {
          setRespostas(respostas.filter((item) => item.id !== idSelecionado));
          Toast.show("Resposta excluída.", Toast.SHORT);
        }}
      />

      <Modalize ref={refEditar} modalHeight={500}>
        <Text style={styles.headerModalize}>Editar Resposta</Text>

        <View style={[styles.comentarContainer, { borderWidth: 0 }]}>
          <TextInput
            style={styles.input}
            placeholder="Resposta"
            onChangeText={setRespostaNova}
            value={respostaNova}
          />
          <RectButton
            style={[styles.button, { backgroundColor: tema }]}
            onPress={handleEditar}
          >
            {postando ? (
              <ActivityIndicator
                style={{ paddingHorizontal: 40 }}
                size={20}
                color="#fff"
              />
            ) : (
              <Text style={styles.buttonText}>Editar</Text>
            )}
          </RectButton>
        </View>
      </Modalize>
    </>
  );
}

export default Respostas;
