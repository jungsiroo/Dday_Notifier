import React, { useContext, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { AuthContext } from "../Components/index";
import { calendarStyle } from "../Components/Style/calendar.style";

const CalendarScreen = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <SafeAreaView style={calendarStyle.container}>
        <StatusBar translucent backgroundColor="transparent" />
        <Text style={calendarStyle.text}>Calendar Screen</Text>
        <Button title="Logout" onPress={() => logout()} />
      </SafeAreaView>
    </>
  );
};

export default CalendarScreen;
