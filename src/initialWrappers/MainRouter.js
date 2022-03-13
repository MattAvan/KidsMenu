import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "react-native-elements";
import FoodHeader from "../screens/FoodList/FoodHeader";
import FoodEdit from "../screens/FoodEdit/FoodEditNew";
import WeekPlanning from "../screens/WeekPlanning/WeekPlanning";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "../localState";

const Tab = createBottomTabNavigator();
const WeekMenuStack = createStackNavigator();
const FoodListStack = createStackNavigator();
const LoginStack = createStackNavigator();

const WeekMenuRouter = () => {
  return (
    <WeekMenuStack.Navigator>
      <WeekMenuStack.Screen name="Menu of the Week" component={WeekPlanning} />
      <WeekMenuStack.Screen name="Recipes" component={FoodHeader} />
    </WeekMenuStack.Navigator>
  );
};

const FoodListRouter = () => {
  return (
    <FoodListStack.Navigator>
      <FoodListStack.Screen name="Recipes" component={FoodHeader} />
      <FoodListStack.Screen name="Edit Food" component={FoodEdit} />
    </FoodListStack.Navigator>
  );
};

const LoginRouter = () => {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen name="Login" component={LoginScreen} />
      <LoginStack.Screen name="Sign Up" component={SignUpScreen} />
    </LoginStack.Navigator>
  );
};

const MainRouter = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  return (
    <NavigationContainer>
      {isLoggedIn ? (
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
      ) : (
        <LoginRouter />
      )}
    </NavigationContainer>
  );
};

export default MainRouter;
