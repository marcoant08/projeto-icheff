import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  addReceitaButton: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    borderColor: "#fff",
    borderWidth: 1,
    backgroundColor: "#cc0000",
    justifyContent: "center",
    alignItems: "center",
  },

  containerButton: {
    alignItems: "center",
    position: "absolute",
    bottom: 80,
    right: 40,
  },
});

export default styles;
