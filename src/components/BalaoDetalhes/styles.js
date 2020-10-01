import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: "Arimo_400Regular",
    textAlign: "center",
    lineHeight: 25,
    paddingHorizontal: 15,
  },

  titulo: {
    fontSize: 16,
    fontFamily: "Arimo_700Bold",
  },

  balao: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderWidth: 0.3,
    borderColor: "#aaa",
  },

  header: {
    paddingVertical: 10,
    width: "100%",
    borderBottomWidth: 0.5,
    borderBottomColor: "#aaa",
    justifyContent: "center",
    alignItems: "center",
  },

  conteudo: {
    paddingVertical: 20,
  },
});

export default styles;
