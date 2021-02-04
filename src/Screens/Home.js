import React, {useContext, useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
} from 'react-native';
import {AuthContext} from '../Components/AuthProvider';
import Toast from 'react-native-toast-message';
import {_InfoHandler} from '../Components/ToastMsg';
import Icon from 'react-native-vector-icons/AntDesign';

const statusbarheight = StatusBar.currentHeight;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = () => {
  const {user} = useContext(AuthContext);

  let bimage = require('../Components/images/Homeback.png');
  useEffect(() => {
    _InfoHandler(user.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#65b2c2" />
      <ImageBackground source={bimage} style={styles.imageBackground}>
        <Text style={styles.text}>Welcome {user.uid}</Text>
        <Icon name="exclamationcircle" size={30} color="#900" />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
