import React from "react";
import { useSearchFood } from "../../queries";
import FoodCard from "./FoodCard";
import {
  View,
  FlatList,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { Card, Button, Icon, Text, SearchBar } from "react-native-elements";
import { centralStyles } from "../../centralStyles";

const FoodList = ({ route, navigation, debouncedSearch }) => {
  const {
    isLoading,
    isError,
    data: foods,
    error,
  } = useSearchFood(debouncedSearch);

  const { height, width } = useWindowDimensions();
  const numColumns = width < 575 ? 1 : width < 1000 ? 2 : 3;
  const renderFoodCard = ({ item }) => (
    <View style={{ flex: 1 }}>
      <Card containerStyle={centralStyles.cardLayout}>
        <FoodCard
          id={item.id}
          menu={route.params?.menu}
          menuID={route.params?.menuID}
          navigation={navigation}
          editable={route.params?.editable}
        />
      </Card>
    </View>
  );

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isError) {
    console.log(error);
    return <Text>An error occurred</Text>;
  }

  return (
    <FlatList
      data={foods}
      renderItem={renderFoodCard}
      keyExtractor={(item) => item.id.toString()}
      key={numColumns}
      numColumns={numColumns}
      columnWrapperStyle={
        numColumns > 1 ? { justifyContent: "space-between" } : null
      }
    />
  );
};
export default FoodList;
