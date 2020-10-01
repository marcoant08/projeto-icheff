import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: "hidden",
    height: 220,
    width: "95%",
    alignSelf: "center",
    margin: 10,
    borderWidth: 0.5,
    borderColor: "#aaa",
  },

  avatar: {
    height: 220,
    width: "100%",
  },

  footer: {
    backgroundColor: "rgba(0,0,0,0.7)",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 55,
    marginTop: -75,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#888",
    borderTopWidth: 1,
    borderTopColor: "#888",
  },

  text: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "Arimo_700Bold",
    width: "70%",
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
});

export default styles;
