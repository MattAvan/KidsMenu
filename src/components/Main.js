import React, { useState } from "react";
//import { StyleSheet } from "react-native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import {
  Container,
  Text,
  Header,
  Content,
  Footer,
  Left,
  Right,
  Button,
  Icon,
  Body,
  Title,
} from "native-base";
import FoodList from "./FoodList";
import DataLoader from "./DataLoader";
import Calendar from "./Calendar";

export default function Main() {
  const [isReady, setIsReady] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Container>
      <DataLoader />
      <Header>
        <Left>
          <Button transparent>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Kids Menu</Title>
        </Body>
        <Right />
      </Header>

      <Content padder>
        <Calendar />
        {/*<FoodList />*/}
      </Content>
      <Footer />
    </Container>
  );
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});*/
