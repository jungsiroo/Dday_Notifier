import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import Profile from '../Screens/Profile';
import Calendar from '../Screens/Calendar';
import CustomTabBar from './CustomTabBar';

export const Tab = createBottomTabNavigator();

export default function AppStack() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
