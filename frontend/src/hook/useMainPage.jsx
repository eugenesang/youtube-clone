import { useContext } from "react";
import { MainPageContext } from "../context/MainContext";

export default function useMainPageContext() {
  const context = useContext(MainPageContext);
  if (!context) throw Error("usePage must be inside MainPageContext");
  return context;
}
