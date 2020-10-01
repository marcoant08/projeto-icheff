import React, { useState, useContext, useRef } from "react";
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
import { AuthContext } from "../../contexts/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { v4 as uuidv4 } from "uuid";
import ModalizeFotoOuCamera from "../../components/ModalizeFotoOuCamera";
import foto from "../../assets/fotos/foto.jpg";
import { useNavigation } from "@react-navigation/native";
import StyledInput from "../../components/StyledInput";

function NovaReceita() {
  const [ingredientes, setIngredientes] = useState("");
  const [preparo, setPreparo] = useState("");
  const [nome, setNome] = useState("");
  const [maisinfos, setMaisinfos] = useState("");
  const { tema } = useContext(TemasContext);
  const { usuario } = useContext(AuthContext);
  const [postando, setPostando] = useState(false);
  const refOptions = useRef(null);
  const [imagemEscolhida, setImagemEscolhida] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferido, setTransferido] = useState(0);
  const [receitaFoto, setReceitaFoto] = useState("");
  const [receitaId, setReceitaId] = useState("");
  const navigation = useNavigation();

  async function abrirGaleria() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        ToastAndroid.show(
          "Nós precisamos dessa permissão para escolher uma imagem.",
          ToastAndroid.LONG
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
          ToastAndroid.LONG
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
      .add(
        !!URLFoto
          ? {
              nome,
              ingredientes,
              preparo,
              maisinfos,
              autor_id: usuario.id,
              foto: URLFoto,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            }
          : {
              nome,
              ingredientes,
              preparo,
              maisinfos,
              autor_id: usuario.id,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              ref: firebase.firestore().collection("usuarios").doc(usuario.id),
            }
      )
      .then((value) => {
        ToastAndroid.show("Sua receita foi publicada.", ToastAndroid.SHORT);
        setNome("");
        setIngredientes("");
        setPreparo("");
        setMaisinfos("");
      })
      .catch((err) => {
        ToastAndroid.show("Erro ao publicar receita.", ToastAndroid.SHORT);
      });

    setReceitaFoto(null);
    setImagemEscolhida(null);
    setTransferido(0);
    setPostando(false);
  }

  async function handlePublicar() {
    if (!ingredientes || !preparo || !nome || !maisinfos) {
      ToastAndroid.show(
        "Você precisa preencher todos os campos.",
        ToastAndroid.SHORT
      );
      return;
    }

    setPostando(true);
    Keyboard.dismiss();

    if (!!imagemEscolhida) {
      await uploadFoto();
    } else {
      await salvarDados(null);
    }
  }

  function padronizar() {
    Alert.alert(
      "Padronizar",
      "Escolha o campo que deseja padronizar.",
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Ingredientes",
          onPress: () => padronizarIgredientes(),
        },
        {
          text: "Preparo",
          onPress: () => padronizarPreparo(),
        },
      ],
      { cancelable: false }
    );
  }

  function padronizarIgredientes() {
    if (!!ingredientes) {
      Alert.alert(
        "Atenção",
        `O campo "Ingredientes" possui algum texto digitado. Caso você prossiga, o campo será totalmente alterado. Deseja continuar?`,
        [
          {
            text: "Cancelar",
            onPress: () => {},
            style: "cancel",
          },
          {
            text: "Sim",
            onPress: () => {
              ToastAndroid.show(
                `Um padrão foi adicionado ao campo "Ingredientes". Agora você precisa editá-lo.`,
                ToastAndroid.LONG
              );
              setIngredientes(
                "• 3 colheres de tal ingrediente (exemplo)\n• \n• \n• "
              );
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      ToastAndroid.show(
        `Um padrão foi adicionado ao campo "Ingredientes". Agora você precisa editá-lo.`,
        ToastAndroid.LONG
      );
      setIngredientes("• 3 colheres de tal ingrediente (exemplo)\n• \n• \n• ");
    }
  }

  function padronizarPreparo() {
    if (!!preparo) {
      Alert.alert(
        "Atenção",
        `O campo "Modo de Preparo" possui algum texto digitado. Caso você prossiga, o campo será totalmente alterado. Deseja continuar?`,
        [
          {
            text: "Cancelar",
            onPress: () => {},
            style: "cancel",
          },
          {
            text: "Sim",
            onPress: () => {
              ToastAndroid.show(
                `Um padrão foi adicionado ao campo "Modo de Preparo". Agora você precisa editá-lo.`,
                ToastAndroid.LONG
              );
              setPreparo("1 - misture (exemplo);\n2 - \n3 - \n4 - ");
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      ToastAndroid.show(
        `Um padrão foi adicionado ao campo "Modo de Preparo". Agora você precisa editá-lo.`,
        ToastAndroid.LONG
      );
      setPreparo("1 - misture (exemplo);\n2 - \n3 - \n4 - ");
    }
  }

  return (
    <View style={styles.container}>
      <MyHeader back />
      <View style={{ backgroundColor: tema }}>
        <Text style={styles.headerText}>Adicionar Receita</Text>
      </View>
      <ScrollView>
        <KeyboardAvoidingView>
          <View style={[styles.cor, { backgroundColor: tema }]}>
            <View style={styles.containerFoto}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={
                  !!receitaFoto
                    ? () => navigation.push("VerFoto", receitaFoto)
                    : () => refOptions.current?.open()
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

            <View style={styles.viewHelp}>
              <Text style={styles.textHelp}>
                Você pode padronizar as informações da sua receita!
              </Text>
              <TouchableOpacity
                style={styles.helpButton}
                activeOpacity={0.7}
                onPress={padronizar}
              >
                <MaterialCommunityIcons
                  name="help-circle-outline"
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
            style={[styles.button, { backgroundColor: tema, marginBottom: 80 }]}
            onPress={handlePublicar}
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
            <Text style={styles.buttonText}>Publicar</Text>
          </RectButton>
        </KeyboardAvoidingView>
      </ScrollView>
      <ModalizeFotoOuCamera
        refOptions={refOptions}
        abrirCamera={() => abrirCamera()}
        abrirGaleria={() => abrirGaleria()}
      />
    </View>
  );
}

export default NovaReceita;
