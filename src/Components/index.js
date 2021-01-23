import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import InitialStack from './InitialStack';
import SplashScreen from 'react-native-splash-screen';

export default class StartPage extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <NavigationContainer>
        <InitialStack />
      </NavigationContainer>
    );
  }
}
