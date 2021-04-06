import React from "react";
import { Card, CardItem, Text, Grid, Col, Title, Icon } from "native-base";
import CalendarCard from "./CalendarCard";
import { chain } from "lodash";
import { mealList } from "../state";

const Calendar = () => {
  const organizedMenu = chain(Object.entries(mealList))
    .map(([key, value]) => {
      return { ...value, mealKey: key };
    })
    .value();

  return (
    <>
      {organizedMenu.map((dayMenu) => {
        return <CalendarCard key={dayMenu.mealKey} mealKey={dayMenu.mealKey} />;
      })}
    </>
  );
};

export default Calendar;
