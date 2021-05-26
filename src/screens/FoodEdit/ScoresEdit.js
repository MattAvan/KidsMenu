import React from "react";
import { View, StyleSheet } from "react-native";
import { AirbnbRating, Text } from "react-native-elements";
import { colorPicker } from "../../centralStyles";

const ScoresEdit = ({ scores, index, setScores }) => {
  const score = scores[index];
  const handleRating = (rating) => {
    const newScores = [...scores];
    newScores[index] = { ...score, score: rating };
    setScores(newScores);
  };

  return (
    <View>
      <Text>{score.kid.kidName}:</Text>
      <AirbnbRating
        count={5}
        defaultRating={score.score}
        onFinishRating={handleRating}
        reviews={["Nope", "Meh", "OK", "Good", "Great !"]}
        selectedColor={colorPicker(score.score)}
        reviewColor={colorPicker(score.score)}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ScoresEdit;
