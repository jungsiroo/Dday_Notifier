import React, { Component } from "react";
import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Agenda } from "react-native-calendars";
import { calendarStyle } from "../Components/Style/calendar.style";

export default class CalendarScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {},
    };
  }

  selectToday() {
    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
  }

  render() {
    return (
      <>
        <StatusBar translucent backgroundColor="transparent" />

        <SafeAreaView style={calendarStyle.savContainer}>
          <View style={calendarStyle.titleContainer}>
            <Text style={calendarStyle.title}>Calendar</Text>
          </View>
          <Agenda
            items={this.state.items}
            loadItemsForMonth={this.loadItems.bind(this)}
            selected={this.selectToday()}
            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            rowHasChanged={this.rowHasChanged.bind(this)}
            markedDates={{
              "2021-05-15": { marked: true, dotColor: "#50cebb" },
              "2021-05-16": { marked: true, dotColor: "#50cebb" },
              "2021-05-21": {
                startingDay: true,
                color: "#50cebb",
                textColor: "white",
              },
              "2021-05-22": { color: "#70d7c7", textColor: "white" },
              "2021-05-23": {
                color: "#70d7c7",
                textColor: "white",
                marked: true,
                dotColor: "white",
              },
              "2021-05-24": { color: "#70d7c7", textColor: "white" },
              "2021-05-25": {
                endingDay: true,
                color: "#50cebb",
                textColor: "white",
              },
            }}
            // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
            markingType={"period"}
            theme={{
              calendarBackground: "#272b36",
              agendaDayTextColor: "#7b7ee3",
              agendaDayNumColor: "#a3a4d6",
              agendaTodayColor: "#f2c279",
              agendaKnobColor: "white",
              "stylesheet.calendar.header": {
                week: {
                  marginTop: 0,
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
              },
            }}
            //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
            hideExtraDays={true}
          />
        </SafeAreaView>
      </>
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: "Item for " + strTime + " #" + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach((key) => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems,
      });
    }, 1000);
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        style={[calendarStyle.item, { height: item.height }]}
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={calendarStyle.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }
}
