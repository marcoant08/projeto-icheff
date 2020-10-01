import React, { useState } from "react";
import { View, ActivityIndicator, Text, ToastAndroid } from "react-native";
import styles from "./styles";
import { RectButton, TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function EscolherLogin() {
  const [logando, setLogando] = useState(false);
  const navigation = useNavigation();

  function handleLogin() {
    ToastAndroid.show("Logar", ToastAndroid.SHORT);
  }

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.logo}>{" iCheff "}</Text>

        <Text style={styles.saudacoesText}>
          Bem-vindo, como deseja fazer login?
        </Text>

        <RectButton
          style={[styles.button, { backgroundColor: "#cc0000" }]}
          onPress={() => navigation.navigate("Login")}
        >
          {logando ? (
            <ActivityIndicator
              style={{ padding: 15 }}
              size={20}
              color={"#fff"}
            />
          ) : (
            <MaterialCommunityIcons
              style={{ padding: 15 }}
              name="chef-hat"
              color={"white"}
              size={20}
            />
          )}
          <Text style={styles.buttonText}>Entrar com conta iCheff</Text>
        </RectButton>

        <RectButton
          style={[styles.button, { backgroundColor: "#db4a39" }]}
          onPress={handleLogin}
        >
          {logando ? (
            <ActivityIndicator
              style={{ padding: 15 }}
              size={20}
              color={"#fff"}
            />
          ) : (
            <MaterialCommunityIcons
              style={{ padding: 15 }}
              name="google"
              color={"white"}
              size={20}
            />
          )}
          <Text style={styles.buttonText}>Entrar com Google</Text>
        </RectButton>

        <RectButton
          style={[styles.button, { backgroundColor: "#3b5998" }]}
          onPress={handleLogin}
        >
          {logando ? (
            <ActivityIndicator
              style={{ padding: 15 }}
              size={20}
              color={"#fff"}
            />
          ) : (
            <MaterialCommunityIcons
              style={{ padding: 15 }}
              name="facebook"
              color={"white"}
              size={20}
            />
          )}
          <Text style={styles.buttonText}>Entrar com Facebook</Text>
        </RectButton>

        <RectButton
          style={[styles.button, { backgroundColor: "#00acee" }]}
          onPress={handleLogin}
        >
          {logando ? (
            <ActivityIndicator
              style={{ padding: 15 }}
              size={20}
              color={"#fff"}
            />
          ) : (
            <MaterialCommunityIcons
              style={{ padding: 15 }}
              name="twitter"
              color={"white"}
              size={20}
            />
          )}
          <Text style={styles.buttonText}>Entrar com Twitter</Text>
        </RectButton>

        <TouchableOpacity
          style={styles.buttonCriarConta}
          onPress={() => navigation.navigate("CriarConta")}
        >
          <Text style={styles.buttonCriarContaText}>
            Criar uma conta iCheff
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default EscolherLogin;
