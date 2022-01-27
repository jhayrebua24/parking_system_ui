import React from "react";

import ReactDOM from "react-dom";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AxiosHeaders } from "utils/interface";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App";
import "assets/styles/styles.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// axios

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
} as AxiosHeaders;

const colors = {
  brand: {
    "50": "#FFFFFF",
    "100": "#FFFFFF",
    "200": "#EBEFFF",
    "300": "#B8C5FF",
    "400": "#859BFF",
    "500": "#5271FF",
    "600": "#1F47FF",
    "700": "#002AEB",
    "800": "#0021B8",
    "900": "#001885",
  },
};
const theme = extendTheme({ colors });

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <ReactQueryDevtools />
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
