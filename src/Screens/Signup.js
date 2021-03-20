import React, { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import {
  AuthContext,
  _isBlank,
  _checkEmail,
  _arePasswordandconfirmPwSame,
  _isPasswordLong,
  _ErrorHandler,
} from "../Components/index";
import Toast from "react-native-toast-message";
import {
  statusbarheight,
  windowWidth,
  windowHeight,
} from "../Components/Common";
import { LoginBack } from "../Components/Images";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPw, setConfirmPw] = useState();
  const { register } = useContext(AuthContext);

  function SignupValidationCheck(email, password, confirmPw) {
    if (_isBlank(email, password)) {
      _ErrorHandler("Signup", "Blank");
    } else if (!_checkEmail(email)) {
      _ErrorHandler("Signup", "Invalid");
    } else if (!_arePasswordandconfirmPwSame(password, confirmPw)) {
      _ErrorHandler("Signup", "Eqaul");
    } else if (!_isPasswordLong(password)) {
      _ErrorHandler("Signup", "Short");
    } else {
      register(email, password);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FEEDBF" />
      <ImageBackground source={LoginBack} style={styles.imageBackground}>
        <Text style={styles.logo}>Dday-Notifier</Text>
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
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            value={password}
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="white"
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            value={confirmPw}
            style={styles.inputText}
            placeholder="Password Again..."
            placeholderTextColor="white"
            onChangeText={(text) => setConfirmPw(text)}
          />
        </View>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => SignupValidationCheck(email, password, confirmPw)}
        >
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signupText}>Go Back to Login</Text>
        </TouchableOpacity>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignupScreen;

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
  forgot: {
    color: "white",
    fontSize: 11,
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
