import { Dimensions, StatusBar } from "react-native";

const statusbarheight = StatusBar.currentHeight;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import { AuthContext } from "./AuthProvider";
import {
  _isBlank,
  _checkPwSame,
  _checkEmail,
  _isPasswordLong,
  _convertToAscii,
  _exportFromAscii,
} from "./Validation";
import {
  _ErrorHandler,
  _SuccessHandler,
  _InfoHandler,
  _NotiHandler,
} from "./ToastMsg";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

export {
  statusbarheight,
  windowWidth,
  windowHeight,
  AuthContext,
  _isBlank,
  _checkPwSame,
  _checkEmail,
  _isPasswordLong,
  _convertToAscii,
  _exportFromAscii,
  _ErrorHandler,
  _SuccessHandler,
  _InfoHandler,
  _NotiHandler,
  AuthStack,
  AppStack,
};
