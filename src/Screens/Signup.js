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
  _checkPwSame,
  _isPasswordLong,
  _ErrorHandler,
} from "../Components/Common";
import Toast from "react-native-toast-message";
import { signupStyle } from "../Components/Style/signup.style";
import { AuthBack } from "../Components/Images";

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
    } else if (!_checkPwSame(password, confirmPw)) {
      _ErrorHandler("Signup", "Equal");
    } else if (!_isPasswordLong(password)) {
      _ErrorHandler("Signup", "Short");
    } else {
      register(email, password);
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
            value={password}
            style={signupStyle.inputText}
            placeholder="Password..."
            placeholderTextColor="white"
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={signupStyle.inputView}>
          <TextInput
            secureTextEntry
            value={confirmPw}
            style={signupStyle.inputText}
            placeholder="Password Again..."
            placeholderTextColor="white"
            onChangeText={(text) => setConfirmPw(text)}
          />
        </View>

        <TouchableOpacity
          style={signupStyle.loginBtn}
          onPress={() => SignupValidationCheck(email, password, confirmPw)}
        >
          <Text style={signupStyle.loginText}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={signupStyle.signupText}>Go Back to Login</Text>
        </TouchableOpacity>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignupScreen;
