import { StyleSheet } from "react-native";

export const calendarStyle = StyleSheet.create({
  savContainer: { flex: 1, backgroundColor: "#272b36" },
  titleContainer: {
    backgroundColor: "#272b36",
    height: 90,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 25,
    fontFamily: "Caveat-Semibold",
    letterSpacing: 7,
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    height: 15,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
