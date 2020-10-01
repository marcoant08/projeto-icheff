import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
import MyHeader from "../../components/MyHeader";

function VerFoto({ route }) {
  return (
    <View style={styles.container}>
      <MyHeader back />
      <Image
        style={styles.foto}
        source={{
          uri: route.params,
        }}
        resizeMode="contain"
      />
    </View>
  );
}

export default VerFoto;
