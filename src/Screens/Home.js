import React, {useContext, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import {AuthContext} from '../Components/AuthProvider';
import AuthStack from '../Components/AuthStack';
import Toast from 'react-native-toast-message';
import {_InfoHandler} from '../Components/ToastMsg';

const statusbarheight = StatusBar.currentHeight;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = () => {
  const {user} = useContext(AuthContext);
  useEffect(() => {
    _InfoHandler(user.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user == null) {
    return <AuthStack />;
  }

  return (
    <View style={styles.container}>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafd',
  },
  text: {
    fontSize: 20,
    color: '#333333',
  },
  imageBackground: {
    resizeMode: 'cover',
    width: windowWidth,
    height: windowHeight + statusbarheight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
