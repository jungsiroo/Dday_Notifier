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
import Toast from "react-native-toast-message";
import {
  AuthContext,
  _checkEmail,
  _ErrorHandler,
  _SuccessHandler,
} from "../Components/Common";
import { forgotStyle } from "../Components/Style/forgot.style";
import { ForgotBack } from "../Components/Images";

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
    <SafeAreaView style={forgotStyle.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground source={ForgotBack} style={forgotStyle.imageBackground}>
        <Text style={forgotStyle.logo}>Forgot Password</Text>
        <View style={forgotStyle.inputView}>
          <TextInput
            style={forgotStyle.inputText}
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
          style={forgotStyle.loginBtn}
          onPress={() => ResetPassword(email)}
        >
          <Text style={forgotStyle.loginText}>Send Email</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={forgotStyle.signupText}>Go Back to Login</Text>
        </TouchableOpacity>

        <Toast ref={(ref) => Toast.setRef(ref)} />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ForgotScreen;
