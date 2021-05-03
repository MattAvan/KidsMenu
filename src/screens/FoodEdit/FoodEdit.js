import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Card } from "react-native-elements";
import FoodPropertyEdit from "./FoodPropertyEdit";

const FoodEdit = ({ navigation }) => {
  const [foodName, setFoodName] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  const handleProteins = () => setCheckbox(!checkbox);

  return (
    <View>
      <Card>
        <Input label="Recipe name" onChangeText={(text) => setFoodName(text)} />
        <FoodPropertyEdit
          text="Contains Proteins"
          propertyName="proteins"
          checked={checkbox}
          onPress={handleProteins}
        />
        <FoodPropertyEdit
          text="Contains Veggies"
          propertyName="vegetables"
          checked={checkbox}
          onPress={handleProteins}
        />
        <FoodPropertyEdit
          text="Contains Fish"
          propertyName="fish"
          checked={checkbox}
          onPress={handleProteins}
        />
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
