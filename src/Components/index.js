import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import InitialStack from './InitialStack';

export default function StartPage() {
  return (
    <NavigationContainer>
      <InitialStack />
    </NavigationContainer>
  );
}
