import React, { useState, useCallback } from "react";
import { useSearchFood, useDebounce } from "../../queries";
import FoodCard from "./FoodCard";
import { View, FlatList, ActivityIndicator } from "react-native";
import { Card, Button, Icon, Text, SearchBar } from "react-native-elements";
import { centralStyles } from "../../centralStyles";

const FoodList = ({ route, navigation }) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const {
    isLoading,
    isError,
    data: foods,
    error,
  } = useSearchFood(debouncedSearch);

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
        <SearchBar
          value={search}
          onChangeText={(text) => setSearch(text)}
          placeholder="Search for food"
          lightTheme
        />
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
