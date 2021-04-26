import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tabBarStyle: {
    fontSize: 14,
  },
  cardTitle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    fontWeight: "bold",
  },
  cardEmpty: {
    backgroundColor: "#ddd",
  },
  cardButtons: {
    justifyContent: "space-around",
  },
  cardContent: {
    flexDirection: "row",
  },
  foodProperties: {
    //fontSize: 14,
    justifyContent: "flex-end",
  },
  averageScore: {
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default styles;
