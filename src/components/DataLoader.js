import React, { useEffect } from "react";
import { useRecoilCallback } from "recoil";
import { mealList, foodIdsState, foodState, weekMenuState } from "../state";
import axios from "axios";
import { mapKeys, merge } from "lodash";
import { endPoint } from "../api";

// Invisible component loading the initial data

const DataLoader = () => {
  // Generic function to load data and set it in an ID list atom and in the content atom family
  const loadInitialData = useRecoilCallback(({ set }) => () => {
    const fetchData = async (idAtom, contentAtomFamily, apiQuery, idField) => {
      const result = await axios(`${endPoint}${apiQuery}/`);
      const ids = [];
      for (const item of result.data) {
        ids.push(item[idField]);
        set(contentAtomFamily(item.id), () => item);
      }
      if (idAtom) {
        set(idAtom, ids);
      }
    };

    // Specific load for the week menu, which can have empty entries on db side
    const fillWeekMenu = async () => {
      const result = await axios(`${endPoint}weekmenus/`);
      const normalizedResult = merge(mealList, mapKeys(result.data, "mealKey"));
      for (const [key, value] of Object.entries(normalizedResult)) {
        set(weekMenuState(key), value);
      }
    };

    //Actually fetch the data
    fetchData(foodIdsState, foodState, "foods", "id");
    fillWeekMenu();
  });

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  return null;
};

export default DataLoader;
