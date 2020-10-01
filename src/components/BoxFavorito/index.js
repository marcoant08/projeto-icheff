import React, { useEffect, useState } from "react";
import { View, Text, Image, Alert, ActivityIndicator } from "react-native";
import styles from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import firebase from "../../services/firebaseConnection";
import avatar from "../../assets/avatares/avatar.jpg";
import foto from "../../assets/fotos/foto.jpg";

function BoxFavorito(props) {
  const navigation = useNavigation();
  const [autor, setAutor] = useState({});
  const [receita, setReceita] = useState({});
  const [avaliacoes, setAvaliacoes] = useState([1, 2]);
  const [carregandoAutor, setCarregandoAutor] = useState(true);
  const [carregandoReceita, setCarregandoReceita] = useState(true);
  const [carregandoAvaliacoes, setCarregandoAvaliacoes] = useState(true);

  useEffect(() => {
    (async () => {
      await firebase
        .firestore()
        .collection("receitas")
        .doc(props.receitaId)
        .get()
        .then((snapshot) => {
          setReceita({ id: snapshot.id, ...snapshot.data() });
          setCarregandoReceita(false);
        });
    })();

    (async () => {
      await firebase
        .firestore()
        .collection("avaliacoes")
        .where("receita_id", "==", props.receitaId)
        .onSnapshot((snapshot) => {
          setAvaliacoes([]);

          snapshot.forEach((documentSnapshot) => {
            setAvaliacoes((oldArray) => [
              ...oldArray,
              { id: documentSnapshot.id, ...documentSnapshot.data() },
            ]);
          });

          setCarregandoAvaliacoes(false);
        });
      //.catch((err) => Alert.alert("Erro!", 'Erro ao carregar número de respostas'));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!!receita)
        await firebase
          .firestore()
          .collection("usuarios")
          .doc(receita.autor_id)
          .get()
          .then((snapshot) => {
            setAutor({ id: snapshot.id, ...snapshot.data() });
            setCarregandoAutor(false);
          });
    })();
  }, [receita]);

  function calcularEstrelas() {
    let cont = 0;

    avaliacoes.forEach((item) => {
      cont += Number(item.avaliacao);
    });

    return (cont / avaliacoes.length).toFixed(1);
  }

  function converterNumero() {
    if (avaliacoes.length >= 1000000000) {
      return `${(avaliacoes.length / 1000000000).toFixed(2)} B`;
    } else if (avaliacoes.length >= 1000000) {
      return `${(avaliacoes.length / 1000000).toFixed(2)} M`;
    } else if (avaliacoes.length >= 1000) {
      return `${(avaliacoes.length / 1000).toFixed(2)} K`;
    } else {
      return avaliacoes.length;
    }
  }

  if (!autor.nome || !receita.nome) {
    return <View />;
  }

  return (
    <View>
      <View style={styles.container}>
        <RectButton
          style={styles.receita}
          onPress={() =>
            navigation.push("Detalhes", {
              id: receita.id,
              mediaEstrelas: calcularEstrelas(),
              nAvaliacoes: converterNumero(),
            })
          }
        >
          <Image
            style={styles.receitaImagem}
            source={
              !!receita.foto
                ? {
                    uri: receita.foto,
                  }
                : foto
            }
          />
        </RectButton>
      </View>
      <View style={styles.footer}>
        {carregandoReceita ? (
          <View style={[styles.autor, { marginHorizontal: 40 }]}>
            <ActivityIndicator color="#fff" size={30} />
          </View>
        ) : (
          <RectButton
            style={styles.receitaNome}
            onPress={() =>
              navigation.push("Detalhes", {
                id: receita.id,
                mediaEstrelas: calcularEstrelas(),
                nAvaliacoes: converterNumero(),
              })
            }
          >
            <Text
              style={[
                styles.receitaNomeText,
                { maxWidth: avaliacoes.length > 0 ? "60%" : "85%" },
              ]}
              numberOfLines={1}
            >
              {receita.nome}
            </Text>
            <View style={styles.stats}>
              {avaliacoes.length > 0 && (
                <MaterialCommunityIcons
                  style={{ paddingLeft: 8, paddingRight: 4 }}
                  name="star"
                  color={"#FFD700"}
                  size={20}
                />
              )}
              {carregandoAvaliacoes ? (
                <ActivityIndicator size={20} color="#fff" />
              ) : (
                avaliacoes.length > 0 && (
                  <Text style={styles.statsText}>{calcularEstrelas()}</Text>
                )
              )}
              <MaterialCommunityIcons
                style={{ paddingLeft: 8, paddingRight: 4 }}
                name="comment-text-multiple-outline"
                color={"#ddd"}
                size={20}
              />
              {carregandoAvaliacoes ? (
                <ActivityIndicator size={20} color="#fff" />
              ) : (
                <Text style={styles.statsText} numberOfLines={1}>
                  {converterNumero()}
                </Text>
              )}
            </View>
          </RectButton>
        )}
        {carregandoAutor ? (
          <View style={[styles.autor, { marginHorizontal: 40 }]}>
            <ActivityIndicator color="#fff" size={30} />
          </View>
        ) : (
          <RectButton
            style={styles.autor}
            onPress={() => navigation.push("OutroPerfil", autor.id)}
            activeOpacity={0.8}
          >
            <Image
              style={styles.autorAvatar}
              source={!!autor.avatar ? { uri: autor.avatar } : avatar}
            />
            <View style={styles.nomes}>
              <Text style={styles.autorNomeText} numberOfLines={1}>
                {autor.nome.length > 35
                  ? `${autor.nome.substr(0, 35)}...`
                  : autor.nome}
              </Text>
              <Text style={styles.autorUserText} numberOfLines={1}>
                {autor.user.length > 35
                  ? `${autor.user.substr(0, 35)}...`
                  : autor.user}
              </Text>
            </View>
          </RectButton>
        )}
      </View>
    </View>
  );
}

export default BoxFavorito;
