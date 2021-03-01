import React, { useContext, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { AuthContext, AuthStack, _InfoHandler } from "../Components/index";
import Toast from "react-native-toast-message";

const statusbarheight = StatusBar.currentHeight;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const HomeScreen = () => {
  const { user } = useContext(AuthContext);
  useEffect(() => {
    _InfoHandler(user.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user == null) {
    return <AuthStack />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafd",
  },
});
