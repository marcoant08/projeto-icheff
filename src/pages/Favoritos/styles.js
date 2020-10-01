import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  numeros: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomColor: "#aaa",
    borderBottomWidth: 1,
    padding: 5,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  numerosText: {
    fontSize: 16,
    fontFamily: "Arimo_400Regular",
    textAlign: "center",
  },
});

export default styles;
