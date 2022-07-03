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
import UserButton from "../components/UserButton";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "../localState";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SideMenu from "../screens/Users/SideMenu";

const Tab = createBottomTabNavigator();
const WeekMenuStack = createStackNavigator();
const FoodListStack = createStackNavigator();
const LoginStack = createStackNavigator();
const MenuDrawer = createDrawerNavigator();

const WeekMenuRouter = () => {
  return (
    <WeekMenuStack.Navigator>
      <WeekMenuStack.Screen
        name="Menu of the Week"
        component={WeekPlanning}
        options={({ route, navigation }) => ({
          headerTitle: "Menu of the Week",
          headerLeft: () => {
            return <UserButton navigation={navigation} />;
          },
        })}
      />
      <WeekMenuStack.Screen
        name="Recipes"
        component={FoodHeader}
        options={({ route, navigation }) => ({
          headerTitle: "Recipes",
          headerLeft: () => {
            return <UserButton navigation={navigation} />;
          },
        })}
      />
    </WeekMenuStack.Navigator>
  );
};

const FoodListRouter = () => {
  return (
    <FoodListStack.Navigator>
      <FoodListStack.Screen
        name="Recipes"
        component={FoodHeader}
        options={({ route, navigation }) => ({
          headerTitle: "Recipes",
          headerLeft: () => {
            return <UserButton navigation={navigation} />;
          },
        })}
      />
      <FoodListStack.Screen
        name="Edit Food"
        component={FoodEdit}
        options={({ route, navigation }) => ({
          headerTitle: "Edit Food",
          headerLeft: () => {
            return <UserButton navigation={navigation} />;
          },
        })}
      />
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

const TabRouter = () => {
  return (
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
  );
};

const MainRouter = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MenuDrawer.Navigator
          initialRouteName="Tab"
          drawerContent={(props) => <SideMenu {...props} />}
          drawerPosition="left"
        >
          <MenuDrawer.Screen name="Tab" component={TabRouter} />
        </MenuDrawer.Navigator>
      ) : (
        <LoginRouter />
      )}
    </NavigationContainer>
  );
};

export default MainRouter;
