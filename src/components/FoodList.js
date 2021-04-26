import React from "react";
import { useRecoilValue } from "recoil";
import { foodIdsState } from "../state";
import FoodCard from "./FoodCard";
import {
  Container,
  Content,
  Button,
  Icon,
  Text,
  Card,
  CardItem,
  List,
  ListItem,
} from "native-base";
import styles from "../styles";

const FoodList = ({ route, navigation }) => {
  const foodIds = useRecoilValue(foodIdsState);

  return (
    <Container>
      <Content>
        <Card>
          <CardItem styles={styles.cardButtons}>
            <Button iconLeft bordered>
              <Icon name="add" />
              <Text>Add Recipe</Text>
            </Button>
          </CardItem>
        </Card>

        {foodIds.map((id) => (
          <FoodCard
            key={id}
            id={id}
            mealKey={route.params?.mealKey}
            navigation={navigation}
          />
        ))}
      </Content>
    </Container>
  );
};
export default FoodList;
