import React from "react";
import { useSetNewFoodOnMenu } from "../../queries";
import { Card, Text, Button, Icon } from "react-native-elements";
import { View } from "react-native";
import CardTitle from "../../components/CardTitle";
import FoodCard from "../FoodList/FoodCard";
import { centralStyles } from "../../centralStyles";
import _ from "lodash";

const CalendarCard = ({ menu, navigation }) => {
  const noFood = !menu.food || menu.food.length == 0 || _.isEmpty(menu.food);
  const setNewFoodOnMenu = useSetNewFoodOnMenu(menu.id);

  const handleAdd = () =>
    navigation.navigate("Weekly Menu", {
      screen: "Recipes",
      params: { mealId: menu.id, editable: false },
    });

  const handleRemove = () => {
    setNewFoodOnMenu.mutate(null);
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
        <FoodCard id={menu.food[0]} editable={false} />
      </View>
    </Card>
  );
};

export default CalendarCard;
