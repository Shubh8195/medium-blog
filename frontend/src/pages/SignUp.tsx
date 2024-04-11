import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupType } from "@shubh_negi/medium-types";

import Quote from "../components/Quote";
import { InputField } from "../components/InputField";
import toast from "react-hot-toast";
import { api } from "../utils/axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState<SignupType>({
    email: "",
    name: "",
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
      const res = await api.post("/user/signup", values);
      if (res.status == 200) {
        localStorage.setItem("token", res.data.token);
        toast.success("Signed Up Successfully");
        navigate("/blogs");
      }
    } catch (error: any) {
      if (error.response.status === 403) {
        setValues({
          email: "",
          name: "",
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
          <div className="text-3xl font-extrabold">Create an account</div>
          <div className="text-slate-400">
            Already have an account?{" "}
            <Link to={"/signin"} className="underline">
              Login
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2 ">
          <InputField
            label="Username"
            name="name"
            type="text"
            placeholder="Enter your username"
            onChange={onChangeHandler}
          />

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
            Sign Up
          </button>
        </div>
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
};

export default SignUp;
