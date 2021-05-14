import { StyleSheet } from "react-native";

export const colors = {
  background1: "#1c92d2",
  background2: "#f2fcfe",
};

export const homeStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  logoText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 30,
    fontFamily: "Caveat-Semibold",
    letterSpacing: 7,
  },
  eventText: {
    textAlign: "center",
    fontSize: 20,
    color: "#E0E4CC",
    fontFamily: "Caveat-Regular",
  },
});
