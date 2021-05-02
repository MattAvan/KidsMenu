import React from "react";
import { ScrollView } from "react-native";
import { chain } from "lodash";
import { mealList } from "../state";
import CalendarCard from "./CalendarCard";

export default function WeekMenu({ navigation }) {
  const organizedMenu = chain(Object.entries(mealList))
    .map(([key, value]) => {
      return { ...value, mealKey: key };
    })
    .value();

  return (
    <ScrollView>
      {organizedMenu.map((dayMenu) => {
        return (
          <CalendarCard
            key={dayMenu.mealKey}
            mealKey={dayMenu.mealKey}
            navigation={navigation}
          />
        );
      })}
    </ScrollView>
  );
}
