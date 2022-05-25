import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, Text } from "react-native-elements";

const UserButton = () => {
  return (
    <Avatar size="small" rounded title="M" containerStyle={styles.avatarView} />
  );
};

const styles = StyleSheet.create({
  avatarView: {
    backgroundColor: "grey",
    marginRight: 2,
  },
});

export default UserButton;
