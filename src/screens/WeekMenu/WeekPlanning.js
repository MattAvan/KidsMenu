import React, { useState, useMemo, useEffect, useCallback } from "react";
import { ScrollView, StyleSheet, View, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import PlanningCard from "./PlanningCard";
import { centralStyles } from "../../centralStyles";
import {
  getPreviousMonday,
  createMenuArray,
  calculateNewStartingDay,
} from "../../utils";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default function WeekPlanning({ navigation }) {
  const [startingDay, setStartingDay] = useState(getPreviousMonday());
  const [dimensions, setDimensions] = useState({ window, screen });
  console.log(dimensions);

  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };

  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });

  const breakPoint = useMemo(() => {
    let mainAreaStyle;
    let menuCardStyle;
    let scrollViewIsHorizontal;
    let buttonContainerStyle = styles.buttonContainerStyle;
    let buttonStyle = {};
    let windowStyle = centralStyles.screenMainView;
    let previousIcon = "angle-double-up";
    let nextIcon = "angle-double-down";
    if (dimensions.window.width < 575) {
      mainAreaStyle = styles.mainAreaSmallMedium;
      menuCardStyle = styles.menuCardSmall;
      scrollViewIsHorizontal = false;
    } else if (dimensions.window.width < 1000) {
      mainAreaStyle = styles.mainAreaSmallMedium;
      menuCardStyle = styles.menuCardMedium;
      scrollViewIsHorizontal = false;
    } else {
      mainAreaStyle = styles.mainAreaLarge;
      menuCardStyle = styles.menuCardLarge;
      buttonContainerStyle = [styles.buttonContainerStyle, { height: "100%" }];
      buttonStyle = { height: "100%" };
      scrollViewIsHorizontal = true;
      windowStyle = [
        centralStyles.screenMainView,
        { flexDirection: "row", alignItems: "stretch" },
      ];
      previousIcon = "angle-double-left";
      nextIcon = "angle-double-right";
    }
    return {
      mainAreaStyle,
      menuCardStyle,
      scrollViewIsHorizontal,
      buttonContainerStyle,
      buttonStyle,
      windowStyle,
      previousIcon,
      nextIcon,
    };
  }, [dimensions]);

  const menuArray = useMemo(
    () => createMenuArray(startingDay, 7),
    [startingDay]
  );

  const increaseDate = () => {
    setStartingDay(calculateNewStartingDay(startingDay, 7));
  };

  const decreaseDate = () => {
    setStartingDay(calculateNewStartingDay(startingDay, -7));
  };

  return (
    <View style={breakPoint.windowStyle}>
      <Button
        containerStyle={breakPoint.buttonContainerStyle}
        buttonStyle={breakPoint.buttonStyle}
        icon={{ type: "font-awesome-5", name: breakPoint.previousIcon }}
        onPress={decreaseDate}
        type="outline"
      />
      <ScrollView
        contentContainerStyle={breakPoint.mainAreaStyle}
        horizontal={breakPoint.scrollViewIsHorizontal}
      >
        {menuArray.map((menu) => {
          return (
            <View style={breakPoint.menuCardStyle} key={menu.index}>
              <PlanningCard menu={menu} navigation={navigation} />
            </View>
          );
        })}
      </ScrollView>
      <Button
        containerStyle={breakPoint.buttonContainerStyle}
        buttonStyle={breakPoint.buttonStyle}
        icon={{ type: "font-awesome-5", name: breakPoint.nextIcon }}
        onPress={increaseDate}
        type="outline"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainerStyle: {
    margin: 4,
  },
  mainAreaSmallMedium: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
  },
  mainAreaLarge: {
    flexDirection: "column",
    alignItems: "stretch",
    flexWrap: "wrap",
  },
  menuCardSmall: {
    width: "100%",
  },
  menuCardMedium: {
    width: "50%",
  },
  menuCardLarge: { height: "50%", width: 330 },
});
