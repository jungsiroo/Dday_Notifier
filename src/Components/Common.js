import { Dimensions, StatusBar } from "react-native";

export const statusbarheight = StatusBar.currentHeight;
export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;
export const userIcon =
  "https://raw.githubusercontent.com/alpha-src/Dday_Notifier/main/assets/icons/profileIcon.png";

export default {
  statusbarheight,
  windowWidth,
  windowHeight,
  userIcon,
};
