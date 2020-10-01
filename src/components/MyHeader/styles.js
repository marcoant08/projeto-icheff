import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#cc0000",
    height: 100,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },

  headerText: {
    fontSize: 30,
    color: "#fff",
    fontFamily: "Lobster_400Regular",
  },

  avatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
  },
});

export default styles;
