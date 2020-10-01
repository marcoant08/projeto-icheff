import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./styles";

function Estrelas({ avaliacao, setAvaliacao }) {
  return (
    <View style={styles.estrelas}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => setAvaliacao(1)}>
        <MaterialCommunityIcons
          name={avaliacao >= 1 ? "star" : "star-outline"}
          color={avaliacao >= 1 ? "#FFD700" : "#999"}
          size={30}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={() => setAvaliacao(2)}>
        <MaterialCommunityIcons
          name={avaliacao >= 2 ? "star" : "star-outline"}
          color={avaliacao >= 2 ? "#FFD700" : "#999"}
          size={30}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={() => setAvaliacao(3)}>
        <MaterialCommunityIcons
          name={avaliacao >= 3 ? "star" : "star-outline"}
          color={avaliacao >= 3 ? "#FFD700" : "#999"}
          size={30}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={() => setAvaliacao(4)}>
        <MaterialCommunityIcons
          name={avaliacao >= 4 ? "star" : "star-outline"}
          color={avaliacao >= 4 ? "#FFD700" : "#999"}
          size={30}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={() => setAvaliacao(5)}>
        <MaterialCommunityIcons
          name={avaliacao >= 5 ? "star" : "star-outline"}
          color={avaliacao >= 5 ? "#FFD700" : "#999"}
          size={30}
        />
      </TouchableOpacity>
    </View>
  );
}

export default Estrelas;
