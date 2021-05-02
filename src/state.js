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

const foodIdsState = atom({
  key: "foodIdsState",
  default: [],
});

const foodState = atomFamily({
  key: "foodState",
  default: {},
});

const weekMenuState = atomFamily({
  key: "weekMenuState",
  default: {},
});

const averageFoodRatingState = selectorFamily({
  key: "averageFoodRatingState",
  get: (foodId) => ({ get }) => {
    const foodItem = get(foodState(foodId));
    return (
      foodItem.scores.reduce((a, b) => a + b.score, 0) / foodItem.scores.length
    );
  },
});

const emptyFoodState = constSelector({
  key: "emptyFood",
  default: { foodName: "No food selected" },
});

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
