import { createContext, useReducer } from "react";
import Home from "../components/MainPage/Home";
import Saved from "../components/MainPage/Saved";
import Liked from "../components/MainPage/Liked";
import Live from "../components/MainPage/Live";

const initialState = {
  page: <Home />,
};

export const MainPageContext = createContext(initialState);

export const MainPageContextReducer = (state, action) => {
  switch (action.type) {
    case "HOME":
      return { ...state, page: <Home /> };
    case "LIKED":
      return { ...state, page: <Liked /> };
    case "SAVED":
      return { ...state, page: <Saved /> };
    case "LIVE":
      return { ...state, page: <Live /> };
  }
};

export const MainPageContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MainPageContextReducer, initialState);

  return (
    <MainPageContext.Provider value={{ state, dispatch }}>
      {children}
    </MainPageContext.Provider>
  );
};
