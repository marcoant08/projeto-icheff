import React, { useState, useContext, useRef, useEffect } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import styles from "./styles";
import {
  TextInput,
  ScrollView,
  RectButton,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../../contexts/auth";
import { Modalize } from "react-native-modalize";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-simple-toast";
import StyledInput from "../../components/StyledInput";

function CriarConta() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [pais, setPais] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nome, setNome] = useState("");
  const [criando, setCriando] = useState(false);
  const [userValido, setUservalido] = useState(true);
  const { criar } = useContext(AuthContext);
  const refModalize = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    function verificar() {
      for (let i = 0; i < user.length; i++) {
        if (
          "0123456789abcdefghijklmnopqrstuvwxyz._".includes(user.substr(i, 1))
        ) {
          setUservalido(true);
        } else {
          setUservalido(false);
          return;
        }
      }
    }

    verificar();
  }, [user]);

  /* useEffect(() => {
    setUf(uf.toUpperCase());
  }, [uf]); */

  async function handleCriar() {
    if (
      !nome ||
      !email ||
      !senha ||
      !confirmSenha ||
      !user ||
      !cidade ||
      !uf ||
      !pais ||
      !telefone
    ) {
      Toast.show("Algum campo não foi preenchido.", Toast.SHORT);
      return;
    }

    if (!userValido) {
      Toast.show(
        "Os nomes de usuários só podem usar letras minúsculas, números, sublinhados e pontos.",
        Toast.LONG
      );
      return;
    }

    if (senha.length < 6) {
      Toast.show("Sua senha precisa ter no mínimo 6 caracteres.", Toast.SHORT);
      return;
    }

    if (senha !== confirmSenha) {
      Toast.show("As senhas não correspondem.", Toast.SHORT);
      return;
    }

    setCriando(true);
    await criar(nome, email, senha, user, cidade, uf, pais, telefone);
    setCriando(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={25} color="#cc0000" />
        </TouchableOpacity>
        <Text style={styles.logo}>{" iCheff "}</Text>
        <Text style={styles.titulo}>Criar minha conta</Text>
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <StyledInput
            label="Nome"
            placeholder="Nome"
            autoCorrect={false}
            value={nome}
            onChangeText={setNome}
          />

          <StyledInput
            label="E-mail"
            placeholder="E-mail"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <StyledInput
            label="Cidade"
            placeholder="Cidade"
            autoCorrect={false}
            value={cidade}
            onChangeText={setCidade}
          />

          <StyledInput
            label="UF"
            placeholder="UF"
            maxLength={2}
            autoCorrect={false}
            value={uf}
            onChangeText={setUf}
          />

          <StyledInput
            label="País"
            placeholder="País"
            autoCorrect={false}
            value={pais}
            onChangeText={setPais}
          />

          <StyledInput
            label="Telefone"
            placeholder="Telefone"
            autoCorrect={false}
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
          />

          <RectButton
            style={styles.button}
            onPress={() => refModalize.current?.open()}
          >
            <MaterialCommunityIcons
              style={{ paddingHorizontal: 15 }}
              name="arrow-right-thick"
              color={"white"}
              size={20}
            />
            <Text style={styles.buttonText}>Avançar</Text>
          </RectButton>
        </ScrollView>
      </View>

      <Modalize ref={refModalize}>
        <Text style={[styles.logo, { textAlign: "center", paddingTop: 20 }]}>
          {" iCheff "}
        </Text>
        <Text style={styles.tituloModalize}>
          Agora crie um nome de usuário e uma senha
        </Text>

        <StyledInput
          addStyle={{
            backgroundColor: "#f0f0f0",
            alignSelf: "center",
            color: userValido ? "#000" : "#cc0000",
            borderRadius: 10,
          }}
          label="Nome de Usuário"
          labelColor={userValido ? "#000" : "#cc0000"}
          placeholder="Nome de Usuário"
          placeholderTextColor="#aaa"
          autoCorrect={false}
          value={user}
          onChangeText={setUser}
        />

        <StyledInput
          addStyle={{
            backgroundColor: "#f0f0f0",
            color:
              !!senha && !!confirmSenha && senha !== confirmSenha
                ? "#cc0000"
                : "#000",
          }}
          label="Senha"
          labelColor={
            !!senha && !!confirmSenha && senha !== confirmSenha
              ? "#cc0000"
              : "#000"
          }
          placeholder="Senha"
          placeholderTextColor="#aaa"
          autoCorrect={false}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <StyledInput
          addStyle={{
            backgroundColor: "#f0f0f0",
            color:
              !!senha && !!confirmSenha && senha !== confirmSenha
                ? "#cc0000"
                : "#000",
          }}
          label="Confirmar Senha"
          labelColor={
            !!senha && !!confirmSenha && senha !== confirmSenha
              ? "#cc0000"
              : "#000"
          }
          placeholder="Confirmar Senha"
          placeholderTextColor="#aaa"
          autoCorrect={false}
          value={confirmSenha}
          onChangeText={setConfirmSenha}
          secureTextEntry
        />

        <RectButton style={styles.button} onPress={handleCriar}>
          {criando ? (
            <ActivityIndicator
              style={{ paddingHorizontal: 15 }}
              size={20}
              color={"#fff"}
            />
          ) : (
            <MaterialCommunityIcons
              style={{ paddingHorizontal: 15 }}
              name="account-check-outline"
              color={"white"}
              size={20}
            />
          )}
          <Text style={styles.buttonText}>Criar</Text>
        </RectButton>
      </Modalize>
    </View>
  );
}

export default CriarConta;
