import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "react-native-elements";
import WeekMenu from "./WeekMenu";
import FoodList from "./FoodList";
import FoodEdit from "./FoodEdit";
import DataLoader from "./DataLoader";
import centralStyles from "../centralStyles";

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
            return <Icon type="ionicon" name={iconName} />;
          },
        })}
        tabBarOptions={{
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
