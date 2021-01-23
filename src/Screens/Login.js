import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import auth from '@react-native-firebase/auth';

function createUser() {
  auth()
    .createUserWithEmailAndPassword(
      'jane.doe@example.com',
      'SuperSecretPassword!',
    )
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
}

let logoff = () => {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
};

export default function Login() {
  <View style={styles.container}>
    <Button title="Create User" onPress={createUser} />
    <Button title="Logoff" onPress={logoff} />
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
