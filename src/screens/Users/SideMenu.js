import React from "react";
import { useSetRecoilState } from "recoil";
import { Text, Button, Icon } from "react-native-elements";
import { View, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { isLoggedInState, tokenState } from "../../localState";
import { useQuery } from "react-query";

const SideMenu = ({ navigation }) => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const setToken = useSetRecoilState(tokenState);
  const {
    isLoading,
    isError,
    data: user,
    error,
  } = useQuery(`dj-rest-auth/user/`);
  const {
    isKidsLoading,
    isKidsError,
    data: kids,
    kidsError,
  } = useQuery("kidsbackend/kids/");

  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    setToken("");
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.iconView}>
        <Icon
          name="close"
          type="material"
          color="grey"
          onPress={() => navigation.toggleDrawer()}
        />
      </View>
      <View style={styles.contentView}>
        <Text>{user.email}</Text>
        <View>
          <Text>Family Members:</Text>
          {kids.map((kid) => (
            <Text key={kid.id}>{kid.kidName}</Text>
          ))}
          <Button title="Edit kids" />
        </View>
        <Button title="Logout" onPress={logout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: { flex: 1 },
  contentView: {
    flex: 8,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  iconView: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 50,
    marginLeft: 10,
  },
});

export default SideMenu;
