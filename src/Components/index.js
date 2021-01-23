import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
// import Home from '../Screens/Home';
// import Signup from '../Screens/Signup';
// import LoginS from '../Screens/Login';

import {Home, Signup, LoginS} from '../Screens';

const statusbarheight = StatusBar.currentHeight;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let bImage = require('../Components/images/loginbackground.jpg');

class LoginInfo extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      pw: '',
    };
  }
  LoginCheck({navigation}) {
    //alert('email : ' + this.state.email + ' pw : ' + this.state.pw);
    navigation.navigate('Home');
  }
}

function signUp({navigation}) {
  navigation.navigate('Signup');
}

function loginTest({navigation}) {
  navigation.navigate('LoginTest');
}

const loginInfo = new LoginInfo();

function LoginScreen({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FEEDBF" />
      <ImageBackground source={bImage} style={styles.imageBackground}>
        <Text style={styles.logo}>Dday-Notifier</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="white"
            onChangeText={(text) => loginInfo.setState({email: text})}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="white"
            onChangeText={(text) => loginInfo.setState({pw: text})}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => loginInfo.LoginCheck({navigation})}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => loginTest({navigation})}>
          <Text style={styles.signupText}>Signup</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const Stack = createStackNavigator();

function InitialStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="LoginTest"
        component={LoginS}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function StartPage() {
  return (
    <NavigationContainer>
      <InitialStack />
    </NavigationContainer>
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
