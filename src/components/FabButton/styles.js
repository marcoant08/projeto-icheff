import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "absolute",
    bottom: 80,
    right: 40,
  },

  button: {
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

  description: {
    position: "absolute",
    width: 60,
    height: 60,
    borderColor: "#aaa",
    borderWidth: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  subMenu: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },

  subDescription: {
    width: 150,
    height: 35,
    borderRadius: 10,
  },
});

export default styles;
