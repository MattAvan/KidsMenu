import { StyleSheet } from "react-native";

export const centralStyles = StyleSheet.create({
  screenMainView: {
    marginBottom: 8,
    flex: 1,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  foodTitle: {
    fontSize: 18,
  },
  cardEmpty: {
    backgroundColor: "#ddd",
  },
  foodProperties: {
    //fontSize: 14,
    justifyContent: "flex-end",
  },
});

export const iconConfig = {
  proteins: {
    type: "material-community",
    name: "food-drumstick",
    color: "brown",
  },
  fish: {
    type: "font-awesome-5",
    name: "fish",
    color: "blue",
  },
  vegetables: {
    type: "font-awesome-5",
    name: "leaf",
    color: "green",
  },
};
