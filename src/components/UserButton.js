import React from "react";
import { StyleSheet } from "react-native";
import { Icon, Text } from "react-native-elements";

const UserButton = ({ navigation }) => {
  return (
    <Icon
      name="menu"
      type="material"
      color="grey"
      containerStyle={styles.iconView}
      onPress={() => navigation.toggleDrawer()}
    />
  );
};

const styles = StyleSheet.create({
  iconView: {
    marginRight: 10,
    marginLeft: 10,
  },
});

export default UserButton;
