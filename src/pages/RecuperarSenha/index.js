import React, { useState } from "react";
import { View, Text, Alert, ActivityIndicator } from "react-native";
import styles from "./styles";
import {
  TextInput,
  RectButton,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import firebase from "../../services/firebaseConnection";
import Toast from "react-native-simple-toast";

function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);
  const navigation = useNavigation();

  async function recuperar() {
    if (!email) {
      Toast.show("Digite um endereço de e-mail.", Toast.SHORT);
      return;
    }

    setEnviando(true);

    await firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then((value) => {
        Alert.alert(
          "Pronto!",
          `Um link de recuperação de senha foi enviado para ${email}`
        );
      })
      .catch((err) => {
        //console.log(err.code);
        if (err.code === "auth/invalid-email") {
          Toast.show("E-mail inválido.", Toast.SHORT);
          return;
        }
        if (err.code === "auth/user-not-found") {
          Toast.show("E-mail não cadastrado.", Toast.SHORT);
          return;
        }

        Toast.show(
          "Erro ao enviar e-mail de recuperação de senha.",
          Toast.SHORT
        );
      });

    setEnviando(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={25} color="#cc0000" />
        </TouchableOpacity>
        <Text style={styles.logo}>{" iCheff "}</Text>
        <Text style={styles.saudacoesText}>
          Informe seu e-mail, nós enviaremos um link de recuperação de senha!
        </Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <RectButton style={styles.button} onPress={recuperar}>
            {enviando ? (
              <ActivityIndicator
                style={{ padding: 15 }}
                size={20}
                color={"#fff"}
              />
            ) : (
              <MaterialCommunityIcons
                style={{ padding: 15 }}
                name="email-lock"
                color={"white"}
                size={20}
              />
            )}
            <Text style={styles.buttonText}>Enviar link</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
}

export default RecuperarSenha;
