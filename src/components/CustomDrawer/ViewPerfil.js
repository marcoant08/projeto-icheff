import React, { useContext } from "react";
import styles from "./styles";
import { View, Text, Image } from "react-native";
import { AuthContext } from "../../contexts/auth";
import { TemasContext } from "../../contexts/temas";
import { RectButton } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import avatar from "../../assets/avatares/avatar.jpg";

function ViewPerfil({ color, size }) {
  const { usuario } = useContext(AuthContext);
  const { tema } = useContext(TemasContext);
  const navigation = useNavigation();

  return (
    <View style={[styles.containerPerfil, { backgroundColor: tema }]}>
      <Text style={styles.logo}>{" iCheff "}</Text>
      <Image
        style={styles.avatar}
        source={!!usuario.avatar ? { uri: usuario.avatar } : avatar}
      />
      <Text style={styles.nome}>{usuario.nome}</Text>
      <Text style={styles.user}>{usuario.user}</Text>
      <RectButton
        style={styles.botao}
        onPress={() => navigation.push("NovaReceita")}
      >
        <MaterialCommunityIcons
          style={{ paddingRight: 20 }}
          name="plus-circle-outline"
          size={25}
          color="#666"
        />
        <Text style={styles.textButton}>Nova Receita</Text>
      </RectButton>
    </View>
  );
}

export default ViewPerfil;
