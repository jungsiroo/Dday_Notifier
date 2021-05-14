import { StyleSheet } from "react-native";

export const colors = {
  black: "#1a1917",
  gray: "#888888",
};

export const carouselStyles = StyleSheet.create({
  exampleContainer: {
    paddingVertical: 15,
  },
  slider: {
    marginTop: 5,
    overflow: "visible", // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10, // for custom animation
  },
  paginationContainer: {
    paddingVertical: 5,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
});
