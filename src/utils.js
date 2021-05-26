import { format, addDays } from "date-fns";

//Get the Monday before date (if no date, before today)
export function getPreviousMonday(date = null) {
  let prevMonday = date ? new Date(date) : new Date();
  prevMonday.setDate(prevMonday.getDate() - ((prevMonday.getDay() + 6) % 7));
  return format(prevMonday, "yyyy-MM-dd");
}

// Create an array of dates and meal times (lunch, dinner)
export function createMenuArray(startingDay, length) {
  const startingDate = new Date(startingDay);
  const menuArray = [];
  for (let i = 0; i < 2 * length; i = i + 2) {
    const day = format(addDays(startingDate, i / 2), "yyyy-MM-dd");
    menuArray[i] = { index: i, date: day, mealTime: "Lunch" };
    menuArray[i + 1] = { index: i + 1, date: day, mealTime: "Dinner" };
  }
  return menuArray;
}

//Shifts the starting day
export function calculateNewStartingDay(previousStartingDay, shift) {
  const newStartDate = addDays(new Date(previousStartingDay), shift);
  return format(newStartDate, "yyyy-MM-dd");
}

//Formats the date for display
export function formatMenuDay(dateString) {
  return format(new Date(dateString), "EEE dd/MM/yy");
}
