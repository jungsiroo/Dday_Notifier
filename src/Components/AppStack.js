import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Profile, Calendar} from '../Screens/';
import {Image} from 'react-native';
import {
  homeCircleOutline,
  homeCircle,
  accountCircle,
  accountCircleOutline,
  calendarCheck,
  calendarCheckOutline,
} from './Icons';

export const Tab = createBottomTabNavigator();

export default function AppStack() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          borderTopWidth: 0,
          borderBottomWidth: 0,
          backgroundColor: '#f9fafd',
          elevation: 0,
        },
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconimg;

          if (route.name === 'Home') {
            iconimg = focused ? homeCircle : homeCircleOutline;
          } else if (route.name === 'Profile') {
            iconimg = focused ? accountCircle : accountCircleOutline;
          } else {
            iconimg = focused ? calendarCheck : calendarCheckOutline;
          }

          return (
            <Image
              source={iconimg}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                height: 24,
                width: 24,
                tintColor: focused ? '#74b7db' : 'gray',
              }}
            />
          );
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
