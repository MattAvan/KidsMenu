import React, { useState, useMemo } from "react";
import { ScrollView, ActivityIndicator, Text, StyleSheet } from "react-native";
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
  /*const {
    isLoading,
    isError,
    error,
    data: menu,
  } = useQuery(`datemenus/?date__gte=${dayRange[0]}&date__lte=${dayRange[1]}`);*/

  //  console.log(dates);
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

  /*if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isError) {
    console.log(error);
    return <Text>An error occurred</Text>;
  }*/

  return (
    <ScrollView style={centralStyles.screenMainView}>
      <Button
        containerStyle={styles.buttonContainerStyle}
        icon={{ type: "font-awesome-5", name: "angle-double-up" }}
        onPress={decreaseDate}
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
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonContainerStyle: {
    margin: 8,
  },
});
