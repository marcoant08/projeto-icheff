import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Alert,
  Keyboard,
  ToastAndroid,
} from "react-native";
import MyHeader from "../../components/MyHeader";
import MyAvaliacao from "../../components/MyAvaliacao";
import { FlatList, TextInput, RectButton } from "react-native-gesture-handler";
import styles from "./styles";
import { TemasContext } from "../../contexts/temas";
import firebase from "../../services/firebaseConnection";
import { AuthContext } from "../../contexts/auth";
import { Modalize } from "react-native-modalize";
import NumerosHeader from "../../components/NumerosHeader";
import ModalizeOptions from "../../components/ModalizeOptions";
import Estrelas from "../../components/Estrelas";
//import Toast from "react-native-simple-toast";

function Avaliacoes({ route }) {
  const { tema } = useContext(TemasContext);
  const { usuario } = useContext(AuthContext);
  const [carregando, setCarregando] = useState(true);
  const [atualizador, setAtualizador] = useState(true);
  const [postando, setPostando] = useState(false); //postando
  const [atualizando, setAtualizando] = useState(false); //refresh
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [avaliacao, setAvaliacao] = useState(0);
  const [comentario, setComentario] = useState("");
  const [avaliacaoNova, setAvaliacaoNova] = useState(0);
  const [comentarioNovo, setComentarioNovo] = useState("");
  const [idSelecionado, setIdSelecionado] = useState("");
  const refOptions = useRef(null);
  const refEditar = useRef(null);

  const onOpenOptions = (parametro) => {
    setIdSelecionado(parametro.id);
    setComentarioNovo(parametro.comentario);
    setAvaliacaoNova(parametro.avaliacao);
    refOptions.current?.open();
  };

  const onOpenEditar = async () => {
    refEditar.current?.open();
  };

  useEffect(() => {
    (async () => {
      await firebase
        .firestore()
        .collection("avaliacoes")
        //.orderBy("createdAt", "asc")
        .where("receita_id", "==", route.params)
        .get()
        //.orderBy("avaliacao", "desc")
        //.limit(3)
        .then((querySnapshot) => {
          setAvaliacoes([]);

          querySnapshot.forEach((documentSnapshot) => {
            setAvaliacoes((oldArray) => [
              ...oldArray,
              { id: documentSnapshot.id, ...documentSnapshot.data() },
            ]);
          });

          setCarregando(false);
          setAtualizando(false);
        });
    })();
  }, [atualizador]);

  async function handleComentar() {
    if (avaliacao > 5 || avaliacao < 1) {
      ToastAndroid.show(
        "É necessário avaliar com estrelas.",
        ToastAndroid.SHORT
      );
      return;
    }

    setPostando(true);
    Keyboard.dismiss();

    await firebase
      .firestore()
      .collection("avaliacoes")
      .add({
        avaliacao,
        comentario,
        autor_id: usuario.id,
        receita_id: route.params,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        //refReceita: firebase.firestore().doc("receitas/" + route.params),
      })
      .then((value) => {
        setAvaliacoes([
          ...avaliacoes,
          {
            id: value.id,
            avaliacao,
            comentario,
            autor_id: usuario.id,
            receita_id: route.params,
          },
        ]);
        ToastAndroid.show("Avaliação postada!", ToastAndroid.SHORT);
        setComentario("");
        setAvaliacao(0);
      })
      .catch((err) => {
        Alert.alert("Erro!", "Erro ao postar avaliação.");
      });

    setPostando(false);
  }

  async function handleEditar() {
    Keyboard.dismiss();
    //Alert.alert("Editar");
    await firebase
      .firestore()
      .collection("avaliacoes")
      .doc(idSelecionado)
      .update({
        avaliacao: avaliacaoNova,
        comentario: comentarioNovo,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        ToastAndroid.show("Avaliação alterada!", ToastAndroid.SHORT);
        setAvaliacoes(
          avaliacoes.map((item) => {
            if (item.id !== idSelecionado) {
              return item;
            } else {
              return {
                id: item.id,
                autor_id: item.autor_id,
                receita_id: item.receita_id,
                avaliacao: avaliacaoNova,
                comentario: comentarioNovo,
              };
            }
          })
        );
        refEditar.current?.close();
      })
      .catch((err) => {
        Toast.show("Erro ao salvar edição.", Toast.SHORT);
      });
  }

  return (
    <>
      <View style={{ flex: 1 }}>
        <MyHeader back />
        {carregando ? (
          <ActivityIndicator
            style={{ paddingTop: 120 }}
            size={40}
            color={tema}
          />
        ) : avaliacoes.length > 0 ? (
          <>
            <NumerosHeader
              avaliacoes={avaliacoes}
              onPressAtualizar={() => {
                setAtualizador(!atualizador);
                setAtualizando(true);
              }}
              atualizando={atualizando}
            />

            <FlatList
              showsVerticalScrollIndicator={false}
              data={avaliacoes}
              renderItem={({ item, index }) => (
                <MyAvaliacao
                  id={item.id}
                  autorId={item.autor_id}
                  comentario={item.comentario}
                  avaliacao={item.avaliacao}
                  abrirOpcoes={() => onOpenOptions(item)}
                />
              )}
              keyExtractor={(item) => String(item.id)}
            />
          </>
        ) : (
          <Text style={styles.textSem}>Sem avaliações</Text>
        )}
      </View>
      {!carregando && (
        <View style={styles.avaliarContainer}>
          <Estrelas avaliacao={avaliacao} setAvaliacao={setAvaliacao} />
          <View style={styles.comentarioContainer}>
            <TextInput
              style={styles.input}
              placeholder="Comentário"
              placeholderTextColor="#aaa"
              onChangeText={setComentario}
              value={comentario}
            />
            <RectButton
              style={[styles.button, { backgroundColor: tema }]}
              onPress={handleComentar}
            >
              {postando ? (
                <ActivityIndicator
                  style={{ paddingHorizontal: 25 }}
                  size={20}
                  color="#fff"
                />
              ) : (
                <Text style={styles.buttonText}>Avaliar</Text>
              )}
            </RectButton>
          </View>
        </View>
      )}

      <ModalizeOptions
        refOptions={refOptions}
        idSelecionado={idSelecionado}
        colecao="avaliacoes"
        onPressEditar={() => {
          refOptions.current?.close();
          onOpenEditar();
        }}
        onPressExcluir={() => {
          setAvaliacoes(avaliacoes.filter((item) => item.id !== idSelecionado));
        }}
      />

      <Modalize ref={refEditar} modalHeight={500}>
        <Text style={styles.headerModalize}>Editar Avaliação</Text>
        <View style={[styles.avaliarContainer, { borderWidth: 0 }]}>
          <Estrelas avaliacao={avaliacaoNova} setAvaliacao={setAvaliacaoNova} />

          <View style={styles.comentarioContainer}>
            <TextInput
              style={styles.input}
              placeholder="Comentário"
              placeholderTextColor="#aaa"
              onChangeText={setComentarioNovo}
              value={comentarioNovo}
            />
            <RectButton
              style={[styles.button, { backgroundColor: tema }]}
              onPress={handleEditar}
            >
              {postando ? (
                <ActivityIndicator size={20} color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Editar</Text>
              )}
            </RectButton>
          </View>
        </View>
      </Modalize>
    </>
  );
}

export default Avaliacoes;
