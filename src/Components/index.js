import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import InitialStack from './InitialStack';

export default class StartPage extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <InitialStack />
      </NavigationContainer>
    );
  }
}
