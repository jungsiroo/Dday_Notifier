import * as React from 'react';
import StartPage from './src/Components';
import SplashScreen from 'react-native-splash-screen';

export default class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return <StartPage />;
  }
}
