import { Menu } from "lucide-react";
import { SearchBar } from "../components/SearchBar";
import { useAuthContext } from "../hook/useAuth";
import { useNavigate } from "react-router-dom";

export function AppBar({ toggleMenu }) {
  const { state } = useAuthContext();
  const navigate = useNavigate();
  console.log("state.user : ", state.user);

  return (
    <nav className="flex justify-between items-center bg-neutral-800 h-14">
      <div>
        <button onClick={toggleMenu} className="lg:hidden mx-3">
          <Menu />
        </button>
        logo
      </div>

      <button className="md:hidden">
        <img src="/search-icon.svg" alt="search" />
      </button>
      <div className="hidden md:block">
        <SearchBar />
      </div>

      {!state.user ? (
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Signup
        </button>
      ) : (
        <div>
          <span>chat </span>
          <button
            onClick={() => {
              navigate("/feed/upload");
            }}
          >
            upload
          </button>
          <span> profile </span>
        </div>
      )}
    </nav>
  );
}

// others (in order)- chat, createpost, profile
//sticky top-0 -> make it fixed to top
