import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';

function IsUserLogined() {
  // const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState();

  // // Handle user state changes
  // function onAuthStateChanged(User) {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // if (initializing || !user) return false;

  return true;
}

export default class LoadingPage extends React.Component {
  componentDidMount() {
    this.props.navigation.navigate(IsUserLogined() ? 'Home' : 'Login');

    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }

  render() {
    return <></>;
  }
}
