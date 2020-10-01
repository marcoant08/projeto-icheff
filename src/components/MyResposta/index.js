import React, { useContext, useEffect, useState } from "react";
import styles from "./styles";
import { Text, View, Image, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../../contexts/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import firebase from "../../services/firebaseConnection";
import { TemasContext } from "../../contexts/temas";
import * as Animatable from "react-native-animatable";
import avatar from "../../assets/avatares/avatar.jpg";

function MyResposta(props) {
  const { usuario } = useContext(AuthContext);
  const { tema } = useContext(TemasContext);
  const [autor, setAutor] = useState({});
  const [carregando, setCarregando] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      await firebase
        .firestore()
        .collection("usuarios")
        .doc(props.autorId)
        .get()
        .then((snapshot) => {
          setAutor({ id: snapshot.id, ...snapshot.data() });
          setCarregando(false);
        })
        .catch((err) => Alert.alert("Erro!", err));
    })();
  }, []);

  if (!autor.nome) {
    return <View />;
  }

  return (
    <Animatable.View animation="zoomIn" style={styles.container}>
      {carregando ? (
        <ActivityIndicator
          style={{ paddingVertical: 50 }}
          color={tema}
          size={30}
        />
      ) : (
        <>
          <View
            style={[styles.autorContainer, { justifyContent: "space-between" }]}
          >
            <TouchableOpacity
              style={styles.autorContainer}
              onPress={() => navigation.push("OutroPerfil", autor.id)}
            >
              <Image
                style={styles.avatar}
                source={!!autor.avatar ? { uri: autor.avatar } : avatar}
              />
              <View style={styles.nomes}>
                {!!autor.nome ? (
                  <>
                    <Text style={styles.nomeAutor} numberOfLines={1}>
                      {autor.nome?.length > 30
                        ? `${autor.nome?.substr(0, 30)}...`
                        : autor.nome}
                    </Text>
                    <Text style={styles.userAutor} numberOfLines={1}>
                      {autor.user?.length > 30
                        ? `${autor.user?.substr(0, 30)}...`
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
                onPress={() => props.onPressOptions()}
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
          <View style={styles.respostaContainer}>
            <Text style={styles.respostaText}>{props.resposta}</Text>
          </View>
        </>
      )}
    </Animatable.View>
  );
}

export default MyResposta;
