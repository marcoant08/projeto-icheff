import React, { useContext } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import styles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TemasContext } from "../../contexts/temas";
import * as Animatable from "react-native-animatable";

function NumerosHeader({
  avaliacoes,
  respostas,
  atualizando,
  onPressAtualizar,
}) {
  const { tema } = useContext(TemasContext);

  return (
    <Animatable.View animation="bounceInLeft" style={styles.numeros}>
      {!!avaliacoes && (
        <Text style={styles.numerosText}>
          {avaliacoes.length === 1
            ? `${avaliacoes.length} avaliação`
            : `${avaliacoes.length} avaliações`}
        </Text>
      )}
      {!!respostas && (
        <Text style={styles.numerosText}>
          {respostas.length > 0
            ? respostas.length === 1
              ? `${respostas.length} resposta`
              : `${respostas.length} respostas`
            : `Sem respostas`}
        </Text>
      )}
      <TouchableOpacity onPress={() => onPressAtualizar()}>
        {atualizando ? (
          <ActivityIndicator color={tema} size={30} />
        ) : (
          <MaterialCommunityIcons name="refresh" size={30} color={tema} />
        )}
      </TouchableOpacity>
    </Animatable.View>
  );
}

export default NumerosHeader;
