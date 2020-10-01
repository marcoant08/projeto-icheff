import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  foto: {
    height: 200,
    width: "100%",
  },

  infos: {
    justifyContent: "center",
    alignItems: "center",
  },

  nome: {
    fontSize: 26,
    fontFamily: "Arimo_700Bold",
    textAlign: "center",
  },

  text: {
    fontSize: 16,
    fontFamily: "Arimo_400Regular",
    textAlign: "center",
    lineHeight: 25,
  },

  titulo: {
    fontSize: 16,
    fontFamily: "Arimo_700Bold",
  },

  tituloContainer: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 10,
    width: "88%",
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: -30,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
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

  stats: {
    height: 40,
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#aaa",
  },

  statsText: {
    fontSize: 16,
    fontFamily: "Arimo_400Regular",
  },

  autorContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },

  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginHorizontal: 15,
  },

  nomeAutor: {
    fontSize: 16,
    fontFamily: "Arimo_700Bold",
  },

  userAutor: {
    fontSize: 16,
    fontFamily: "Arimo_400Regular",
  },

  alerta: {
    fontSize: 16,
    fontFamily: "Arimo_700Bold",
    textAlign: "center",
    marginTop: 25,
    paddingHorizontal: 20,
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "center",
    width: "90%",
  },

  button: {
    backgroundColor: "#cc0000",
    marginVertical: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    padding: 15,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Arimo_400Regular",
    paddingHorizontal: 10,
  },

  addReceitaButton: {
    //position: "absolute",
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
    bottom: 50,
    right: 15,
  },
});

export default styles;
