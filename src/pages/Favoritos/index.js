import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import MyHeader from "../../components/MyHeader";
import styles from "./styles";
import { AuthContext } from "../../contexts/auth";
import { TemasContext } from "../../contexts/temas";
import firebase from "../../services/firebaseConnection";
import BoxFavorito from "../../components/BoxFavorito";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Favoritos() {
  const [receitasFavoritadas, setReceitasFavoritadas] = useState({});
  const [carregando, setCarregando] = useState(true);
  const { usuario } = useContext(AuthContext);
  const { tema } = useContext(TemasContext);

  useEffect(() => {
    (async () => {
      await firebase
        .firestore()
        .collection("favoritos")
        .where("autor_id", "==", usuario.id)
        .onSnapshot((querySnapshot) => {
          setReceitasFavoritadas([]);

          querySnapshot.forEach((documentSnapshot) => {
            setReceitasFavoritadas((oldArray) => [
              ...oldArray,
              { id: documentSnapshot.id, ...documentSnapshot.data() },
            ]);
          });

          setCarregando(false);
        })
        .catch((err) => {
          Toast.show("Erro ao favoritar receita.", Toast.SHORT);
        });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MyHeader />
      {carregando ? (
        <ActivityIndicator style={{ paddingTop: 120 }} size={40} color={tema} />
      ) : (
        <>
          <View animation="bounceInLeft" style={styles.numeros}>
            <Text style={styles.numerosText}>
              {receitasFavoritadas.length === 0
                ? `Sem receitas favoritadas.`
                : receitasFavoritadas.length === 1
                ? `1 receita favoritada.`
                : `${receitasFavoritadas.length} receitas favoritadas.`}
            </Text>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={receitasFavoritadas}
            renderItem={({ item, index }) => (
              <BoxFavorito receitaId={item.receita_id} />
            )}
            keyExtractor={(item) => String(item.id)}
          />
        </>
      )}
    </View>
  );
}

export default Favoritos;
