import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  avatar: {
    height: 170,
    width: 170,
    borderRadius: 85,
    borderWidth: 1,
    borderColor: "#fff",
  },

  botaoCamera: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    alignSelf: "flex-end",
    marginTop: -25,
    backgroundColor: "#fff",
  },

  avatarContainer: {
    width: 170,
    alignSelf: "center",
    marginTop: 30,
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
    backgroundColor: "#cc0000",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    marginVertical: 10,
  },

  buttonText: {
    color: "#fff",
    fontFamily: "Arimo_700Bold",
    fontSize: 18,
  },

  cor: {
    paddingBottom: 80,
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
});

export default styles;
