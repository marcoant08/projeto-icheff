import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "98%",
    alignSelf: "center",
    marginVertical: 10,
    height: 220,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 0.3,
    borderColor: "#aaa",
  },

  autor: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingBottom: 10,
  },

  autorAvatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    margin: 5,
    borderColor: "#fff",
    borderWidth: 1,
  },

  autorNomeText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Arimo_700Bold",
  },

  autorUserText: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "Arimo_400Regular",
  },

  receita: {
    overflow: "hidden",
    flex: 1,
  },

  receitaImagem: {
    height: 300,
    width: "100%",
    //resizeMode: "contain",
  },

  receitaNome: {
    height: 55,
    margin: 7,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    flexDirection: "row",
  },

  receitaNomeText: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "Arimo_700Bold",
    textAlign: "justify",
  },

  stats: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  statsText: {
    color: "#fff",
    maxWidth: "70%",
    fontFamily: "Arimo_400Regular",
    fontSize: 16,
  },

  footer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "98%",
    alignSelf: "center",
    marginTop: -150,
    marginBottom: 30,
  },
});

export default styles;
