import React from "react";
import { Card, Text, Button, Icon } from "react-native-elements";
import { View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { foodState, emptyFoodState, useWeekMenusRecoilState } from "../state";
import FoodList from "./FoodList";
import CardTitle from "./CardTitle";
import FoodCard from "./FoodCard";
import centralStyles from "../centralStyles";
import _ from "lodash";

const CalendarCard = ({ mealKey, navigation }) => {
  const [menu, setMenu, setMenuAndSave] = useWeekMenusRecoilState(mealKey);
  const noFood = !menu.food || menu.food.length == 0 || _.isEmpty(menu.food);
  const foodArgument = noFood ? emptyFoodState : foodState(menu.food[0]);
  const food = useRecoilValue(foodArgument);

  const handleAdd = () =>
    navigation.navigate("Weekly Menu", {
      screen: "Recipes",
      params: { mealKey: mealKey, editable: false },
    });

  const handleRemove = () => {
    const newMenu = { ...menu, food: [] };
    setMenuAndSave(newMenu);
  };

  if (noFood) {
    return (
      <Card containerStyle={centralStyles.cardEmpty}>
        <CardTitle
          title={`${menu.weekDay} ${menu.mealTime}`}
          iconRight={<Icon name="add" />}
          onPressRight={handleAdd}
        />
        <Card.Divider />
      </Card>
    );
  }

  return (
    <Card>
      <CardTitle
        title={`${menu.weekDay} ${menu.mealTime}`}
        iconRight={<Icon type="ionicon" name="swap-horizontal" />}
        onPressRight={handleAdd}
        iconLeft={<Icon type="ionicon" name="close" />}
        onPressLeft={handleRemove}
      />
      <Card.Divider />
      <View>
        <FoodCard id={food.id} editable={false} />
      </View>
    </Card>
  );
};

export default CalendarCard;
