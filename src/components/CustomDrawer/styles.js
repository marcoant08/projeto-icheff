import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerPerfil: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cc0000",
    paddingVertical: 30,
  },

  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderColor: "#fff",
    borderWidth: 2,
    marginBottom: 10,
  },

  nome: {
    fontFamily: "Arimo_700Bold",
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 20,
  },

  user: {
    fontFamily: "Arimo_400Regular",
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 20,
  },

  logo: {
    fontFamily: "Lobster_400Regular",
    fontSize: 30,
    color: "#fff",
    paddingBottom: 10,
  },

  containerSem: {
    height: 150,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  textSem: {
    fontSize: 20,
    fontFamily: "Arimo_400Regular",
  },

  botao: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 40,
  },

  textButton: {
    fontFamily: "Arimo_400Regular",
    fontSize: 16,
    color: "#666",
    paddingVertical: 10,
  },
});

export default styles;
