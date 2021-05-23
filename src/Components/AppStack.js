import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Profile, Calendar } from "../Screens/";
import {
  homeCircleOutline,
  homeCircle,
  accountCircle,
  accountCircleOutline,
  calendarCheck,
  calendarCheckOutline,
} from "./Icons";
import FastImage from "react-native-fast-image";

export const Tab = createBottomTabNavigator();

export default function AppStack() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          borderTopWidth: 0,
          borderBottomWidth: 0,
          backgroundColor: "#272b36",
          position: "absolute",
          elevation: 0,
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconimg;

          if (route.name === "Home") {
            iconimg = focused ? homeCircle : homeCircleOutline;
          } else if (route.name === "Profile") {
            iconimg = focused ? accountCircle : accountCircleOutline;
          } else if (route.name === "Calendar") {
            iconimg = focused ? calendarCheck : calendarCheckOutline;
          }

          return (
            <FastImage
              source={iconimg}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                height: 24,
                width: 24,
              }}
              tintColor={focused ? "#ffffff" : "#80807e"}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
