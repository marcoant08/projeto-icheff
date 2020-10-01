import React from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styles from "./styles";

function StyledInput(props) {
  return (
    <View style={[{ marginVertical: 10, width: "100%" }, props.addMargin]}>
      <View style={styles.labelContainer}>
        <Text style={[styles.labelText, { color: props.labelColor }]}>
          {props.label}
        </Text>
      </View>
      <TextInput style={[styles.input, props.addStyle]} {...props} />
    </View>
  );
}

export default StyledInput;
