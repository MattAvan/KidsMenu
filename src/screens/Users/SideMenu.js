import React from "react";
import { useSetRecoilState } from "recoil";
import { Text, Button } from "react-native-elements";
import { View, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { isLoggedInState, tokenState } from "../../localState";
import { useQuery } from "react-query";

const SideMenu = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const setToken = useSetRecoilState(tokenState);
  const {
    isLoading,
    isError,
    data: user,
    error,
  } = useQuery(`dj-rest-auth/user/`);

  //console.log(user);

  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    setToken("");
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.mainView}>
      <Text>{user.email}</Text>
      <Button title="logout" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textView: {
    flex: 1,
  },
});

export default SideMenu;
