import React, { useContext } from "react";
import { View, Text, Alert, Image, ToastAndroid } from "react-native";
import styles from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";
import { AuthContext } from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";
import { TemasContext } from "../../contexts/temas";
import avatar from "../../assets/avatares/avatar.jpg";

function MyHeader(props) {
  const { sair, usuario } = useContext(AuthContext);
  const { tema } = useContext(TemasContext);
  const navigation = useNavigation();

  function handleSair() {
    Alert.alert(
      "Desconectar",
      "Deseja desconectar sua conta?",
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Desconectar",
          onPress: () => {
            ToastAndroid.show("Você foi desconectado.", ToastAndroid.SHORT);
            sair();
          },
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: tema }]}>
      <BorderlessButton
        onPress={() => {
          props.back ? navigation.goBack() : navigation.toggleDrawer();
        }}
      >
        {props.back ? (
          <MaterialCommunityIcons name="arrow-left" color={"#fff"} size={26} />
        ) : (
          <MaterialCommunityIcons
            name="view-sequential"
            color={"#fff"}
            size={26}
          />
        )}
      </BorderlessButton>
      <Text style={styles.headerText}>{" iCheff "}</Text>
      <BorderlessButton onPress={handleSair}>
        <Image
          style={styles.avatar}
          source={!!usuario.avatar ? { uri: usuario.avatar } : avatar}
        />
      </BorderlessButton>
    </View>
  );
}

export default MyHeader;
