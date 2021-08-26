import React from "react";
import { useQuery } from "react-query";
import { useSetNewFoodOnMenu } from "../../queries";
import { Pressable, View, StyleSheet, ActivityIndicator } from "react-native";
import { Icon, Avatar, Text } from "react-native-elements";
import { centralStyles } from "../../centralStyles";
import FoodProperty from "../../components/FoodProperty";
import ScoreCard from "../../components/ScoreCard";
import _ from "lodash";

const FoodCard = ({ id, menu, menuID, navigation, editable = true }) => {
  const {
    isLoading,
    isError,
    data: foodItem,
    error,
  } = useQuery(`foods/${id}/`);

  const setNewFoodOnMenu = useSetNewFoodOnMenu(menu, menuID);

  const handlePress = () => {
    setNewFoodOnMenu.mutate(id);
    navigation.navigate("Weekly Menu", { screen: "Menu of the Week" });
  };

  const handleEdit = () => {
    navigation.navigate("Edit Food", { foodItem: foodItem });
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isError) {
    return <Text>An error occurred</Text>;
  }

  return (
    <Pressable disabled={!menu} onPress={handlePress}>
      <View style={styles.mainView}>
        <View style={styles.titleView}>
          <Text style={centralStyles.foodTitle}>{foodItem.foodName}</Text>
          {editable ? (
            <Icon type="font-awesome-5" name="edit" onPress={handleEdit} />
          ) : null}
        </View>
        <View style={styles.bodyView}>
          <Avatar
            containerStyle={styles.avatarView}
            size="xlarge"
            source={
              foodItem.foodImage ? { uri: foodItem.foodImage } : undefined
            }
            title={foodItem.foodName[0]}
          />
          <View style={styles.secondaryInformationView}>
            <ScoreCard scores={foodItem.scores} />
            <View style={styles.foodPropertiesView}>
              <FoodProperty
                propertyName="proteins"
                isPropertyActive={foodItem.containsProteins}
              />
              <FoodProperty
                propertyName="vegetables"
                isPropertyActive={foodItem.containsVegetables}
                needsMargin={true}
              />
              <FoodProperty
                propertyName="fish"
                isPropertyActive={foodItem.containsFish}
              />
            </View>
          </View>
        </View>
      </View>
    </Pressable>
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
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  bodyView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatarView: {
    flex: 2,
    backgroundColor: "grey",
  },
  foodPropertiesView: {
    flexDirection: "row",
    justifyContent: "space-between",
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
