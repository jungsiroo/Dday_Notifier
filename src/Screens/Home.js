import React, {useContext} from 'react';
import {Button, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import DetailsScreen from './Detail';
import {AuthContext} from '../Components/AuthProvider';

function Logout() {
  const {logout} = useContext(AuthContext);
  logout();
}

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home screen</Text>
      <Button title="Logout" onPress={() => Logout()} />
    </View>
  );
}

const HomeStack = createStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}
