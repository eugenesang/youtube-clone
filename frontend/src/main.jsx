import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-toastify/ReactToastify.css";
import { AuthContextProvider } from "./context/AuthContext";
import { MainPageContextProvider } from "./context/MainContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <MainPageContextProvider>
        <App />
      </MainPageContextProvider>
    </AuthContextProvider>
  </StrictMode>,
);
