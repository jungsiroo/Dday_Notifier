import * as React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';

export default function CustomTabBar({state, navigation}) {
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flexDirection: 'row',
        backgroundColor: '#b2e6f7',
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        let iconimg;
        if (route.name === 'Home') {
          iconimg = isFocused
            ? require('../../assets/icons/home-circle.png')
            : require('../../assets/icons/home-circle-outline.png');
        } else if (route.name === 'Profile') {
          iconimg = isFocused
            ? require('../../assets/icons/account-circle.png')
            : require('../../assets/icons/account-circle-outline.png');
        } else {
          iconimg = isFocused
            ? require('../../assets/icons/calendar-check.png')
            : require('../../assets/icons/calendar-check-outline.png');
        }

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            onPress={onPress}
            style={{flex: 1, alignItems: 'center'}}>
            <Image source={iconimg} style={{height: 30, width: 30}} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
