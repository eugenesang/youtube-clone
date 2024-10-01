import { createContext, useEffect, useReducer } from "react";

const initialState = {
  user: null,
};

export const AuthContext = createContext(initialState);

export const AuthContextReducer = (state, action) => {
  switch (action.type) {
    case "SIGNED_IN":
      localStorage.setItem("user", action.payload);
      return { ...state, user: action.payload };
    case "SIGNED_OUT":
      localStorage.setItem("user", "");
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthContextReducer, initialState);
  // console.log("AuthContext state: ", state);

  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");
    if (localStorageUser) {
      dispatch({ type: "SIGNED_IN", payload: localStorageUser });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

//https://youtu.be/64RiVcXhxN0?si=Stx5fFo5uGZzNi7T&t=387
//https://www.youtube.com/watch?v=awGFsGc9oCM
//https://legacy.reactjs.org/docs/hooks-reference.html#lazy-initialization
