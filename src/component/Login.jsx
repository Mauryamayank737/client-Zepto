import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import SummaruApi from "../comman/SummaryApi";
const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const ValideValue = Object.values(data).every((value) => value);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // console.log("sending data" ,data)
      const response = await axios[SummaruApi.login.method](
        SummaruApi.login.url,
        data,
        { withCredentials: true }
      );
      toast.success("Login successfuly");
      navigate("/");
      window.location.reload();
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        toast.error(error.response.data.message || "Registration failed");
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response from server");
      } else {
        // Something happened in setting up the request
        toast.error("Error setting up registration request");
      }
    }
  };

  useEffect(() => {
    navigate, handleSubmit;
  }, []);
  return (
    <div className="min-h-[200px]  md:w-[550px] w-[90%] my-4 m-auto  border-1 border-gray-100 bg-white rounded-lg flex flex-col items-center justify-center shadow-2xl py-3 gap-3">
      <h2 className="text-[1.8rem] font-semibold">Login Form</h2>

      <input
        type="email"
        placeholder="Enter Your email"
        className="w-[90%] md:w-[80%] p-2 bg-gray-200 rounded-md outline-0"
        name="email"
        value={data.email}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Enter Your Password"
        className="w-[90%] md:w-[80%] p-2 bg-gray-200 rounded-md outline-0"
        name="password"
        value={data.password}
        onChange={handleChange}
      />
      <div className="w-[90%] md:w-[80%] flex justify-end">
        <Link to={"/forgotpassword"}>
          <p className="text-blue-600 cursor-pointer">Forgot password</p>
        </Link>
      </div>
      <button
        disabled={!ValideValue}
        type="submit"
        className={`${
          ValideValue ? "bg-blue-500 hover:bg-blue-700 " : "bg-gray-600 "
        } w-[90%] md:w-[80%] p-2  rounded-md outline-0 text-white tracking-wide `}
        onClick={handleSubmit}
      >
        login
      </button>

      <p>
        Create new Account ?{" "}
        <Link to={"/register"}>
          <span className="text-blue-600 cursor-pointer">Register</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
