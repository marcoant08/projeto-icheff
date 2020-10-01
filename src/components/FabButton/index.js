import React, { useState, useContext } from "react";
import { View, TouchableWithoutFeedback, Text, Animated } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
//import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome } from "@expo/vector-icons";

import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { TemasContext } from "../../contexts/temas";

export default function FabButton(props) {
  const [open, setOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const navigation = useNavigation();
  const { tema } = useContext(TemasContext);

  const toggleMenu = () => {
    let toValue = open ? 0 : 1;

    Animated.spring(animation, {
      toValue: toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();

    setOpen(!open);
  };

  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "45deg"],
        }),
      },
    ],
  };

  const homeStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -60],
        }),
      },
    ],
  };

  const moveDescription1 = {
    transform: [
      { scale: animation },
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -105],
        }),
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -112.5],
        }),
      },
    ],
  };

  const moveDescription2 = {
    transform: [
      { scale: animation },
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -105],
        }),
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -52.5],
        }),
      },
    ],
  };

  const heartStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -120],
        }),
      },
    ],
  };

  return (
    <View style={[styles.container]}>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("EditarPerfil")}
      >
        <Animated.View
          style={[styles.description, styles.subDescription, moveDescription1]}
        >
          <Text>Editar Perfil</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("EditarPerfil")}
      >
        <Animated.View
          style={[
            styles.button,
            { backgroundColor: tema },
            styles.subMenu,
            heartStyle,
          ]}
        >
          <MaterialCommunityIcons
            style={{ padding: 5 }}
            name="account-edit"
            color={"#fff"}
            size={25}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("NovaReceita")}
      >
        <Animated.View
          style={[styles.description, styles.subDescription, moveDescription2]}
        >
          <Text>Adicionar Receita</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("NovaReceita")}
      >
        <Animated.View
          style={[
            styles.button,
            { backgroundColor: tema },
            styles.subMenu,
            homeStyle,
          ]}
        >
          <MaterialCommunityIcons
            style={{ padding: 5 }}
            name="chef-hat"
            color={"#fff"}
            size={20}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={toggleMenu}>
        <Animated.View
          style={[styles.button, { backgroundColor: tema }, rotation]}
        >
          <FontAwesome name="plus" size={20} color="#FFF" />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}
