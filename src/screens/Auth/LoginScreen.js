import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useQueryClient } from "react-query";
import { isLoggedInState, tokenState, errorState } from "../../localState";
import * as SecureStore from "expo-secure-store";
import { View, StyleSheet } from "react-native";
import { Input, Button, Image } from "react-native-elements";
import { useLogin } from "../../queries";
import axios from "axios";
import { endPoint } from "../../api";
import LogoImage from "../../KidsMenu.png";

const LoginScreen = () => {
  const [token, setToken] = useRecoilState(tokenState);
  const setError = useSetRecoilState(errorState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const sendCredentials = useLogin(setToken, setError);
  const queryClient = useQueryClient();

  // Flow: check if the token is in the state. If it is not (empty when loading the app) get it
  // from the Secure store. If SS is empty -> doesn't change, stay on login screen ; if SS has something,
  // set it in state -> logged in, and update the default query function

  useEffect(async () => {
    if (!token) {
      //Next line: to uncomment in case i need to remove the secured token
      //await SecureStore.deleteItemAsync("token");
      const secureToken = await SecureStore.getItemAsync("token");
      if (secureToken) {
        setToken(`Token ${secureToken}`);
      }
    } else {
      const authDefaultQueryFn = async ({ queryKey }) => {
        const { data } = await axios(`${endPoint}${queryKey[0]}`, {
          headers: { Authorization: token },
        });
        return data;
      };
      queryClient.setDefaultOptions({
        queries: { queryFn: authDefaultQueryFn },
      });
      setIsLoggedIn(true);
    }
  }, [token]);

  const pressButton = async () => {
    await sendCredentials.mutate({
      email: email.toLowerCase(),
      password: password,
    });
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.imageView}>
        <Image source={LogoImage} style={styles.image} />
      </View>
      <View style={styles.formView}>
        <Input
          label="Email"
          placeholder="email@address.com"
          textContentType="emailAddress"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          label="Password"
          placeholder="Password"
          textContentType="password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button title="Login" onPress={pressButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: { flexDirection: "column", justifyContent: "space-around" },
  imageView: { justifyContent: "center", alignItems: "center" },
  formView: {},
  image: {
    width: 300,
    height: 200,
    resizeMode: "contain",
  },
});

export default LoginScreen;
