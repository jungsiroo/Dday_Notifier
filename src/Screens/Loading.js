import {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';

function IsUserLogined() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(User) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing || !user) return false;

  return true;
}

const LoadingPage = ({navigation}) => {
  let isLogin = IsUserLogined;

  useEffect(() => {
    isLogin ? navigation.navigate('Home') : navigation.navigate('Login');

    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default LoadingPage;
