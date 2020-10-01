import React, { useState, useContext, useEffect, useRef } from "react";
import {
  View,
  Text,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
  Image,
  ToastAndroid,
} from "react-native";
import MyHeader from "../../components/MyHeader";
import styles from "./styles";
import firebase from "../../services/firebaseConnection";
import {
  TextInput,
  ScrollView,
  RectButton,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { TemasContext } from "../../contexts/temas";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import foto from "../../assets/fotos/foto.jpg";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../../contexts/auth";
import ModalizeFotoOuCamera from "../../components/ModalizeFotoOuCamera";
import StyledInput from "../../components/StyledInput";

function EditarReceita({ route }) {
  const [ingredientes, setIngredientes] = useState("");
  const [preparo, setPreparo] = useState("");
  const [nome, setNome] = useState("");
  const [maisinfos, setMaisinfos] = useState("");
  const [receitaFoto, setReceitaFoto] = useState("");
  const [receitaId, setReceitaId] = useState("");
  const { tema } = useContext(TemasContext);
  const { usuario } = useContext(AuthContext);
  const [postando, setPostando] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const navigation = useNavigation();
  const refOptions = useRef(null);
  const [imagemEscolhida, setImagemEscolhida] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferido, setTransferido] = useState(0);

  useEffect(() => {
    (async () => {
      await firebase
        .firestore()
        .collection("receitas")
        .doc(route.params)
        .get()
        .then((value) => {
          setNome(value.data().nome);
          setReceitaId(value.id);
          setIngredientes(value.data().ingredientes);
          setPreparo(value.data().preparo);
          setMaisinfos(value.data().maisinfos);
          setReceitaFoto(value.data().foto);
          setCarregando(false);
        })
        .catch((err) => {
          ToastAndroid.show(
            "Erro ao recuperar dados da receita.",
            ToastAndroid.SHORT
          );
        });
    })();
  }, []);

  async function abrirGaleria() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        ToastAndroid.show(
          "Nós precisamos dessa permissão para escolher uma imagem.",
          ToastAndroid.SHORT
        );
        return;
      }
    }

    const data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    console.log(data);

    if (data.cancelled) {
      return;
    }

    if (!data.uri) {
      return;
    }

    setImagemEscolhida(data);
    setReceitaFoto(data.uri);
    refOptions.current?.close();
  }

  async function abrirCamera() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        ToastAndroid.show(
          "Nós precisamos dessa permissão para abrir a câmera.",
          ToastAndroid.SHORT
        );
        return;
      }
    }

    const data = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    console.log(data);

    if (data.cancelled) {
      return;
    }

    if (!data.uri) {
      return;
    }

    setImagemEscolhida(data);
    setReceitaFoto(data.uri);
    refOptions.current?.close();
  }

  async function uploadFoto() {
    setUploading(true);
    setTransferido(0);

    const fileExtension = receitaFoto.split(".").pop();
    console.log("EXT: " + fileExtension);

    let uuid = uuidv4();

    const fileName = `${uuid}.${fileExtension}`;
    console.log("FILENAME: " + fileName);

    const response = await fetch(receitaFoto);
    const blob = await response.blob();

    let storageRef = firebase
      .storage()
      .ref(`usuario-${usuario.id}/receita-${receitaId}/foto-${fileName}`);

    storageRef.put(blob).on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        setTransferido(
          ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2)
        );
      },
      (error) => {
        ToastAndroid.show(
          "Erro ao realizar upload da imagem.",
          ToastAndroid.SHORT
        );
      },
      async () => {
        setUploading(false);
        await storageRef.getDownloadURL().then((downloadUrl) => {
          salvarDados(downloadUrl);
        });
      }
    );
  }

  async function salvarDados(URLFoto) {
    await firebase
      .firestore()
      .collection("receitas")
      .doc(route.params)
      .update(
        !!URLFoto
          ? {
              nome: nome,
              ingredientes: ingredientes,
              preparo: preparo,
              maisinfos: maisinfos,
              foto: URLFoto,
            }
          : {
              nome: nome,
              ingredientes: ingredientes,
              preparo: preparo,
              maisinfos: maisinfos,
            }
      )
      .then(() => {
        ToastAndroid.show("Sua receita foi alterada.", ToastAndroid.SHORT);
      })
      .catch((err) => {
        ToastAndroid.show("Erro ao editar receita.", ToastAndroid.SHORT);
      });

    setPostando(false);
  }

  async function handleEditar() {
    if (!ingredientes || !preparo || !nome || !maisinfos) {
      ToastAndroid.show(
        "Você precisa preencher todos os campos.",
        ToastAndroid.SHORT
      );
      return;
    }

    Keyboard.dismiss();
    setPostando(true);

    if (!!imagemEscolhida) {
      await uploadFoto();
    } else {
      await salvarDados(null);
    }
  }

  return (
    <View style={styles.container}>
      <MyHeader back />
      <View style={{ backgroundColor: tema }}>
        <Text style={styles.headerText}>Alterar Receita</Text>
      </View>
      {carregando ? (
        <ActivityIndicator style={{ paddingTop: 120 }} size={40} color={tema} />
      ) : (
        <ScrollView>
          <KeyboardAvoidingView>
            <View style={[styles.cor, { backgroundColor: tema }]}>
              <View style={styles.containerFoto}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={
                    !!receitaFoto
                      ? () => navigation.push("VerFoto", receitaFoto)
                      : () => {}
                  }
                >
                  <Image
                    style={styles.foto}
                    source={receitaFoto ? { uri: receitaFoto } : foto}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.botaoCamera, { borderColor: tema }]}
                  activeOpacity={0.7}
                  onPress={() => refOptions.current?.open()}
                >
                  <MaterialCommunityIcons
                    style={{ padding: 10 }}
                    name="camera-outline"
                    size={30}
                    color={tema}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <StyledInput
              addMargin={{ marginTop: -60 }}
              label="Nome"
              labelColor="#fff"
              placeholder="Nome"
              placeholderTextColor="#aaa"
              onChangeText={setNome}
              value={nome}
            />

            <StyledInput
              label="Ingredientes"
              placeholder="Ingredientes"
              placeholderTextColor="#aaa"
              onChangeText={setIngredientes}
              value={ingredientes}
              multiline
            />

            <StyledInput
              label="Modo de Preparo"
              placeholder="Modo de Prepado"
              placeholderTextColor="#aaa"
              onChangeText={setPreparo}
              value={preparo}
              multiline
            />

            <StyledInput
              label="Mais Informações"
              placeholder="Mais Informações"
              placeholderTextColor="#aaa"
              onChangeText={setMaisinfos}
              value={maisinfos}
              multiline
            />
            {uploading && (
              <View style={styles.transferenciaContainer}>
                <View style={styles.barra}>
                  <View
                    style={[
                      styles.barraTransferencia,
                      { backgroundColor: tema, width: `${transferido}%` },
                    ]}
                  />
                </View>
                <Text
                  style={[
                    styles.buttonText,
                    { color: "#000", textAlign: "center" },
                  ]}
                >
                  Enviando foto: {transferido}%
                </Text>
              </View>
            )}
            {!uploading && postando && (
              <Text
                style={[
                  styles.buttonText,
                  { color: "#000", textAlign: "center" },
                ]}
              >
                Salvando dados, aguarde...
              </Text>
            )}
            <RectButton
              style={[
                styles.button,
                { backgroundColor: tema, marginBottom: 80 },
              ]}
              onPress={handleEditar}
            >
              {postando ? (
                <ActivityIndicator
                  style={{ paddingHorizontal: 10 }}
                  size={20}
                  color="#fff"
                />
              ) : (
                <MaterialCommunityIcons
                  style={{ paddingHorizontal: 10 }}
                  name="chef-hat"
                  size={20}
                  color="#fff"
                />
              )}
              <Text style={styles.buttonText}>Concluir</Text>
            </RectButton>
          </KeyboardAvoidingView>
        </ScrollView>
      )}
      <ModalizeFotoOuCamera
        refOptions={refOptions}
        abrirCamera={abrirCamera}
        abrirGaleria={abrirGaleria}
      />
    </View>
  );
}

export default EditarReceita;
