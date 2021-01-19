import * as React from 'react';
import {Button, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

function SignupScreen({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const SignupStack = createStackNavigator();

export default function HomeStackScreen() {
  return (
    <SignupStack.Navigator>
      <SignupStack.Screen name="Signup" component={SignupScreen} />
    </SignupStack.Navigator>
  );
}
