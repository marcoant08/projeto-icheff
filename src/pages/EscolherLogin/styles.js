import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cc0000",
  },

  container2: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 15,
    width: "100%",
    height: "85%",
  },

  logo: {
    fontSize: 40,
    fontFamily: "Lobster_400Regular",
    paddingHorizontal: 10,
    textAlign: "center",
  },

  saudacoesText: {
    fontSize: 18,
    fontFamily: "Arimo_400Regular",
    textAlign: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
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
  },

  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Arimo_700Bold",
  },

  buttonCriarConta: {
    alignItems: "center",
    justifyContent: "center",
  },

  buttonCriarContaText: {
    marginTop: 15,
    color: "#cc0000",
    fontSize: 18,
    fontFamily: "Arimo_400Regular",
  },
});

export default styles;
