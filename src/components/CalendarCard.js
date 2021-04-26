import React from "react";
import {
  Card,
  CardItem,
  Text,
  Button,
  Grid,
  Col,
  Title,
  Icon,
} from "native-base";
import { Modal } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  weekMenuState,
  foodState,
  emptyFoodState,
  useWeekMenusRecoilState,
} from "../state";
import FoodList from "./FoodList";
import styles from "../styles";

const CalendarCard = ({ mealKey, navigation }) => {
  const [menu, setMenu, setMenuAndSave] = useWeekMenusRecoilState(mealKey);
  const noFood = !menu.food || menu.food.length == 0;
  let food;
  let cardStyle;
  if (noFood) {
    food = useRecoilValue(emptyFoodState);
    cardStyle = styles.cardEmpty;
  } else {
    food = useRecoilValue(foodState(menu.food[0]));
    cardStyle = {};
  }

  return (
    <Card>
      <CardItem style={[styles.cardTitle, cardStyle]}>
        <Text>{`${menu.weekDay} ${menu.mealTime}`}</Text>
      </CardItem>
      {noFood ? (
        <></>
      ) : (
        <CardItem style={cardStyle}>
          <Text>{food.foodName}</Text>
        </CardItem>
      )}
      <CardItem style={[styles.cardButtons, cardStyle]}>
        {noFood ? (
          <Button
            onPress={() =>
              navigation.navigate("Weekly Menu", {
                screen: "Recipes",
                params: { mealKey: mealKey },
              })
            }
            iconLeft
            bordered
            small
          >
            <Icon name="add" />
            <Text>Add</Text>
          </Button>
        ) : (
          <>
            <Button
              onPress={() =>
                navigation.navigate("Weekly Menu", {
                  screen: "Recipes",
                  params: { mealKey: mealKey },
                })
              }
              iconLeft
              bordered
              small
            >
              <Icon name="swap-horizontal" />
              <Text>Change</Text>
            </Button>
            <Button
              onPress={() => {
                const newMenu = { ...menu, food: [] };
                setMenuAndSave(newMenu);
              }}
              iconLeft
              bordered
              small
            >
              <Icon name="close" />
              <Text>Remove</Text>
            </Button>
          </>
        )}
      </CardItem>
    </Card>
  );
};

export default CalendarCard;
