import React from "react";
import { useRecoilValue } from "recoil";
import { foodIdsState } from "../../state";
import FoodCard from "./FoodCard";
import { View, FlatList } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import { centralStyles } from "../../centralStyles";

const FoodList = ({ route, navigation }) => {
  const foodIds = useRecoilValue(foodIdsState);
  const renderFoodCard = ({ item }) => (
    <Card>
      <FoodCard
        id={item}
        mealKey={route.params?.mealKey}
        navigation={navigation}
        editable={route.params?.editable}
      />
    </Card>
  );

  return (
    <View style={centralStyles.screenMainView}>
      <Card>
        <Button
          onPress={() => navigation.navigate("Edit Food")}
          title="Add Recipe"
          icon={<Icon name="add" />}
          type="outline"
        />
      </Card>

      <FlatList
        data={foodIds}
        renderItem={renderFoodCard}
        keyExtractor={(item) => item.toString()}
      />
    </View>
  );
};
export default FoodList;
