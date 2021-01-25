import * as React from 'react';
import {useState} from 'react';
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

const statusbarheight = StatusBar.currentHeight;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let bImage = require('../Components/images/loginbackground.jpg');

export default function SignupScreen({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FEEDBF" />
      <ImageBackground source={bImage} style={styles.imageBackground}>
        <Text style={styles.logo}>Dday-Notifier</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="white"
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="white"
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password Again..."
            placeholderTextColor="white"
          />
        </View>

        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Signup</Text>
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
