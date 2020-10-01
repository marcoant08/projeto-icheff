import React, { useContext } from "react";
import { Modalize } from "react-native-modalize";
import { Text, Alert } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./styles";
import { TemasContext } from "../../contexts/temas";
import firebase from "../../services/firebaseConnection";
import Toast from "react-native-simple-toast";

function ModalizeOptions({
  refOptions,
  onPressEditar,
  onPressExcluir,
  idSelecionado,
  colecao,
}) {
  const { tema } = useContext(TemasContext);

  async function handleExcluir() {
    await Alert.alert(
      "Atenção!",
      "Deseja excluir?\nObs.: A ação não poderá ser desfeita.",
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: async () => {
            await firebase
              .firestore()
              .collection(colecao)
              .doc(idSelecionado)
              .delete()
              .then(() => {
                onPressExcluir();
                refOptions.current?.close();
                Toast.show("Excluído com sucesso.", Toast.SHORT);
              })
              .catch((err) => {
                Toast.show("Erro ao excluir.", Toast.SHORT);
              });
          },
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <Modalize ref={refOptions} modalHeight={250}>
      <Text style={styles.headerModalize}>Opções</Text>

      <RectButton
        onPress={() => handleExcluir()}
        style={[styles.button, { backgroundColor: tema }]}
      >
        <MaterialCommunityIcons
          name="trash-can-outline"
          color="#fff"
          size={30}
        />
        <Text style={styles.buttonText}>{"   Excluir"}</Text>
      </RectButton>

      <RectButton
        onPress={onPressEditar}
        style={[
          styles.button,
          {
            backgroundColor: tema,
          },
        ]}
      >
        <MaterialCommunityIcons name="pencil-outline" color="#fff" size={30} />
        <Text style={styles.buttonText}>{"   Editar"}</Text>
      </RectButton>
    </Modalize>
  );
}

export default ModalizeOptions;
