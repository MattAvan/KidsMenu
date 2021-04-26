import React from "react";
import { Card, CardItem, Text, Grid, Col, Row, Title, Icon } from "native-base";
import styles from "../styles";

const FoodProperties = ({ item, showText }) => {
  const proteinsIcon = item.containsProteins ? "paw" : "close";
  const proteinsText = item.containsProteins
    ? "Contains Proteins"
    : "No Proteins";
  const proteinsColor = item.containsProteins ? "red" : "grey";
  const vegetablesIcon = item.containsVegetables ? "leaf" : "close";
  const vegetablesText = item.containsVegetables
    ? "Contains Vegetables"
    : "No Vegetables";
  const vegetablesColor = item.containsVegetables ? "green" : "grey";
  const fishIcon = item.containsFish ? "boat" : "close";
  const fishText = item.containsFish ? "Contains Fish" : "No Fish";
  const fishColor = item.containsFish ? "blue" : "grey";
  return (
    <Grid>
      <Row>
        <Icon
          name={proteinsIcon}
          style={[styles.foodProperties, { color: proteinsColor }]}
        />
        {showText ?? (
          <Text style={[styles.foodProperties, { color: proteinsColor }]}>
            {proteinsText}
          </Text>
        )}
      </Row>
      <Row>
        <Icon
          name={vegetablesIcon}
          style={[styles.foodProperties, { color: vegetablesColor }]}
        />
        {showText ?? (
          <Text style={[styles.foodProperties, { color: vegetablesColor }]}>
            {vegetablesText}
          </Text>
        )}
      </Row>
      <Row>
        <Icon
          name={fishIcon}
          style={[styles.foodProperties, { color: fishColor }]}
        />
        {showText ?? (
          <Text style={[styles.foodProperties, { color: fishColor }]}>
            {fishText}
          </Text>
        )}
      </Row>
    </Grid>
  );
};

export default FoodProperties;
