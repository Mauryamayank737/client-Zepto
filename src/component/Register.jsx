import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import SummaryApi from "../comman/SummaryApi";
import axios from "axios";
const Register = () => {
  
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",
  });
 
  const navigate = useNavigate()
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
  console.log("data", data);
  
  const handleSubmit =async(e)=>{
    e.preventDefault()
    if(data.password !== data.re_password){
      toast.error("Password and Re_password not match");
      return ;
    }

   try {
    const response = await axios[SummaryApi.register.method](SummaryApi.register.url, data);
    toast.success("user Register")
    navigate('/login')
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
    
    
  }
  return (
    <div className="min-h-[200px]  md:w-[550px] w-[90%] my-4 m-auto  border-1 border-gray-100 bg-white rounded-lg flex flex-col items-center justify-center shadow-2xl py-3  ">
      <h2 className="text-[1.8rem] font-semibold">Register Form</h2>

      <form className="w-[90%] lg:w-[80%] m-auto flex flex-col gap-4 mb-4">
        <div className="flex flex-col w-full ">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter Your Name"
            className="w-[100%] p-2 bg-gray-200 rounded-md outline-0"
            value={data.name}
            onChange={handleChange}
            name="name"
          />
        </div>
        <div className="flex flex-col w-full ">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            className="w-[100%]  p-2 bg-gray-200 rounded-md outline-0"
            value={data.email}
            name="email"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between w-full gap-4 ">
          <div className="md:w-[49%] w-[100%]">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter Your password"
              className="w-[100%]  p-2 bg-gray-200 rounded-md outline-0"
              value={data.password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="md:w-[49%] w-[100%]">
            <label>Confirm Password:</label>
            <input
              type="password"
              placeholder="Enter Your Confirm Password"
              className="w-[100%] p-2 bg-gray-200 rounded-md outline-0"
              value={data.re_password}
              name="re_password"
              onChange={handleChange}
            />
          </div>
        </div>
        <button disabled={!ValideValue}
          type="submit"
          className={`${
            ValideValue ? "bg-blue-500 hover:bg-blue-700 " : "bg-gray-600 "
          } w-full p-2  rounded-md outline-0 text-white tracking-wide `}
          onClick={handleSubmit}
        >
          Register
        </button>
      </form>

      <p>
        Already have an Account ?
        <Link to={"/login"}>
          <span className="text-blue-600 cursor-pointer"> Login</span>
        </Link>
      </p>
    </div>
  );
};

export default Register;
