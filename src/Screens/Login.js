import React, { useContext, useState } from "react";
import {
  Text,
  View,
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
} from "../Components/Common";
import Toast from "react-native-toast-message";
import { signupStyle } from "../Components/Style/signup.style";
import { AuthBack } from "../Components/Images";

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
    <SafeAreaView style={signupStyle.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground source={AuthBack} style={signupStyle.imageBackground}>
        <Text style={signupStyle.logo}>Dday-Notifier</Text>
        <View style={signupStyle.inputView}>
          <TextInput
            style={signupStyle.inputText}
            placeholder="Email..."
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="white"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={signupStyle.inputView}>
          <TextInput
            secureTextEntry
            value={pw}
            style={signupStyle.inputText}
            placeholder="Password..."
            placeholderTextColor="white"
            onChangeText={(text) => setPw(text)}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
          <Text style={signupStyle.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={signupStyle.loginBtn}
          onPress={() => LoginValidationCheck(email, pw)}
        >
          <Text style={signupStyle.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={signupStyle.signupText}>Signup</Text>
        </TouchableOpacity>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </ImageBackground>
    </SafeAreaView>
  );
}
