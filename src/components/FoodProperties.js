import React from "react";
import { View } from "react-native";
import { Icon, Text } from "react-native-elements";
import styles from "../styles";

const FoodProperties = ({ item, showText }) => {
  const proteinsText = item.containsProteins
    ? "Contains Proteins"
    : "No Proteins";
  const proteinsColor = item.containsProteins ? "brown" : "lightgrey";
  const vegetablesText = item.containsVegetables
    ? "Contains Vegetables"
    : "No Vegetables";
  const vegetablesColor = item.containsVegetables ? "green" : "lightgrey";
  const fishText = item.containsFish ? "Contains Fish" : "No Fish";
  const fishColor = item.containsFish ? "blue" : "lightgrey";
  return (
    <View>
      <Icon
        name="food-drumstick"
        color={proteinsColor}
        type="material-community"
      />
      {showText ?? (
        <Text style={[styles.foodProperties, { color: proteinsColor }]}>
          {proteinsText}
        </Text>
      )}

      <Icon name="leaf" color={vegetablesColor} type="font-awesome-5" />
      {showText ?? (
        <Text style={[styles.foodProperties, { color: vegetablesColor }]}>
          {vegetablesText}
        </Text>
      )}

      <Icon name="fish" color={fishColor} type="font-awesome-5" />
      {showText ?? (
        <Text style={[styles.foodProperties, { color: fishColor }]}>
          {fishText}
        </Text>
      )}
    </View>
  );
};

export default FoodProperties;
