import { useQuery, useMutation, useQueryClient } from "react-query";
import { endPoint } from "./api";
import axios from "axios";

export const useSetNewFoodOnMenu = (menu, menuDBId = null) => {
  const queryClient = useQueryClient();

  const postOrPatchMenu = async (newFood) => {
    if (menuDBId) {
      if (newFood) {
        await axios.patch(`${endPoint}datemenus/${menuDBId}/`, {
          food: newFood,
        });
      } else {
        await axios.delete(`${endPoint}datemenus/${menuDBId}/`);
      }
    } else {
      if (newFood) {
        await axios.post(`${endPoint}datemenus/`, {
          date: menu.date,
          mealTime: menu.mealTime,
          food: newFood,
        });
      }
    }
  };
  const queryKey = `datemenus/?date=${menu?.date}&mealTime=${menu?.mealTime}`;

  const mutation = useMutation(postOrPatchMenu, {
    onMutate: async (newFood) => {
      await queryClient.cancelQueries(queryKey);
      const newQuery = {
        date: menu?.date,
        mealTime: menu?.mealTime,
        food: newFood,
      };
      const previousQuery = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, newQuery);
      return { previousQuery, newQuery };
    },

    onError: (error, variables, context) => {
      console.log(error);
      queryClient.setQueryData(queryKey, context.previousQuery);
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  return mutation;
};

export const useSaveFood = (foodID) => {
  const queryClient = useQueryClient();
  const putOrPostFood = async (newFood) => {
    //Tranformation for kids : from full data to id only
    if (newFood.scores) {
      for (let i = 0; i < newFood.scores.length; i++) {
        newFood.scores[i].kid = newFood.scores[i].kid.id;
      }
    }
    if (foodID) {
      await axios.patch(`${endPoint}foods/${foodID}/`, {
        ...newFood,
        id: foodID,
      });
    } else {
      await axios.post(`${endPoint}foods/`, newFood);
    }
  };

  const mutation = useMutation(putOrPostFood, {
    onSuccess: () => {
      queryClient.invalidateQueries(`foods/`);
    },
    onError: (error, variables, context) => {
      console.log(error);
    },
  });
  return mutation;
};

export const useDeleteFood = (foodID) => {
  const queryClient = useQueryClient();
  const deleteFood = async () => {
    await axios.delete(`${endPoint}foods/${foodID}/`);
  };

  const mutation = useMutation(deleteFood, {
    onSuccess: () => {
      queryClient.invalidateQueries(`foods/`);
    },
    onError: (error, variables, context) => {
      console.log(error);
    },
  });
  return mutation;
};