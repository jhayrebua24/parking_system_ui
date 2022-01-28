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
    DEFAULT: "#FDC12A",
    "50": "#FFF6E0",
    "100": "#FFF0CC",
    "200": "#FEE4A3",
    "300": "#FED97B",
    "400": "#FDCD52",
    "500": "#FDC12A",
    "600": "#EDAA02",
    "700": "#B58202",
    "800": "#7E5A01",
    "900": "#463201",
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
