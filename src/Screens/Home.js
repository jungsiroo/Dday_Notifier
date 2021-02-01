import React, {useContext, useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../Components/AuthProvider';
import Toast from 'react-native-toast-message';
import {_InfoHandler} from '../Components/ToastMsg';

const HomeScreen = () => {
  const {user, logout} = useContext(AuthContext);

  useEffect(() => {
    _InfoHandler(user.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <View style={styles.container}>
        <Text style={styles.text}>Welcome {user.uid}</Text>
        <Button title="Logout" onPress={() => logout()} />
      </View>
    </>
  );
};

export default HomeScreen;

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
