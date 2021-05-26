import { useQuery, useMutation, useQueryClient } from "react-query";
import { endPoint } from "./api";
import axios from "axios";

export const useSetNewFoodOnMenu = (mealId) => {
  const queryClient = useQueryClient();
  const patchMenu = async (newFood) => {
    await axios.patch(
      `${endPoint}weekmenus/${mealId}/`,
      newFood ? { food: [newFood] } : { food: [] }
    );
  };

  const mutation = useMutation(patchMenu, {
    onSuccess: () => {
      queryClient.invalidateQueries("weekmenus/");
    },
    onError: (error, variables, context) => {
      console.log(error);
    },
  });

  return mutation;
};

export const useSaveFood = (foodID) => {
  const queryClient = useQueryClient();
  const putOrPostFood = async (newFood) => {
    console.log(newFood);
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
