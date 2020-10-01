import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Alert,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import {
  TextInput,
  RectButton,
  TouchableOpacity,
  ScrollView,
} from "react-native-gesture-handler";
import { AuthContext } from "../../contexts/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [logando, setLogando] = useState(false);
  const { acessar } = useContext(AuthContext);
  const navigation = useNavigation();

  async function handleLogin() {
    setLogando(true);

    if (email === "" || senha === "") {
      Alert.alert("Atenção", "Preencha todos os campos.");
    } else {
      await acessar(email, senha);
    }

    setLogando(false);
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

        <Text style={styles.saudacoesText}>Olá, seja bem-vindo!</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={[styles.input, { marginBottom: 15 }]}
            placeholder="Senha"
            autoCorrect={false}
            secureTextEntry={true}
            value={senha}
            onChangeText={setSenha}
          />

          <RectButton style={styles.button} onPress={handleLogin}>
            {logando ? (
              <ActivityIndicator
                style={{ padding: 15 }}
                size={20}
                color={"#fff"}
              />
            ) : (
              <MaterialCommunityIcons
                style={{ padding: 15 }}
                name="login-variant"
                color={"white"}
                size={20}
              />
            )}
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>

          <TouchableOpacity
            style={styles.buttonCriarConta}
            onPress={() => navigation.navigate("RecuperarSenha")}
          >
            <Text style={styles.buttonCriarContaText}>
              Esqueceu sua senha? clique aqui.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonCriarConta}
            onPress={() => navigation.navigate("CriarConta")}
          >
            <Text style={styles.buttonCriarContaText}>Criar uma conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Login;
