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
  _ErrorHandler,
} from "../Components/index";
import Toast from "react-native-toast-message";
import {
  statusbarheight,
  windowWidth,
  windowHeight,
} from "../Components/Common";
import { LoginBack } from "../Components/Images";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState();
  const [pw, setPw] = useState();

  const { login } = useContext(AuthContext);

  function LoginValidationCheck(email, password) {
    if (_isBlank(email, password)) {
      _ErrorHandler("Login", "Blank");
    } else if (!_checkEmail(email)) {
      _ErrorHandler("Login", "Invalid");
    } else {
      login(email, password);
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
            value={pw}
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="white"
            onChangeText={(text) => setPw(text)}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => LoginValidationCheck(email, pw)}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signupText}>Signup</Text>
        </TouchableOpacity>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </ImageBackground>
    </SafeAreaView>
  );
}

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
