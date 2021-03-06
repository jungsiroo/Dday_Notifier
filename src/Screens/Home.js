import React, { useContext, useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { AuthContext, _InfoHandler } from "../Components/index";
import Toast from "react-native-toast-message";

const HomeScreen = () => {
  const { user } = useContext(AuthContext);
  useEffect(() => {
    _InfoHandler(user.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
