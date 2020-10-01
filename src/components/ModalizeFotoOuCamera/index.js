import React, { useContext } from "react";
import { RectButton } from "react-native-gesture-handler";
import { Text } from "react-native";
import { Modalize } from "react-native-modalize";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./styles";
import { TemasContext } from "../../contexts/temas";

function ModalizeFotoOuCamera({ refOptions, abrirCamera, abrirGaleria }) {
  const { tema } = useContext(TemasContext);

  return (
    <Modalize ref={refOptions} modalHeight={300}>
      <Text style={styles.tituloModal}>Adicionar Imagem</Text>
      <RectButton
        style={[styles.button, { backgroundColor: tema }]}
        onPress={abrirCamera}
      >
        <MaterialCommunityIcons
          style={{ paddingHorizontal: 10 }}
          name="camera-plus-outline"
          size={20}
          color="#fff"
        />
        <Text style={styles.buttonText}>Tirar Foto</Text>
      </RectButton>

      <RectButton
        style={[styles.button, { backgroundColor: tema }]}
        onPress={abrirGaleria}
      >
        <MaterialCommunityIcons
          style={{ paddingHorizontal: 10 }}
          name="camera-image"
          size={20}
          color="#fff"
        />
        <Text style={styles.buttonText}>Escolher da Galeria</Text>
      </RectButton>
    </Modalize>
  );
}

export default ModalizeFotoOuCamera;
