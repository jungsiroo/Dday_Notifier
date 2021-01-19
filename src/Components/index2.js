import * as React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  LoginStackScreen,
  HomeStackScreen,
  SettingsStackScreen,
} from '../Screens';

const Tab = createBottomTabNavigator();

export default function ScreenContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? require('./icons/home-circle.png')
                : require('./icons/home-circle-outline.png');
            } else if (route.name === 'Settings') {
              iconName = focused
                ? require('./icons/cog.png')
                : require('./icons/cog-outline.png');
            }
            return <Image source={iconName} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          style: {backgroundColor: '#9fcdd4'},
        }}>
        <Tab.Screen name="Login" component={LoginStackScreen} />
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
