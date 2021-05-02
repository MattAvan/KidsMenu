import React, { useState } from "react";
/*import {
  Form,
  Item,
  Input,
  CheckBox,
  Body,
  ListItem,
  Text,
  Label,
} from "native-base";*/

const FoodEdit = ({ navigation }) => {
  const [foodName, setFoodName] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  /*return (
    <Form>
      <Item floatingLabel>
        <Label>Recipe Name</Label>
        <Input onChange={(e) => setFoodName(e.target.value)} />
      </Item>
      <ListItem>
        <CheckBox checked={checkbox} onPress={() => setCheckbox(!checkbox)} />
        <Text> Test Checkbox</Text>
      </ListItem>
    </Form>
  );*/
  return null;
};

export default FoodEdit;
