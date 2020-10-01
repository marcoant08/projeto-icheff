import React, { useState, useEffect } from "react";
import { Text, View, Image, ActivityIndicator } from "react-native";
import styles from "./styles";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import firebase from "../../services/firebaseConnection";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import foto from "../../assets/fotos/foto.jpg";

function BoxReceita(props) {
  const navigation = useNavigation();
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [carregandoAvaliacoes, setCarregandoAvaliacoes] = useState(true);

  useEffect(() => {
    (async () => {
      await firebase
        .firestore()
        .collection("avaliacoes")
        .where("receita_id", "==", props.id)
        .get()
        .then((snapshot) => {
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

  return (
    <View style={styles.container}>
      <RectButton
        activeOpacity={0.7}
        onPress={() =>
          navigation.push("Detalhes", {
            id: props.id,
            mediaEstrelas: calcularEstrelas(),
            nAvaliacoes: converterNumero(),
          })
        }
      >
        <Image
          style={styles.avatar}
          source={!!props.foto ? { uri: props.foto } : foto}
        />
        <View style={styles.footer}>
          <Text
            style={[
              styles.text,
              { maxWidth: avaliacoes.length > 0 ? "60%" : "90%" },
            ]}
            numberOfLines={1}
          >
            {props.nome}
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
        </View>
      </RectButton>
    </View>
  );
}

export default BoxReceita;
