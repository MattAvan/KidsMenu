import {
  atom,
  atomFamily,
  useRecoilCallback,
  selectorFamily,
  constSelector,
  useRecoilState,
} from "recoil";
import axios from "axios";
import { endPoint } from "./api";

//Pattern: an atom = list of ids, atom family = elements
// Best demo : https://codesandbox.io/s/stackoverflow-63038077-recoil-family-forms-xm6p1?file=/src/App.js

const mealList = {
  mondayLunch: { weekDay: "Monday", mealTime: "Lunch" },
  mondayDinner: { weekDay: "Monday", mealTime: "Dinner" },
  tuesdayLunch: { weekDay: "Tuesday", mealTime: "Lunch" },
  tuesdayDinner: { weekDay: "Tuesday", mealTime: "Dinner" },
  wednesdayLunch: { weekDay: "Wednesday", mealTime: "Lunch" },
  wednesdayDinner: { weekDay: "Wednesday", mealTime: "Dinner" },
  thursdayLunch: { weekDay: "Thursday", mealTime: "Lunch" },
  thursdayDinner: { weekDay: "Thursday", mealTime: "Dinner" },
  fridayLunch: { weekDay: "Friday", mealTime: "Lunch" },
  fridayDinner: { weekDay: "Friday", mealTime: "Dinner" },
  saturdayLunch: { weekDay: "Saturday", mealTime: "Lunch" },
  saturdayDinner: { weekDay: "Saturday", mealTime: "Dinner" },
  sundayLunch: { weekDay: "Sunday", mealTime: "Lunch" },
  sundayDinner: { weekDay: "Sunday", mealTime: "Dinner" },
};

// List of ids of foods
const foodIdsState = atom({
  key: "foodIdsState",
  default: [],
});

// Each atom is a food
const foodState = atomFamily({
  key: "foodState",
  default: {},
});

// Each atom is a menu for a weekday
const weekMenuState = atomFamily({
  key: "weekMenuState",
  default: {},
});

// Calculation of the average rating (not used for now ?)
const averageFoodRatingState = selectorFamily({
  key: "averageFoodRatingState",
  get: (foodId) => ({ get }) => {
    const foodItem = get(foodState(foodId));
    return (
      foodItem.scores.reduce((a, b) => a + b.score, 0) / foodItem.scores.length
    );
  },
});

// Empty food selector for the week days where no menu is selected
const emptyFoodState = constSelector({
  key: "emptyFood",
  default: {
    foodName: "",
    containsProteins: false,
    containsVegetables: false,
    containsFish: false,
    isMainCourse: true,
    lastEaten: "",
    scores: [],
    foodImage: null,
  },
});

// Custom hook to update optimistically the menu of a day and save in database
const useWeekMenusRecoilState = (mealKey) => {
  const [menu, setMenu] = useRecoilState(weekMenuState(mealKey));
  const setMenuAndSave = async (newValue) => {
    setMenu(newValue);
    await axios.put(`${endPoint}weekmenus/${newValue.id}/`, newValue);
  };
  return [menu, setMenu, setMenuAndSave];
};

export {
  foodIdsState,
  foodState,
  weekMenuState,
  mealList,
  emptyFoodState,
  useWeekMenusRecoilState,
  averageFoodRatingState,
};
