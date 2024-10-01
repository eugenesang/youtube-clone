import { useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/Inputbos";
import { handleError, handleSuccess } from "../utils/toast";
import { ToastContainer } from "react-toastify";
import { useAuthContext } from "../hook/useAuth";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const changeHandler = (e) => {
    const { name, value } = e.target;
    const loginData = { ...loginInfo };
    loginData[name] = value;
    setLoginInfo(loginData);
    // console.log(loginData);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) return handleError("all fields required");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      if (response.status === 500) {
        return handleError("Unfortunatly Server is Down 🥹");
      }
      const result = await response?.json();
      // console.log("result", result);
      if (!response) {
        return handleError("server error");
      }
      if (response.status === 200) {
        //dispatch login here in authcontext
        setTimeout(() => {
          //setTimeout to render toast then dispatch action which results state.user != null
          dispatch({ type: "SIGNED_IN", payload: result.user });
          navigate("/");
        }, 1500);
        return handleSuccess(result.msg);
      }
      return handleError(result.msg);
    } catch (err) {
      console.log("err: ", err);
      return handleError(err);
    }
  };

  return (
    <div className="h-screen bg-black flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-2xl flex flex-col items-center justify-evenly">
        <Heading value={"Login"} />
        <form className=" my-2">
          <InputBox
            name={"email"}
            placeholder={"Email"}
            onChange={changeHandler}
          />
          <InputBox
            name={"password"}
            placeholder={"Password"}
            onChange={changeHandler}
          />
          <Button type={"submit"} value={"Login"} onClick={loginHandler} />
        </form>
        <p>
          Create a new Account
          <u>
            <Link to="/signup">Signup</Link>
          </u>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
