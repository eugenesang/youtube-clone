import { useCallback, useEffect, useState } from "react";
import { SideBar } from "../components/SideBar";
import { AppBar } from "../components/Appbar";
import usePageContext from "../hook/useMainPage";

export function Feed() {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
  const { state } = usePageContext();
  const hamburgerClickHandler = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="feed">
      <AppBar toggleMenu={hamburgerClickHandler} />
      {isOpen && (
        <aside>
          <SideBar />
        </aside>
      )}
      <main>{state.page}</main>
    </div>
  );
}
// neutral-900
