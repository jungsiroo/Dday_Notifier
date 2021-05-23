import React, { useState } from "react";
import { Alert, Text, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import { calendarStyle } from "./Style/calendar.style";

export function AgendaCalendar() {
  const [items, setItems] = useState([]);

  function selectToday() {
    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
  }

  return (
    <Agenda
      items={items}
      selected={selectToday()}
      renderItem={renderItem.bind(this)}
      renderEmptyDate={renderEmptyDate.bind(this)}
      rowHasChanged={rowHasChanged.bind(this)}
      loadItemsForMonth={loadItems.bind(this)}
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
  );

  function loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          setItems([...items, []]);
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            setItems(...items, {
              name: "Item for " + strTime + " #" + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems([...items, newItems]);
    }, 1000);
  }

  function renderItem(item) {
    return (
      <TouchableOpacity
        style={[calendarStyle.item, { height: item.height }]}
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  function renderEmptyDate() {
    const emptyDate = new Date().toUTCString().split("T")[0];
    return (
      <TouchableOpacity>
        <Text style={{ color: "gray", paddingBottom: 4 }}>{emptyDate}</Text>
        <Text>Your container message here.</Text>
      </TouchableOpacity>
    );
  }

  function rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  function timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }
}
