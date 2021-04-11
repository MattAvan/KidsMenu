import React, { useState } from "react";
import WeekMenu from "./WeekMenu";
import FoodList from "./FoodList";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import DataLoader from "./DataLoader";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

const Drawer = createBottomTabNavigator();
const WeekMenuStack = createStackNavigator();
const FoodListStack = createStackNavigator();

const WeekMenuRouter = () => {
  return (
    <WeekMenuStack.Navigator>
      <WeekMenuStack.Screen name="Menu of the Week" component={WeekMenu} />
      <WeekMenuStack.Screen name="Recipes" component={FoodList} />
    </WeekMenuStack.Navigator>
  );
};

const FoodListRouter = () => {
  return (
    <FoodListStack.Navigator>
      <FoodListStack.Screen name="Recipes" component={FoodList} />
    </FoodListStack.Navigator>
  );
};

const MainRouter = () => {
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
    <NavigationContainer>
      <DataLoader />
      <Drawer.Navigator initialRouteName="Main">
        <Drawer.Screen name="Weekly Menu" component={WeekMenuRouter} />
        <Drawer.Screen name="Recipes" component={FoodListRouter} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MainRouter;
