import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/api/reactQuery/queryClient";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.Suspense>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.Suspense>,
);
