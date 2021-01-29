import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  Dimensions,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {AuthContext} from '../Components/AuthProvider';
import Toast from 'react-native-toast-message';

const statusbarheight = StatusBar.currentHeight;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let bImage = require('../Components/images/loginbackground.jpg');

function signUp({navigation}) {
  navigation.navigate('Signup');
}

function ToastMsgHandler(user) {
  Toast.show({
    type: 'info',
    position: 'top',
    visibilityTime: 6000,
    autoHide: true,
    topOffset: 70,
    bottomOffset: 40,
    text1: 'Login Successed',
    text2: 'Welcome' + user.toString(),
  });
}

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState();
  const [pw, setPw] = useState();

  const {login} = useContext(AuthContext);

  function alertText() {
    Alert.alert('email : ' + email + ' pw : ' + pw);
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FEEDBF" />
      <ImageBackground source={bImage} style={styles.imageBackground}>
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
        <Toast ref={(ref) => Toast.setRef(ref)} />
        <TouchableOpacity onPress={() => ToastMsgHandler('USER')}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => login(email, pw)}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => signUp({navigation})}>
          <Text style={styles.signupText}>Signup</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 35,
    color: '#FFFDE4',
    marginBottom: 40,
    letterSpacing: 5,
    fontFamily: 'DancingScript-Bold',
  },
  imageBackground: {
    resizeMode: 'cover',
    width: windowWidth,
    height: windowHeight + statusbarheight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputView: {
    width: '80%',
    backgroundColor: '#373B44',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    fontSize: 15,
    color: 'white',
  },

  signupText: {
    fontSize: 15,
    color: 'white',
    paddingTop: 15,
  },
});
