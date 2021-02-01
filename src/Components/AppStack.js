import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../Screens/Home';
import Profile from '../Screens/Profile';

export const Tab = createBottomTabNavigator();

export default function AppStack() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName={'Home'}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
