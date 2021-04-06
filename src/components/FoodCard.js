import React from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  foodState,
  foodModalIsOpenState,
  weekMenuState,
  useWeekMenusRecoilState,
} from "../state";
import { Card, CardItem, Text, Grid, Col, Title, Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import styles from "../styles";

const FoodCard = ({ id, mealKey }) => {
  const foodItem = useRecoilValue(foodState(id));
  const setFoodModalIsOpen = useSetRecoilState(foodModalIsOpenState(mealKey));
  const [menu, setMenu, setMenuAndSave] = useWeekMenusRecoilState(mealKey);

  const handlePress = () => {
    const newState = { ...menu, food: [id] };
    setMenuAndSave(newState);
    setFoodModalIsOpen(false);
  };

  const buildBody = (item) => {
    const proteinsIcon = item.containsProteins ? "paw" : "close";
    const proteinsText = item.containsProteins
      ? "Contains Proteins"
      : "No Proteins";
    const vegetablesIcon = item.containsVegetables ? "leaf" : "close";
    const vegetablesText = item.containsVegetables
      ? "Contains Vegetables"
      : "No Vegetables";
    const fishIcon = item.containsFish ? "boat" : "close";
    const fishText = item.containsFish ? "Contains Fish" : "No Fish";
    return (
      <Grid>
        <Col>
          <Icon name={proteinsIcon} />
          <Text>{proteinsText}</Text>
        </Col>
        <Col>
          <Icon name={vegetablesIcon} />
          <Text>{vegetablesText}</Text>
        </Col>
        <Col>
          <Icon name={fishIcon} />
          <Text>{fishText}</Text>
        </Col>
      </Grid>
    );
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Card padder>
        <CardItem style={styles.cardTitle} header>
          <Text>{foodItem.foodName}</Text>
        </CardItem>
        <CardItem>{buildBody(foodItem)}</CardItem>
      </Card>
    </TouchableOpacity>
  );
};

export default FoodCard;
