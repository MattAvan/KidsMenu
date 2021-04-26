import React, { useState } from "react";
import WeekMenu from "./WeekMenu";
import FoodList from "./FoodList";
import FoodEdit from "./FoodEdit";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import DataLoader from "./DataLoader";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "native-base";
import styles from "../styles";

const Tab = createBottomTabNavigator();
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
      <FoodListStack.Screen name="Edit Food" component={FoodEdit} />
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
      <Tab.Navigator
        initialRouteName="Weekly Menu"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Weekly Menu") {
              iconName = focused ? "calendar" : "calendar-outline";
            } else if (route.name === "Recipes") {
              iconName = focused ? "library" : "library-outline";
            }
            return <Icon name={iconName} />;
          },
        })}
        tabBarOptions={{
          labelStyle: styles.tabBarStyle,
          color: "blue",
        }}
      >
        <Tab.Screen name="Weekly Menu" component={WeekMenuRouter} />
        <Tab.Screen name="Recipes" component={FoodListRouter} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainRouter;
