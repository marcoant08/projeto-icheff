import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import styles from "./styles";
import MyHeader from "../../components/MyHeader";
import { AuthContext } from "../../contexts/auth";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import BoxReceita from "../../components/BoxReceita";
import { TemasContext } from "../../contexts/temas";
import firebase from "../../services/firebaseConnection";
import { useNavigation } from "@react-navigation/native";
import avatar from "../../assets/avatares/avatar.jpg";
import FabButton from "../../components/FabButton";

function Perfil() {
  const { usuario } = useContext(AuthContext);
  const { tema } = useContext(TemasContext);
  const [minhasReceitas, setMinhasReceitas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      await firebase
        .firestore()
        .collection("receitas")
        .where("autor_id", "==", usuario.id)
        .onSnapshot((querySnapshot) => {
          setMinhasReceitas([]);

          querySnapshot.forEach((documentSnapshot) => {
            setMinhasReceitas((oldArray) => [
              ...oldArray,
              { id: documentSnapshot.id, ...documentSnapshot.data() },
            ]);
          });

          setCarregando(false);
        });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MyHeader />
      {carregando ? (
        <ActivityIndicator style={{ paddingTop: 120 }} size={40} color={tema} />
      ) : (
        <FlatList
          ListHeaderComponent={() => (
            <View style={[styles.infosContainer, { backgroundColor: tema }]}>
              {!!usuario.avatar ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.push("VerFoto", usuario.avatar)}
                >
                  <Image
                    style={styles.avatar}
                    source={{ uri: usuario.avatar }}
                  />
                </TouchableOpacity>
              ) : (
                <Image style={styles.avatar} source={avatar} />
              )}
              <Text style={styles.nomeText}>{usuario.nome}</Text>
              <Text style={styles.userText}>{usuario.user}</Text>
              <Text style={styles.nReceitasText}>
                {minhasReceitas.length > 1
                  ? `${minhasReceitas.length} receitas`
                  : minhasReceitas.length === 1
                  ? `${minhasReceitas.length} receita`
                  : "Sem receitas"}
              </Text>
              {!!usuario.bio && (
                <View style={styles.bioContainer}>
                  <Text style={styles.bioText}>{usuario.bio}</Text>
                </View>
              )}
            </View>
          )}
          showsVerticalScrollIndicator={false}
          data={minhasReceitas}
          renderItem={({ item, index }) => (
            <>
              <BoxReceita foto={item.foto} nome={item.nome} id={item.id} />
              {index === minhasReceitas.length - 1 && (
                <View style={{ height: 90 }} />
              )}
            </>
          )}
          keyExtractor={(item) => String(item.id)}
        />
      )}
      {!carregando && <FabButton />}
    </View>
  );
}

export default Perfil;
