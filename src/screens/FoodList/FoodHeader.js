import React, { useState } from "react";
import { useDebounce } from "../../queries";
import FoodList from "./FoodList";
import { View, FlatList, ActivityIndicator } from "react-native";
import { Card, Button, Icon, Text, SearchBar } from "react-native-elements";
import { centralStyles } from "../../centralStyles";

const FoodHeader = ({ route, navigation }) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

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
      <FoodList
        debouncedSearch={debouncedSearch}
        navigation={navigation}
        route={route}
      />
    </View>
  );
};
export default FoodHeader;
