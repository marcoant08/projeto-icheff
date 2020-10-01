import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import MyHeader from "../../components/MyHeader";
import styles from "./styles";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { TemasContext } from "../../contexts/temas";

function Temas() {
  const { trocar } = useContext(TemasContext);

  return (
    <View style={styles.container}>
      <MyHeader />
      <Text style={styles.titulo}>Escolha um tema!</Text>
      <ScrollView>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.containerCor, { backgroundColor: "#cc0000" }]}
          onPress={() => trocar("#cc0000")}
        >
          <Text style={styles.text}>Padrão</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.containerCor, { backgroundColor: "#8B0000" }]}
          onPress={() => trocar("#8B0000")}
        >
          <Text style={styles.text}>Dark Red</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.containerCor, { backgroundColor: "#EEB422" }]}
          onPress={() => trocar("#EEB422")}
        >
          <Text style={styles.text}>Gold</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.containerCor, { backgroundColor: "#CD6600" }]}
          onPress={() => trocar("#CD6600")}
        >
          <Text style={styles.text}>Dark Orange</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.containerCor, { backgroundColor: "#8B4726" }]}
          onPress={() => trocar("#8B4726")}
        >
          <Text style={styles.text}>Sienna</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.containerCor, { backgroundColor: "#4F4F4F" }]}
          onPress={() => trocar("#4F4F4F")}
        >
          <Text style={styles.text}>Burlywood</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.containerCor, { backgroundColor: "#000" }]}
          onPress={() => trocar("#000")}
        >
          <Text style={styles.text}>Black</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.containerCor, { backgroundColor: "#008B45" }]}
          onPress={() => trocar("#008B45")}
        >
          <Text style={styles.text}>Spring Green</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.containerCor, { backgroundColor: "#006400" }]}
          onPress={() => trocar("#006400")}
        >
          <Text style={styles.text}>Dark Green</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.containerCor, { backgroundColor: "#CD1076" }]}
          onPress={() => trocar("#CD1076")}
        >
          <Text style={styles.text}>Deep Pink</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.containerCor, { backgroundColor: "#8B008B" }]}
          onPress={() => trocar("#8B008B")}
        >
          <Text style={styles.text}>Magenta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.containerCor, { backgroundColor: "#6959CD" }]}
          onPress={() => trocar("#6959CD")}
        >
          <Text style={styles.text}>Slate Blue</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.containerCor, { backgroundColor: "#1E90FF" }]}
          onPress={() => trocar("#1E90FF")}
        >
          <Text style={styles.text}>Dodger Blue</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.containerCor, { backgroundColor: "#008B8B" }]}
          onPress={() => trocar("#008B8B")}
        >
          <Text style={styles.text}>Dark Cyan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.containerCor, { backgroundColor: "#2F4F4F" }]}
          onPress={() => trocar("#2F4F4F")}
        >
          <Text style={styles.text}>Dark Slate Gray</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default Temas;
