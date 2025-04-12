import React from "react";
import ReactDOM from "react-dom/client";
import { HeroUIProvider, ToastProvider } from "@heroui/react";

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HeroUIProvider>
    <ToastProvider />
    <main className="text-foreground bg-background">
      <App />
    </main>
  </HeroUIProvider>
);
