import React, { useState, useEffect, useContext } from "react";
import { View, Text, ActivityIndicator, Alert, Image } from "react-native";
import styles from "./styles";
import MyHeader from "../../components/MyHeader";
import { TemasContext } from "../../contexts/temas";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import BoxReceita from "../../components/BoxReceita";
import firebase from "../../services/firebaseConnection";
import { useNavigation } from "@react-navigation/native";
import avatar from "../../assets/avatares/avatar.jpg";

function OutroPerfil({ route }) {
  const { tema } = useContext(TemasContext);
  const [outroUsuario, setOutroUsuario] = useState({});
  const [receitas, setReceitas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [carregandoReceitas, setCarregandoReceitas] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      await firebase
        .firestore()
        .collection("usuarios")
        .doc(route.params)
        .get()
        .then((snapshot) => {
          setOutroUsuario({ id: snapshot.id, ...snapshot.data() });
          console.log({ id: snapshot.id, ...snapshot.data() });
          setCarregando(false);
        });
    })();

    (async () => {
      await firebase
        .firestore()
        .collection("receitas")
        .where("autor_id", "==", route.params)
        .get()
        .then((querySnapshot) => {
          setReceitas([]);

          querySnapshot.forEach((documentSnapshot) => {
            setReceitas((oldArray) => [
              ...oldArray,
              { id: documentSnapshot.id, ...documentSnapshot.data() },
            ]);
          });

          setCarregandoReceitas(false);
        });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MyHeader back />
      {carregando ? (
        <ActivityIndicator style={{ paddingTop: 120 }} size={40} color={tema} />
      ) : (
        <FlatList
          ListHeaderComponent={() => (
            <View style={[styles.infosContainer, { backgroundColor: tema }]}>
              {outroUsuario.avatar ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.push("VerFoto", outroUsuario.avatar)
                  }
                >
                  <Image
                    style={styles.avatar}
                    source={{ uri: outroUsuario.avatar }}
                  />
                </TouchableOpacity>
              ) : (
                <Image style={styles.avatar} source={avatar} />
              )}
              <Text style={styles.nomeText}>{outroUsuario.nome}</Text>
              <Text style={styles.userText}>{outroUsuario.user}</Text>
              {!carregandoReceitas ? (
                <Text style={styles.nReceitasText}>
                  {receitas.length > 1
                    ? `${receitas.length} receitas`
                    : receitas.length === 1
                    ? `${receitas.length} receita`
                    : "Sem receitas"}
                </Text>
              ) : (
                <ActivityIndicator
                  style={{ paddingBottom: 10 }}
                  size={24}
                  color="#fff"
                />
              )}
              {!!outroUsuario.bio && (
                <View style={styles.bioContainer}>
                  <Text style={styles.bioText}>{outroUsuario.bio}</Text>
                </View>
              )}
            </View>
          )}
          showsVerticalScrollIndicator={false}
          data={receitas}
          renderItem={({ item, index }) => (
            <BoxReceita foto={item.foto} nome={item.nome} id={item.id} />
          )}
          keyExtractor={(item) => String(item.id)}
        />
      )}
    </View>
  );
}

export default OutroPerfil;
