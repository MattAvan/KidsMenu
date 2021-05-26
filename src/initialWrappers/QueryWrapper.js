import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import MainRouter from "./MainRouter";
import axios from "axios";
import { endPoint } from "../api";

const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios(`${endPoint}${queryKey[0]}`);
  return data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

const QueryWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainRouter />
    </QueryClientProvider>
  );
};

export default QueryWrapper;
