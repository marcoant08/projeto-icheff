import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#cc0000",
  },

  backButton: {
    paddingLeft: 30,
    paddingTop: 10,
  },

  form: {
    backgroundColor: "#ddd",
    height: "85%",
    borderRadius: 15,
    justifyContent: "center",
    paddingVertical: 15,
  },

  logo: {
    fontSize: 40,
    fontFamily: "Lobster_400Regular",
    paddingHorizontal: 10,
    textAlign: "center",
  },

  titulo: {
    fontSize: 18,
    fontFamily: "Arimo_400Regular",
    textAlign: "center",
  },

  input: {
    height: 55,
    width: "90%",
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 22,
    fontSize: 18,
    fontFamily: "Arimo_400Regular",
  },

  button: {
    height: 55,
    width: "90%",
    backgroundColor: "#cc0000",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    flexDirection: "row",
    alignSelf: "center",
  },

  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Arimo_700Bold",
  },

  tituloModalize: {
    fontSize: 18,
    fontFamily: "Arimo_400Regular",
    textAlign: "center",
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
});

export default styles;
