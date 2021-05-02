import React from "react";
import { Card, Text, Button, Icon } from "react-native-elements";
import { View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { foodState, emptyFoodState, useWeekMenusRecoilState } from "../state";
import FoodList from "./FoodList";
import styles from "../styles";

const CalendarCard = ({ mealKey, navigation }) => {
  const [menu, setMenu, setMenuAndSave] = useWeekMenusRecoilState(mealKey);
  const noFood = !menu.food || menu.food.length == 0;
  const foodArgument = noFood ? emptyFoodState : foodState(menu.food[0]);
  const food = useRecoilValue(foodArgument);

  if (noFood) {
    return (
      <Card>
        <Card.Title>{`${menu.weekDay} ${menu.mealTime}`}</Card.Title>
        <Card.Divider />
        <View style={[styles.cardButtons, styles.cardEmpty]}>
          <Button
            onPress={() =>
              navigation.navigate("Weekly Menu", {
                screen: "Recipes",
                params: { mealKey: mealKey },
              })
            }
            title="Add"
            icon={<Icon name="add" />}
            type="outline"
          />
        </View>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Title>{`${menu.weekDay} ${menu.mealTime}`}</Card.Title>
      <Card.Divider />
      <View>
        <Text>{food.foodName}</Text>
      </View>
      <View style={styles.cardButtons}>
        <Button
          onPress={() =>
            navigation.navigate("Weekly Menu", {
              screen: "Recipes",
              params: { mealKey: mealKey },
            })
          }
          title="Change"
          icon={<Icon type="ionicon" name="swap-horizontal" />}
          type="outline"
        />
        <Button
          onPress={() => {
            const newMenu = { ...menu, food: [] };
            setMenuAndSave(newMenu);
          }}
          title="Remove"
          icon={<Icon type="ionicon" name="close" />}
          type="outline"
        />
      </View>
    </Card>
  );
};

export default CalendarCard;
