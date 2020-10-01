import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import MyHeader from "../../components/MyHeader";

function Pesquisar() {
  return (
    <View style={styles.container}>
      <MyHeader />
      <Text>Pesquisar</Text>
    </View>
  );
}

export default Pesquisar;
