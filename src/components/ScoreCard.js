import React from "react";
//import { Text, Container, Badge, Icon } from "native-base";
import { Chip, Text } from "react-native-elements";
import { View } from "react-native";

const ScoreCard = ({ scores }) => {
  return (
    <View>
      {scores.map((score) => {
        const chipColor =
          score.score >= 8 ? "green" : score.score >= 6 ? "orange" : "red";
        return (
          <Chip
            key={score.id}
            title={`${score.kid.kidName}: ${score.score}`}
            buttonStyle={{ backgroundColor: chipColor }}
          />
        );
      })}
    </View>
  );
};

export default ScoreCard;
