import { useQuery, useMutation, useQueryClient } from "react-query";
import { useState, useEffect } from "react";
import { endPoint, loginEndPoint, pictureUploadEndPoint } from "./api";
import { cloudinaryUploadPreset } from "./cloudkey.json";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { tokenState, errorState } from "./localState";
import { useRecoilValue } from "recoil";

// Hook to use to get the authorization headers
export const useAxiosConfig = () => {
  const token = useRecoilValue(tokenState);
  const axiosConfig = {
    headers: { Authorization: token },
  };
  return axiosConfig;
};

export const useLogin = (setToken, setError) => {
  //const queryClient = useQueryClient();

  const postCredentials = async (credentials) => {
    return await axios.post(`${endPoint}dj-rest-auth/login/`, credentials);
  };

  const mutation = useMutation(postCredentials, {
    onSuccess: async (data) => {
      const tokenValue = JSON.parse(data.request["_response"]).key;
      await SecureStore.setItemAsync("token", tokenValue);
      setToken(`Token ${tokenValue}`);
    },
    onError: async (error, query) => {
      //console.log(error.response.status);
      //console.log(query);
      if (error.response.status == "400") {
        setError("wrongCredentialsError");
      } else {
        setError("unknownError");
      }
    },
  });
  return mutation;
};

export const useSetNewFoodOnMenu = (menu, menuDBId = null) => {
  const queryClient = useQueryClient();
  const axiosConfig = useAxiosConfig();

  const postOrPatchMenu = async (newFood) => {
    if (menuDBId) {
      if (newFood) {
        await axios.patch(
          `${endPoint}kidsbackend/datemenus/${menuDBId}/`,
          {
            food: newFood,
          },
          axiosConfig
        );
      } else {
        await axios.delete(
          `${endPoint}kidsbackend/datemenus/${menuDBId}/`,
          axiosConfig
        );
      }
    } else {
      if (newFood) {
        await axios.post(
          `${endPoint}kidsbackend/datemenus/`,
          {
            date: menu.date,
            mealTime: menu.mealTime,
            food: newFood,
          },
          axiosConfig
        );
      }
    }
  };
  const queryKey = `kidsbackend/datemenus/?date=${menu?.date}&mealTime=${menu?.mealTime}`;

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
  const axiosConfig = useAxiosConfig();

  const putOrPostFood = async (newFood) => {
    //Tranformation for kids : from full data to id only
    if (newFood.scores) {
      for (let i = 0; i < newFood.scores.length; i++) {
        newFood.scores[i].kid = newFood.scores[i].kid.id;
      }
    }

    if (foodID) {
      await axios.patch(
        `${endPoint}kidsbackend/foods/${foodID}/`,
        {
          ...newFood,
          id: foodID,
        },
        axiosConfig
      );
    } else {
      await axios.post(`${endPoint}kidsbackend/foods/`, newFood, axiosConfig);
    }
  };

  const mutation = useMutation(putOrPostFood, {
    onSuccess: () => {
      const queryName = foodID
        ? `kidsbackend/foods/${foodID}/`
        : "kidsbackend/foodSearch";
      queryClient.invalidateQueries(queryName);
    },
    onError: (error, variables, context) => {
      console.log(error);
    },
  });
  return mutation;
};

export const useDeleteFood = (foodID) => {
  const queryClient = useQueryClient();
  const axiosConfig = useAxiosConfig();
  const deleteFood = async () => {
    await axios.delete(`${endPoint}kidsbackend/foods/${foodID}/`, axiosConfig);
  };

  const mutation = useMutation(deleteFood, {
    onSuccess: () => {
      queryClient.invalidateQueries(`kidsbackend/foodSearch`);
    },
    onError: (error, variables, context) => {
      console.log(error);
    },
  });
  return mutation;
};

export const useSearchFood = (searchText) => {
  const axiosConfig = useAxiosConfig();
  const { isLoading, isError, data, error } = useQuery(
    ["kidsbackend/foodSearch", searchText],
    async () => {
      const data = await axios(
        `${endPoint}kidsbackend/foods/?search=${searchText}`,
        axiosConfig
      );
      return data.data;
    }
  );
  return { isLoading, isError, data, error };
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value]);
  return debouncedValue;
};

export const uploadPicture = async (photo) => {
  const base64Build = photo?.base64
    ? `data:image/jpeg;base64,${photo.base64}`
    : photo.uri;
  const dataToUpload = {
    file: base64Build,
    upload_preset: cloudinaryUploadPreset,
  };

  try {
    const result = await axios.post(pictureUploadEndPoint, dataToUpload);
    return result.data;
  } catch (err) {
    console.error(err);
  }
};
