import React from "react";
//import { StyleSheet } from "react-native";
import {
  Container,
  Text,
  Header,
  Content,
  Footer,
  Left,
  Right,
  Button,
  Icon,
  Body,
  Title,
} from "native-base";
import { chain } from "lodash";
import { mealList } from "../state";
import CalendarCard from "./CalendarCard";

export default function WeekMenu() {
  const organizedMenu = chain(Object.entries(mealList))
    .map(([key, value]) => {
      return { ...value, mealKey: key };
    })
    .value();

  return (
    <Container>
      <Content padder>
        {organizedMenu.map((dayMenu) => {
          return (
            <CalendarCard key={dayMenu.mealKey} mealKey={dayMenu.mealKey} />
          );
        })}
      </Content>
    </Container>
  );
}
