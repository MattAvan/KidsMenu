import React from "react";
import { useQuery } from "react-query";
import FoodCard from "./FoodCard";
import { View, FlatList, ActivityIndicator } from "react-native";
import { Card, Button, Icon, Text } from "react-native-elements";
import { centralStyles } from "../../centralStyles";

const FoodList = ({ route, navigation }) => {
  const { isLoading, isError, data: foods, error } = useQuery("foods/");

  const renderFoodCard = ({ item }) => (
    <Card>
      <FoodCard
        id={item.id}
        menu={route.params?.menu}
        menuID={route.params?.menuID}
        navigation={navigation}
        editable={route.params?.editable}
      />
    </Card>
  );

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isError) {
    console.log(error);
    return <Text>An error occurred</Text>;
  }

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
        data={foods}
        renderItem={renderFoodCard}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};
export default FoodList;
