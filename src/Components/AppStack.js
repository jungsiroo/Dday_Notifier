import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Screens/Home';

export const Stack = createStackNavigator();

export default function InitialStack() {
  return (
    <Stack.Navigator initialRouteName={'Home'}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
