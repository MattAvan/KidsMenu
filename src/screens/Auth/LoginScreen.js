import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useQueryClient } from "react-query";
import { isLoggedInState, tokenState } from "../../localState";
import * as SecureStore from "expo-secure-store";
import { View } from "react-native";
import { Input, Button } from "react-native-elements";
import { useLogin } from "../../queries";
import axios from "axios";
import { endPoint } from "../../api";

const LoginScreen = () => {
  const [token, setToken] = useRecoilState(tokenState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const sendCredentials = useLogin(setIsLoggedIn, setToken);
  const queryClient = useQueryClient();

  // Flow: check if the token is in the state. If it is not (empty when loading the app) get it
  // from the Secure store. If SS is empty -> doesn't change, stay on login screen ; if SS has something,
  // set it in state -> logged in, and update the default query function

  useEffect(async () => {
    if (!token) {
      //Next line: to uncomment in case i need to remove the secured token
      //await SecureStore.deleteItemAsync("token");
      const secureToken = await SecureStore.getItemAsync("token");
      setToken(`Token ${secureToken}`);
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
    await sendCredentials.mutate({ email: email, password: password });
  };

  return (
    <View>
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
  );
};

export default LoginScreen;
