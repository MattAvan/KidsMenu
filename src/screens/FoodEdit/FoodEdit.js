import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { emptyFoodState, foodState, foodIdsState } from "../../state";
import { View, StyleSheet } from "react-native";
import { Input, Card, Button } from "react-native-elements";
import FoodPropertyEdit from "./FoodPropertyEdit";
import axios from "axios";
import { endPoint } from "../../api";

const FoodEdit = ({ navigation, foodID = null }) => {
  const stateKey = !foodID ? emptyFoodState : foodState(foodID);
  const [foodIDs, setFoodIDs] = useRecoilState(foodIdsState);
  const [foodItem, setFoodItem] = useRecoilState(stateKey);
  const [foodName, setFoodName] = useState(foodItem.foodName);
  const [proteins, setProteins] = useState(foodItem.containsProteins);
  const [vegetables, setVegetables] = useState(foodItem.containsVegetables);
  const [fish, setFish] = useState(foodItem.containsFish);
  const scores = [];

  const handleProteins = () => setProteins(!proteins);
  const handleVegetables = () => setVegetables(!vegetables);
  const handleFish = () => setFish(!fish);
  const handleSave = async () => {
    const foodItemToSave = {
      foodName: foodName,
      containsProteins: proteins,
      containsVegetables: vegetables,
      containsFish: fish,
      isMainCourse: true,
      scores: scores,
    };
    if (foodID) {
      const completeFoodItem = { ...foodItemToSave, id: foodID };
      await axios.put(`${endPoint}foods/${foodID}/`, completeFoodItem);
      setFoodItem(completeFoodItem);
    } else {
      const savedFoodItem = await axios.post(`${endPoint}foods/`, {
        ...foodItemToSave,
      });
      setFoodIDs([...foodIDs, savedFoodItem.id]);
      setFoodItem(savedFoodItem);
    }
    setFoodItem(foodItemToSave);
  };

  return (
    <View>
      <Card>
        <Input
          label="Recipe name"
          value={foodName}
          onChangeText={(text) => setFoodName(text)}
        />
        <FoodPropertyEdit
          text="Contains Proteins"
          propertyName="proteins"
          checked={proteins}
          onPress={handleProteins}
        />
        <FoodPropertyEdit
          text="Contains Veggies"
          propertyName="vegetables"
          checked={vegetables}
          onPress={handleVegetables}
        />
        <FoodPropertyEdit
          text="Contains Fish"
          propertyName="fish"
          checked={fish}
          onPress={handleFish}
        />
        <Button type="outline" title="Save" onPress={handleSave} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {},
  checkBox: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default FoodEdit;
