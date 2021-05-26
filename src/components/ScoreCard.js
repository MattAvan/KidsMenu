import React from "react";
import { AirbnbRating } from "react-native-elements";
import { View, StyleSheet } from "react-native";
import { colorPicker } from "../centralStyles";

const ScoreCard = ({ scores }) => {
  return (
    <View>
      {scores.map((score) => {
        const ratingColor =
          score.score >= 4 ? "green" : score.score >= 2 ? "orange" : "red";
        return (
          <View key={score.kid.id}>
            <AirbnbRating
              count={5}
              defaultRating={score.score}
              onFinishRating={() => null}
              reviews={[
                score.kid.kidName,
                score.kid.kidName,
                score.kid.kidName,
                score.kid.kidName,
                score.kid.kidName,
              ]}
              selectedColor={colorPicker(score.score)}
              reviewColor={colorPicker(score.score)}
              size={10}
              isDisabled={true}
              reviewSize={14}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  ratingView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default ScoreCard;
