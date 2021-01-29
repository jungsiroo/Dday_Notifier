import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../Components/AuthProvider';
import Toast from 'react-native-toast-message';
import {useEffect} from 'react';

const HomeScreen = () => {
  const ToastMsgHandler = (user) => {
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
  };

  const {user, logout} = useContext(AuthContext);

  useEffect(() => {
    ToastMsgHandler(user.uid);
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
