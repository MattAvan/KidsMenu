import React from "react";
import { Text, Container, Badge, Icon } from "native-base";
import { View } from "react-native";

const ScoreCard = ({ scores, average }) => {
  const averageColor = average >= 8 ? "green" : average >= 6 ? "orange" : "red";
  return (
    <View>
      {scores.map((score) => {
        const badgeColor =
          score.score >= 8 ? "green" : score.score >= 6 ? "orange" : "red";
        return (
          <View key={score.id} style={{ flexDirection: "row" }}>
            <Text>{score.kid.kidName} </Text>
            <Badge style={{ backgroundColor: badgeColor }}>
              <Text>{score.score}</Text>
            </Badge>
          </View>
        );
      })}
      <View style={{ flexDirection: "row" }}>
        <Text>Average </Text>
        <Badge style={{ backgroundColor: averageColor }}>
          <Text>{average}</Text>
        </Badge>
      </View>
    </View>
  );
};

export default ScoreCard;
