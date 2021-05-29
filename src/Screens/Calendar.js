import React, { Component } from "react";
import { Text, View, SafeAreaView, StatusBar } from "react-native";
import { calendarStyle } from "../Components/Style/calendar.style";
import { AgendaCalendar } from "../Components/AgendaCalendar";

export default class CalendarScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <StatusBar translucent backgroundColor="transparent" />

        <SafeAreaView style={calendarStyle.savContainer}>
          <View style={calendarStyle.titleContainer}>
            <Text style={calendarStyle.title}>Calendar</Text>
          </View>
          <AgendaCalendar />
          <View style={calendarStyle.bottomTab} />
        </SafeAreaView>
      </>
    );
  }
}
