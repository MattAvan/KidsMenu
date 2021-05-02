import React from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  foodState,
  useWeekMenusRecoilState,
  averageFoodRatingState,
} from "../state";
import { TouchableOpacity, View } from "react-native";
import { Card, Button, Icon, Avatar } from "react-native-elements";
import styles from "../styles";
import FoodProperties from "./FoodProperties";
import ScoreCard from "./ScoreCard";

const FoodCard = ({ id, mealKey, navigation }) => {
  const foodItem = useRecoilValue(foodState(id));
  const [menu, setMenu, setMenuAndSave] = useWeekMenusRecoilState(mealKey);

  const handlePress = () => {
    const newState = { ...menu, food: [id] };
    setMenuAndSave(newState);
    navigation.navigate("Weekly Menu", { screen: "Menu of the Week" });
  };

  return (
    <TouchableOpacity disabled={!mealKey} onPress={handlePress}>
      <Card>
        <Card.Title>{foodItem.foodName}</Card.Title>
        <Card.Divider />
        <View>
          <Avatar source={{ uri: foodItem.foodImage }} />
          <ScoreCard scores={foodItem.scores} />
          <FoodProperties item={foodItem} showText={false} />
        </View>
        <View>
          <Button
            type="outline"
            icon={<Icon type="ionicon" name="pencil" />}
            title="Edit"
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default FoodCard;
