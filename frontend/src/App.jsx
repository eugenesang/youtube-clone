import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { Signup } from "./pages/Signup";
import { Feed } from "./pages/Feed";
import { Login } from "./pages/Login";
import { Upload } from "./pages/Upload";
import { useAuthContext } from "./hook/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  // const state.user = localStorage.getItem("user");
  // console.log("localStoragestate.user: ", user);
  const { state } = useAuthContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signup"
          element={state.user ? <Navigate to={"/"} /> : <Signup />}
        />
        <Route
          path="/login"
          element={state.user ? <Navigate to={"/"} /> : <Login />}
        />

        <Route element={<ProtectedRoute />}>
          <Route path="/feed" element={<Upload />} exact>
            <Route path="upload" element={<Upload />} />
          </Route>
        </Route>

        <Route path="/" element={<Feed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
