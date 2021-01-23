import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button, Alert} from 'react-native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

function LoginApp() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  });

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
}
export default class Login extends React.Component {
  createUser() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        'jane.doe@example.com',
        'SuperSecretPassword!',
      )
      .then(() => {
        Alert.alert('User account created & signed in!');
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

  logoff = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  render() {
    return (
      <View style={styles.container}>
        <LoginApp />
        <Button title="Create User" onPress={this.createUser} />
        <Button title="Logoff" onPress={this.logoff} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
