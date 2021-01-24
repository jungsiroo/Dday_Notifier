import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Screens/Home';
import Signup from '../Screens/Signup';
import Login from '../Screens/Login';
import Loading from '../Screens/Loading';

const Stack = createStackNavigator();

export default function InitialStack() {
  return (
    <Stack.Navigator initialRouteName={'Loading'}>
      <Stack.Screen
        name="Loading"
        component={Loading}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
