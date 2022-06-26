import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, Text } from "react-native-elements";

const UserButton = ({ navigation }) => {
  return (
    <Avatar
      size="small"
      rounded
      title="M"
      containerStyle={styles.avatarView}
      onPress={() => navigation.toggleDrawer()}
    />
  );
};

const styles = StyleSheet.create({
  avatarView: {
    backgroundColor: "grey",
    marginRight: 10,
  },
});

export default UserButton;
