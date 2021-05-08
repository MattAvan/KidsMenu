import React from "react";
import { Icon } from "react-native-elements";
import { iconConfig } from "../centralStyles";

// propertyName: fish, proteins, vegetables
const FoodProperty = ({
  propertyName,
  isPropertyActive,
  needsMargin = false,
}) => {
  const margin = needsMargin ? { marginRight: 4 } : {};
  const color = isPropertyActive ? iconConfig[propertyName].color : "lightgrey";
  return (
    <Icon
      name={iconConfig[propertyName].name}
      color={color}
      type={iconConfig[propertyName].type}
      containerStyle={margin}
    />
  );
};

export default FoodProperty;
