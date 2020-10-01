import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
    width: "95%",
    alignSelf: "center",
    borderWidth: 0.3,
    borderColor: "#aaa",
  },

  autorContainer: {
    flexDirection: "row",
  },

  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    margin: 10,
    marginRight: 10,
  },

  nomes: {
    justifyContent: "center",
  },

  nomeAutor: {
    fontSize: 16,
    fontFamily: "Arimo_700Bold",
  },

  userAutor: {
    fontSize: 14,
    fontFamily: "Arimo_400Regular",
  },

  respostaContainer: {
    width: "95%",
    backgroundColor: "#f0f0f0",
    marginVertical: 15,
    paddingVertical: 10,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  respostaText: {
    fontSize: 16,
    paddingHorizontal: 15,
    textAlign: "justify",
    fontFamily: "Arimo_400Regular",
  },

  optionsButton: {
    padding: 15,
  },
});

export default styles;
