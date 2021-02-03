import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import Home from '../Screens/Home';
import Profile from '../Screens/Profile';
import Calendar from '../Screens/Calendar';

export const Tab = createBottomTabNavigator();

export default function AppStack() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: 'lightgray',
        activeBackgroundColor: '#bedded',
        inactiveBackgroundColor: '#81b3cc',
        style: {
          backgroundColor: '#CE4418',
        },
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconimg;

          if (route.name === 'Home') {
            iconimg = focused
              ? require('../../assets/icons/home-circle.png')
              : require('../../assets/icons/home-circle-outline.png');
          } else if (route.name === 'Profile') {
            iconimg = focused
              ? require('../../assets/icons/account-circle.png')
              : require('../../assets/icons/account-circle-outline.png');
          } else {
            iconimg = focused
              ? require('../../assets/icons/calendar-check.png')
              : require('../../assets/icons/calendar-check-outline.png');
          }

          return <Image source={iconimg} style={{height: 24, width: 24}} />;
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
