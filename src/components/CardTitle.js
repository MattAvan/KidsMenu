import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Icon } from "react-native-elements";
import { centralStyles } from "../centralStyles";
/*const layout = Stylesheet.create({
    
});*/

const CardTitle = ({
  title,
  iconLeft = null,
  onPressLeft = null,
  iconRight = null,
  onPressRight = null,
}) => {
  return (
    <View style={styles.mainRow}>
      <View style={styles.leftIcon}>
        {iconLeft && React.cloneElement(iconLeft, { onPress: onPressLeft })}
      </View>
      <View style={styles.mainTitle}>
        <Text style={centralStyles.cardTitle}>{title}</Text>
      </View>
      <View style={styles.rightIcon}>
        {iconRight && React.cloneElement(iconRight, { onPress: onPressRight })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 8,
  },
  leftIcon: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  mainTitle: { flex: 3, justifyContent: "center", alignItems: "center" },
  rightIcon: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default CardTitle;
