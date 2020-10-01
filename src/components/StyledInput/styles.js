import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  labelContainer: {
    justifyContent: "center",
    borderRadius: 5,
    marginLeft: 25,
    marginBottom: 5,
  },

  labelText: {
    fontSize: 14,
    fontFamily: "Arimo_700Bold",
    marginHorizontal: 10,
  },

  input: {
    minHeight: 55,
    backgroundColor: "#fff",
    alignSelf: "center",
    width: "90%",
    fontFamily: "Arimo_400Regular",
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 10,
  },
});

export default styles;
