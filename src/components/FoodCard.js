import React from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  foodState,
  useWeekMenusRecoilState,
  averageFoodRatingState,
} from "../state";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Icon, Avatar, Text } from "react-native-elements";
import centralStyles from "../centralStyles";
import FoodProperties from "./FoodProperties";
import ScoreCard from "./ScoreCard";
import _ from "lodash";

const FoodCard = ({ id, mealKey, navigation, editable = true }) => {
  const foodItem = useRecoilValue(foodState(id));
  const [menu, setMenu, setMenuAndSave] = useWeekMenusRecoilState(mealKey);
  const handlePress = () => {
    const newState = { ...menu, food: [id] };
    setMenuAndSave(newState);
    navigation.navigate("Weekly Menu", { screen: "Menu of the Week" });
  };

  if (!foodItem || _.isEmpty(foodItem)) {
    return null;
  }

  return (
    <TouchableOpacity disabled={!mealKey} onPress={handlePress}>
      <View style={styles.mainView}>
        <View style={styles.titleView}>
          <Text style={centralStyles.foodTitle}>{foodItem.foodName}</Text>
          {editable ? <Icon type="font-awesome-5" name="edit" /> : null}
        </View>
        <View style={styles.bodyView}>
          <Avatar
            containerStyle={styles.avatarView}
            size="xlarge"
            source={
              foodItem.foodImage ? { uri: foodItem.foodImage } : undefined
            }
            title={foodItem.foodName[0]}
          ></Avatar>
          <View style={styles.secondaryInformationView}>
            <ScoreCard scores={foodItem.scores} />
            <FoodProperties item={foodItem} showText={false} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  titleView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bodyView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatarView: {
    flex: 2,
    backgroundColor: "grey",
  },
  secondaryInformationView: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
});

export default FoodCard;
