import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import ViewPerfil from "./ViewPerfil";
import { Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as MailComposer from "expo-mail-composer";
import { useNavigation } from "@react-navigation/native";
import { color } from "react-native-reanimated";

function CustomDrawer(props) {
  //const { navigation } = useNavigation();

  return (
    <DrawerContentScrollView {...props}>
      <ViewPerfil />
      <DrawerItemList {...props} />
      <DrawerItem
        label="Compartilhar"
        labelStyle={{
          fontSize: 16,
          fontFamily: "Arimo_400Regular",
        }}
        onPress={() => {
          Alert.alert("Link", "compartilhou");
        }}
        icon={({ color, size, focused }) => {
          return (
            <MaterialCommunityIcons
              name="share-variant"
              size={size}
              color={color}
            />
          );
        }}
      />
      <DrawerItem
        label="Sobre"
        labelStyle={{
          fontSize: 16,
          fontFamily: "Arimo_400Regular",
        }}
        onPress={() => {
          /* Alert.alert(
            "Sobre",
            "Desenvolvido por: Marco Antônio\nContato: marcoant008@gmail.com"
          ); */
          Alert.alert(
            "iCheff",
            "Desenvolvido por: Marco Antônio\nContato: marcoant008@gmail.com",
            [
              {
                text: "OK",
                onPress: () => {},
                style: "cancel",
              },
              {
                text: "Contatar",
                onPress: () => {
                  MailComposer.composeAsync({
                    subject: "Sobre o iCheff",
                    recipients: ["marcoant008@gmail.com"],
                  });
                },
              },
            ],
            { cancelable: false }
          );
        }}
        icon={({ color, size, focused }) => {
          return (
            <MaterialCommunityIcons
              name="information-variant"
              size={size}
              color={color}
            />
          );
        }}
      />
    </DrawerContentScrollView>
  );
}

export default CustomDrawer;
