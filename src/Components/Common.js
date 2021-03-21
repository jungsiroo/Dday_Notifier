import { Dimensions, StatusBar } from "react-native";

export const statusbarheight = StatusBar.currentHeight;
export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

export default {
  statusbarheight,
  windowWidth,
  windowHeight,
};
