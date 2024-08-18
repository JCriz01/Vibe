import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import router from "./utils/router.jsx";
//import { Provider } from "jotai";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/components/theme-provider";

import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

//chakra global styles
const styles = {
  global: (props) => ({
    body: {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("gray.100", "#101010")(props),
    },
  }),
};

//custom chakra config
const config = {
  initalColorMode: "dark",
  useSystemColorMode: true,
};

//chakra theme
const colors = {
  gray: {
    light: "#616161",
    dark: "#1e1e1e",
  },
};

const theme = extendTheme({ config, styles, colors });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ColorModeScript initialColorMode={theme.config.initalColorMode} />
          <ReactQueryDevtools initialIsOpen={false} />
          <RouterProvider router={router}></RouterProvider>
          <Toaster />
        </ThemeProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
