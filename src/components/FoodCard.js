import React from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  foodState,
  weekMenuState,
  useWeekMenusRecoilState,
  averageFoodRatingState,
} from "../state";
import {
  Container,
  Card,
  CardItem,
  Text,
  Grid,
  Col,
  Row,
  Title,
  Icon,
  Button,
  Right,
  Left,
  Content,
  Thumbnail,
} from "native-base";
import { TouchableOpacity, View } from "react-native";
import styles from "../styles";
import FoodProperties from "./FoodProperties";
import ScoreCard from "./ScoreCard";

const FoodCard = ({ id, mealKey, navigation }) => {
  const foodItem = useRecoilValue(foodState(id));
  const [menu, setMenu, setMenuAndSave] = useWeekMenusRecoilState(mealKey);
  const averageScore = useRecoilValue(averageFoodRatingState(id));
  const handlePress = () => {
    const newState = { ...menu, food: [id] };
    setMenuAndSave(newState);
    navigation.navigate("Weekly Menu", { screen: "Menu of the Week" });
  };
  console.log(foodItem.foodImage);
  return (
    <TouchableOpacity disabled={!mealKey} onPress={handlePress}>
      <Card padder>
        <CardItem style={styles.cardTitle} header>
          <Text>{foodItem.foodName}</Text>
        </CardItem>
        <CardItem>
          <Left>
            <Thumbnail square large source={{ uri: foodItem.foodImage }} />
          </Left>
          <Content>
            <ScoreCard scores={foodItem.scores} average={averageScore} />
          </Content>
          <Right>
            <FoodProperties item={foodItem} showText={false} />
          </Right>
        </CardItem>
        <CardItem>
          <Button iconLeft bordered small>
            <Icon name="pencil" />
            <Text>Edit</Text>
          </Button>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

export default FoodCard;
