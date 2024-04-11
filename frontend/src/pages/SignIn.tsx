import { SigninType } from "@shubh_negi/medium-types";
import Quote from "../components/Quote";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputField } from "../components/InputField";
import { api } from "../utils/axios";
import toast from "react-hot-toast";

const SignIn = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<SigninType>({
    email: "",
    password: "",
  });

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  async function sendRequest() {
    try {
      const res = await api.post("/user/signin", values);
      if (res.status == 200) {
        localStorage.setItem("token", res.data.token);
        toast.success("Login Successfully");
        navigate("/blogs");
      }
    } catch (error: any) {
      if (error.response.status === 403) {
        setValues({
          email: "",
          password: "",
        });
        return toast.error(error.response.data.msg);
      }

      toast.error("Something went wrong");
    }
  }
  return (
    <div className="grid grid-cols-1  lg:grid-cols-2 items-center">
      <div className="h-screen flex flex-col justify-center p-16 gap-8">
        <div className="flex flex-col items-center gap-2 ">
          <div className="text-3xl font-extrabold">Sign in your account</div>
          <div className="text-slate-400">
            Create an account{" "}
            <Link to={"/signup"} className="underline">
              Sign Up
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2 ">
          <InputField
            label="Email"
            name="email"
            type="text"
            placeholder="Enter your email"
            onChange={onChangeHandler}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={onChangeHandler}
          />
          <button
            onClick={sendRequest}
            className="font-semibold text-white rounded-lg bg-black p-2 mt-4"
          >
            Sign In
          </button>
        </div>
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
};

export default SignIn;
