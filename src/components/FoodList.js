import React from "react";
import { useRecoilState } from "recoil";
import { foodIdsState } from "../state";
import FoodCard from "./FoodCard";
import { Container, Content } from "native-base";

const FoodList = ({ mealKey }) => {
  const [foodIds, setFoodIds] = useRecoilState(foodIdsState);

  return (
    <Container>
      <Content>
        {foodIds.map((id) => (
          <FoodCard key={id} id={id} mealKey={mealKey} />
        ))}
      </Content>
    </Container>
  );
};
export default FoodList;
