import * as React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';

export default function CustomTabBar({state, descriptors, navigation}) {
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
        const {options} = descriptors[route.key];
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
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, alignItems: 'center'}}>
            <Image source={iconimg} style={{height: 30, width: 30}} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
