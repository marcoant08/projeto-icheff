import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  avaliacaoContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  autorAvaliacao: {
    flexDirection: "row",
    padding: 10,
  },

  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    margin: 5,
  },

  nomes: {
    justifyContent: "center",
  },

  autorNome: {
    fontSize: 16,
    fontFamily: "Arimo_700Bold",
  },

  autorUser: {
    fontSize: 14,
    fontFamily: "Arimo_400Regular",
  },

  comentarioContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 20,
  },

  comentarioText: {
    fontSize: 18,
    paddingHorizontal: 15,
    textAlign: "justify",
    fontFamily: "Arimo_400Regular",
  },

  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },

  estrelas: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 15,
  },

  avaliacoesText: {
    fontSize: 16,
    fontFamily: "Arimo_400Regular",
    paddingVertical: 10,
  },

  comentarContainer: {
    backgroundColor: "#fff",
    width: "95%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
    borderWidth: 0.3,
    borderColor: "#aaa",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },

  input: {
    height: 55,
    width: "62%",
    backgroundColor: "#eee",
    fontSize: 16,
    fontFamily: "Arimo_400Regular",
    borderRadius: 10,
    paddingHorizontal: 20,
  },

  button: {
    height: 55,
    backgroundColor: "#cc0000",
    marginLeft: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontSize: 16,
    fontFamily: "Arimo_700Bold",
    color: "#fff",
    paddingHorizontal: 10,
  },

  headerModalize: {
    fontSize: 16,
    fontFamily: "Arimo_700Bold",
    color: "#fff",
    color: "#000",
    textAlign: "center",
    fontSize: 20,
    paddingTop: 20,
  },
});

export default styles;
