import React, {useContext, useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../Components/AuthProvider';

const ProfileScreen = () => {
  const {user, logout} = useContext(AuthContext);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Profile Screen</Text>
        <Button title="Logout" onPress={() => logout()} />
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#333333',
  },
});
