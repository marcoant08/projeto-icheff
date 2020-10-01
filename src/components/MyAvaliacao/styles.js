import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "95%",
    backgroundColor: "#fff",
    marginVertical: 10,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 0.3,
    borderColor: "#aaa",
  },

  autor: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginVertical: 10,
  },

  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    margin: 5,
    marginRight: 10,
  },

  nomeAutor: {
    fontSize: 16,
    fontFamily: "Arimo_700Bold",
  },

  userAutor: {
    fontSize: 14,
    fontFamily: "Arimo_400Regular",
  },

  optionsButton: {
    padding: 15,
  },

  conteudo: {
    width: "90%",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    alignSelf: "center",
    borderRadius: 10,
    margin: 15,
    paddingVertical: 15,
  },

  comentario: {
    fontSize: 18,
    paddingHorizontal: 15,
    textAlign: "justify",
    fontFamily: "Arimo_400Regular",
  },

  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  estrelas: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 15,
  },

  respostasContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
    marginRight: 15,
  },

  respostasText: {
    fontSize: 16,
  },
});

export default styles;
