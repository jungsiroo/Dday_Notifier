import { StyleSheet } from "react-native";

export const colors = {
  background1: "#272b36",
  background2: "#3E4C59",
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
    color: "white",
  },
  eventText: {
    textAlign: "center",
    fontSize: 20,
    color: "#70d7c7",
    fontFamily: "Caveat-Regular",
  },
});
