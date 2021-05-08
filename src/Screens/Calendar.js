import React, { useContext, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { AuthContext } from "../Components/index";

const CalendarScreen = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor={"rgba(0, 0, 0, 0.3)"}
          barStyle={"light-content"}
        />
        <Text style={styles.text}>Calendar Screen</Text>
        <Button title="Logout" onPress={() => logout()} />
      </SafeAreaView>
    </>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: "#333333",
  },
});
