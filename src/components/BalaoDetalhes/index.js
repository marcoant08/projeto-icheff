import React from "react";
import styles from "./styles";
import { View, Text } from "react-native";
import * as Animatable from "react-native-animatable";

function BalaoDetalhes({ titulo, conteudo, children }) {
  return (
    <Animatable.View animation="flipInX" duration={1000} style={styles.balao}>
      <View style={styles.header}>
        <Text style={styles.titulo}>{titulo}</Text>
      </View>
      <View style={styles.conteudo}>
        {!!conteudo && <Text style={styles.text}>{conteudo}</Text>}
        {children}
      </View>
    </Animatable.View>
  );
}

export default BalaoDetalhes;
