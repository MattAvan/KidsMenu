import React from "react";
import { CheckBox, Text, Icon } from "react-native-elements";
import { View, StyleSheet } from "react-native";
import FoodProperty from "../../components/FoodProperty";

const FoodPropertyEdit = ({ text, checked, onPress, propertyName }) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.checkBoxView}>
        <CheckBox checked={checked} onPress={onPress} />
        <Text>{text}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <FoodProperty propertyName={propertyName} isPropertyActive={checked} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkBoxView: {
    flexDirection: "row",
    alignItems: "center",
    flex: 2,
  },
});

export default FoodPropertyEdit;
