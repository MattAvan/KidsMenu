import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useSaveFood, useDeleteFood, uploadPicture } from "../../queries";
import { ScrollView, View, StyleSheet, Modal, Platform } from "react-native";
import { Input, Card, Button, Text, Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import FoodPropertyEdit from "./FoodPropertyEdit";
import ScoresEdit from "./ScoresEdit";
import { ActivityIndicator } from "react-native";
import { centralStyles } from "../../centralStyles";

const emptyFood = {
  foodName: "",
  containsProteins: false,
  containsFish: false,
  containsVegetables: false,
  scores: [],
};

const FoodEdit = ({ route, navigation }) => {
  const { isLoading, isError, data: kids, error } = useQuery("kids/");
  const foodItem = route.params?.foodItem || emptyFood;

  //Local state for the form
  const [foodName, setFoodName] = useState(foodItem.foodName);
  const [proteins, setProteins] = useState(foodItem.containsProteins);
  const [vegetables, setVegetables] = useState(foodItem.containsVegetables);
  const [fish, setFish] = useState(foodItem.containsFish);
  /*const [image, setImage] = useState({
    uri: "",
    hasChanged: false,
  });*/
  const [image, setImage] = useState(foodItem.foodImageURL);
  const [scores, setScores] = useState(null);

  //Modal for deletion
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  //Save and delete
  const saveFood = useSaveFood(foodItem?.id);
  const deleteFood = useDeleteFood(foodItem?.id);

  // Mapping of scores with existing kids (only do it once kids are loaded)
  useEffect(() => {
    if (!isLoading) {
      const mappedScores = kids.map((kid) => {
        const kidScore = foodItem?.scores.find(
          (score) => score.kid.id == kid.id
        );
        return (
          kidScore || {
            kid: kid,
            score: 4,
            comment: "",
            ...(route.params?.foodItem && { food: foodItem.id }),
          }
        );
      });
      setScores(mappedScores);
    }
  }, [isLoading]);

  //Requesting image permission
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  // Handling the checkboxes
  const handleProteins = () => setProteins(!proteins);
  const handleVegetables = () => setVegetables(!vegetables);
  const handleFish = () => setFish(!fish);

  const handleSave = async () => {
    const foodItemToSave = {
      foodName: foodName,
      containsProteins: proteins,
      containsVegetables: vegetables,
      containsFish: fish,
      isMainCourse: true,
      scores: scores,
      foodImageURL: image,
      //...(image.hasChanged && { foodImage: image?.base64 || image.uri }), //To get both web and android to work...
    };

    await saveFood.mutate(foodItemToSave);
    navigation.navigate("Recipes");
  };

  const handleDelete = async () => {
    setDeleteModalVisible(false);
    await deleteFood.mutate();
    navigation.navigate("Recipes");
  };

  //Picking the image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      const resultData = await uploadPicture(result);
      //setImage({ ...result, hasChanged: true });
      setImage(resultData.url);
    }
  };

  //Scores
  const scoreTable = !scores ? (
    <ActivityIndicator />
  ) : (
    <View>
      {scores.map((score, index) => (
        <ScoresEdit
          key={index}
          index={index}
          scores={scores}
          setScores={setScores}
        />
      ))}
    </View>
  );

  return (
    <ScrollView style={centralStyles.screenMainView}>
      <Card>
        <Input
          label="Recipe name"
          value={foodName}
          onChangeText={(text) => setFoodName(text)}
        />
        <Button title="Pick image" onPress={pickImage} />

        <Avatar
          size="xlarge"
          source={{ uri: image }}
          title={foodName?.length > 0 && foodName[0]}
        />

        <FoodPropertyEdit
          text="Contains Proteins"
          propertyName="proteins"
          checked={proteins}
          onPress={handleProteins}
        />
        <FoodPropertyEdit
          text="Contains Veggies"
          propertyName="vegetables"
          checked={vegetables}
          onPress={handleVegetables}
        />
        <FoodPropertyEdit
          text="Contains Fish"
          propertyName="fish"
          checked={fish}
          onPress={handleFish}
        />
        {scoreTable}

        <Button type="outline" title="Save" onPress={handleSave} />
        {foodItem?.id && (
          <Button
            titleStyle={{ color: "red" }}
            type="outline"
            title="Delete"
            onPress={() => {
              setDeleteModalVisible(true);
            }}
          />
        )}
      </Card>
      <Modal
        animationType="slide"
        transparent={false}
        visible={deleteModalVisible}
        onRequestClose={() => {
          setDeleteModalVisible(false);
        }}
      >
        <View style={styles.mainModalView}>
          <Card>
            <Text>Are you sure you want to delete this dish ?</Text>
            <View style={styles.buttonView}>
              <Button
                containerStyle={styles.buttonContainerStyle}
                title="No"
                onPress={() => {
                  setDeleteModalVisible(false);
                }}
              />
              <Button
                containerStyle={styles.buttonContainerStyle}
                buttonStyle={{ backgroundColor: "red" }}
                title="Yes I'm sure"
                onPress={handleDelete}
              />
            </View>
          </Card>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {},
  checkBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  mainModalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonContainerStyle: {
    flex: 1,
    margin: 4,
  },
});

export default FoodEdit;
