import React, { useState, useEffect, useContext } from "react";
import { View, ActivityIndicator, TouchableOpacity } from "react-native";
import MyHeader from "../../components/MyHeader";
import MyBox from "../../components/MyBox";
import styles from "./styles";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import firebase from "../../services/firebaseConnection";
import { TemasContext } from "../../contexts/temas";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Home() {
  const [carregando, setCarregado] = useState(true);
  const [receitas, setReceitas] = useState([]);
  const { tema } = useContext(TemasContext);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      await firebase
        .firestore()
        .collection("receitas")
        .get()
        .then((querySnapshot) => {
          setReceitas([]);

          querySnapshot.forEach((documentSnapshot) => {
            setReceitas((oldArray) => [
              ...oldArray,
              { id: documentSnapshot.id, ...documentSnapshot.data() },
            ]);
          });

          setCarregado(false);
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
          showsVerticalScrollIndicator={false}
          data={receitas}
          renderItem={({ item, index }) => (
            <MyBox receitaId={item.id} autorId={item.autor_id} />
          )}
          keyExtractor={(item) => String(item.id)}
        />
      )}
      <View style={styles.containerButton}>
        <TouchableOpacity
          style={[styles.addReceitaButton, { backgroundColor: tema }]}
          onPress={() => navigation.push("NovaReceita")}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            style={{ padding: 5 }}
            name="chef-hat"
            color={"#fff"}
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Home;
