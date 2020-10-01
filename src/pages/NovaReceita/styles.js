import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  cor: {
    paddingBottom: 60,
  },

  headerText: {
    fontSize: 20,
    fontFamily: "Arimo_700Bold",
    textAlign: "center",
    color: "#fff",
    paddingTop: 10,
  },

  input: {
    minHeight: 55,
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    fontFamily: "Arimo_400Regular",
    marginVertical: 10,
    borderRadius: 10,
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#aaa",
  },

  button: {
    height: 55,
    width: "90%",
    backgroundColor: "#fff",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    marginVertical: 10,
    marginBottom: 50,
  },

  buttonText: {
    color: "#fff",
    fontFamily: "Arimo_700Bold",
    fontSize: 18,
  },

  containerFoto: {
    justifyContent: "center",
    paddingTop: 10,
  },

  foto: {
    height: 250,
    width: "95%",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 15,
    alignSelf: "center",
  },

  botaoCamera: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#fff",
    borderWidth: 1,
    alignSelf: "flex-end",
    marginRight: "15%",
    marginTop: -15,
  },

  transferenciaContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
  },

  barra: {
    width: "90%",
    height: 20,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
  },

  barraTransferencia: {
    height: "100%",
    borderRadius: 10,
  },

  viewHelp: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
    marginVertical: 10,
  },

  textHelp: {
    fontSize: 16,
    fontFamily: "Arimo_400Regular",
    textAlign: "center",
    paddingTop: 10,
    paddingHorizontal: 30,
    color: "#fff",
  },

  helpButton: {
    height: 40,
    width: 40,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
    borderRadius: 20,
    alignSelf: "flex-end",
    marginRight: 20,
  },
});

export default styles;
