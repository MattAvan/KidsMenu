import React, { useState, useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import CalendarCard from "./CalendarCard";
import { centralStyles } from "../../centralStyles";
import {
  getPreviousMonday,
  createMenuArray,
  calculateNewStartingDay,
} from "../../utils";

export default function WeekMenu({ navigation }) {
  const [startingDay, setStartingDay] = useState(getPreviousMonday());
  const menuArray = useMemo(
    () => createMenuArray(startingDay, 7),
    [startingDay]
  );

  const increaseDate = () => {
    setStartingDay(calculateNewStartingDay(startingDay, 7));
  };

  const decreaseDate = () => {
    setStartingDay(calculateNewStartingDay(startingDay, -7));
  };

  return (
    <ScrollView style={centralStyles.screenMainView}>
      <Button
        containerStyle={styles.buttonContainerStyle}
        icon={{ type: "font-awesome-5", name: "angle-double-up" }}
        onPress={decreaseDate}
        type="outline"
      />
      {menuArray.map((menu) => {
        return (
          <CalendarCard key={menu.index} menu={menu} navigation={navigation} />
        );
      })}
      <Button
        containerStyle={styles.buttonContainerStyle}
        icon={{ type: "font-awesome-5", name: "angle-double-down" }}
        onPress={increaseDate}
        type="outline"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonContainerStyle: {
    margin: 8,
  },
});
