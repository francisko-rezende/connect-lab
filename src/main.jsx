import { AuthProvider, GlobalProvider } from "@contexts";
import { queryClient } from "@lib/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ReactQueryDevtools } from "react-query/devtools";
import { GlobalStyles } from "@styles";

// todo add device modal/page

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <GlobalStyles />
    </GlobalProvider>
  </React.StrictMode>,
);
