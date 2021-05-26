import React from "react";
import { ScrollView, ActivityIndicator, Text } from "react-native";
import CalendarCard from "./CalendarCard";
import { centralStyles } from "../../centralStyles";
import { useQuery } from "react-query";

export default function WeekMenu({ navigation }) {
  const { isLoading, isError, error, data: menu } = useQuery("weekmenus/");

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isError) {
    console.log(error);
    return <Text>An error occurred</Text>;
  }

  return (
    <ScrollView style={centralStyles.screenMainView}>
      {menu.map((dayMenu) => {
        return (
          <CalendarCard
            key={dayMenu.id}
            menu={dayMenu}
            navigation={navigation}
          />
        );
      })}
    </ScrollView>
  );
}
