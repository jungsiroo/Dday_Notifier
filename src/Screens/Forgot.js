import React, { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import Toast from "react-native-toast-message";
import {
  AuthContext,
  _checkEmail,
  _ErrorHandler,
  _SuccessHandler,
} from "../Components/index";

const statusbarheight = StatusBar.currentHeight;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
let bImage = require("../../assets/images/forgot.jpg");

const ForgotScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const { forgot } = useContext(AuthContext);

  function ResetPassword(email) {
    if (_checkEmail(email)) {
      forgot(email);
      _SuccessHandler("Email Sent");
    } else {
      _ErrorHandler("Reset", "Email");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#88737c" />
      <ImageBackground source={bImage} style={styles.imageBackground}>
        <Text style={styles.logo}>Forgot Password</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="white"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => ResetPassword(email)}
        >
          <Text style={styles.loginText}>Send Email</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signupText}>Go Back to Login</Text>
        </TouchableOpacity>

        <Toast ref={(ref) => Toast.setRef(ref)} />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ForgotScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontSize: 35,
    color: "#FFFDE4",
    marginBottom: 40,
    letterSpacing: 5,
    fontFamily: "DancingScript-Bold",
  },
  imageBackground: {
    resizeMode: "cover",
    width: windowWidth,
    height: windowHeight + statusbarheight,
    justifyContent: "center",
    alignItems: "center",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#373B44",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    fontSize: 15,
    color: "white",
  },
  signupText: {
    fontSize: 15,
    color: "white",
    paddingTop: 15,
  },
});
