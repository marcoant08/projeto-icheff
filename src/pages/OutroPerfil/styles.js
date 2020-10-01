import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  infosContainer: {
    //backgroundColor: "#cc0000",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  avatar: {
    marginTop: 10,
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#fff",
    marginBottom: 10,
  },

  nomeText: {
    fontFamily: "Arimo_700Bold",
    fontSize: 22,
    color: "#fff",
    paddingHorizontal: 20,
    textAlign: "center",
  },

  userText: {
    fontFamily: "Arimo_400Regular",
    fontSize: 16,
    color: "#fff",
    paddingBottom: 10,
    paddingHorizontal: 20,
    textAlign: "center",
  },

  nReceitasText: {
    fontFamily: "Arimo_400Regular",
    fontSize: 18,
    color: "#fff",
    paddingBottom: 10,
  },

  bioContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 15,
    marginBottom: -25,
    maxWidth: "85%",
  },

  bioText: {
    fontFamily: "Arimo_400Regular",
    fontSize: 16,
    textAlign: "center",
  },
});

export default styles;
