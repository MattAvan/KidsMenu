import React from "react";
import { useSetNewFoodOnMenu } from "../../queries";
import { Card, Text, Button, Icon } from "react-native-elements";
import { View, ActivityIndicator } from "react-native";
import CardTitle from "../../components/CardTitle";
import FoodCard from "../FoodList/FoodCard";
import { centralStyles } from "../../centralStyles";
import _ from "lodash";
import { formatMenuDay } from "../../utils";
import { useQuery } from "react-query";

const PlanningCard = ({ menu, navigation }) => {
  const {
    isLoading,
    isError,
    error,
    data: menuContent,
  } = useQuery(`datemenus/?date=${menu.date}&mealTime=${menu.mealTime}`);

  const noFood =
    !menuContent || menuContent.length == 0 || !menuContent[0]?.food;
  const menuID = noFood ? null : menuContent[0]?.id;
  const setNewFoodOnMenu = useSetNewFoodOnMenu(menu, menuID);

  const handleAdd = () =>
    navigation.navigate("Weekly Menu", {
      screen: "Recipes",
      params: { menu: menu, menuID: menuID, editable: false },
    });

  const handleRemove = () => {
    setNewFoodOnMenu.mutate(null);
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isError) {
    console.log(error);
    return <Text>An error occurred</Text>;
  }

  if (noFood) {
    return (
      <Card
        containerStyle={[centralStyles.cardLayout, centralStyles.cardEmpty]}
      >
        <CardTitle
          title={`${formatMenuDay(menu.date)} ${menu.mealTime}`}
          iconRight={<Icon name="add" />}
          onPressRight={handleAdd}
        />
        <Card.Divider />
      </Card>
    );
  }

  return (
    <Card containerStyle={centralStyles.cardLayout}>
      <CardTitle
        title={`${formatMenuDay(menu.date)} ${menu.mealTime}`}
        iconRight={<Icon type="ionicon" name="swap-horizontal" />}
        onPressRight={handleAdd}
        iconLeft={<Icon type="ionicon" name="close" />}
        onPressLeft={handleRemove}
      />
      <Card.Divider />
      <View>
        <FoodCard id={menuContent[0].food} menu={menu} editable={false} />
      </View>
    </Card>
  );
};

export default PlanningCard;
