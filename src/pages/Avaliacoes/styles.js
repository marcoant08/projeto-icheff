import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  avaliarContainer: {
    backgroundColor: "#fff",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    alignSelf: "center",
    width: "95%",
    borderWidth: 0.3,
    borderColor: "#aaa",
  },

  numeros: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomColor: "#aaa",
    borderBottomWidth: 0.3,
    padding: 5,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },

  numerosText: {
    fontSize: 16,
    fontFamily: "Arimo_400Regular",
    textAlign: "center",
  },

  estrelas: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },

  comentarioContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
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

  textSem: {
    fontSize: 20,
    fontFamily: "Arimo_400Regular",
    textAlign: "center",
    paddingTop: 120,
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
