import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import SummaruApi from "../comman/SummaryApi";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [data, setData] = useState({
    email: "",
    otp: "",
  });
  const [passwordFiled, setPasswordFiled] = useState(false);
  let navigate = useNavigate();

  const [data2, setData2] = useState({
    password: "",
    confirm_password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleChange2 = (e) => {
    const { name, value } = e.target;

    setData2((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const ValideValue = Object.values(data).every((value) => value);
  const ValideValue2 = Object.values(data2).every((value) => value);
  const handleSendOtp = async (e) => {
    try {
      e.preventDefault();
      if (data.email.length == 0) {
        toast.error("Please Enter Email");
        return;
      }
      const response = await axios[SummaruApi.otpsend.method](
        SummaruApi.otpsend.url,
        { email: data.email }
      );
      toast.success("otp send Your email");
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

  const handleverification = async (e) => {
    try {
      e.preventDefault();
      const response = await axios[SummaruApi.verification.method](
        SummaruApi.verification.url,
        { email: data.email, otp: data.otp }
      );
      toast.success("Otp verification complete ");
      setPasswordFiled(true);
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

  const handlePassword = async (e) => {
    try {
      e.preventDefault();

      if (data2.password != data2.confirm_password) {
        toast.error("Password and confirm password not match");
        return;
      }
      const SendData = { email: data.email, password: data2.password };
      console.log(SendData);
      const response = await axios[SummaruApi.resetPassword.method](
        SummaruApi.resetPassword.url,
        SendData,
        { withCredentials: true }
      );

      toast.success("Password reset successfully!");
      navigate("/login");
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

  return (
    <>
      <div className="min-h-[200px]  md:w-[550px] w-[90%] my-4 m-auto  border-1 border-gray-100 bg-white rounded-lg flex flex-col items-center justify-center shadow-2xl py-3 gap-3">
        <div>
          <h2 className="text-[1.8rem] font-semibold">Forgot Password</h2>
        </div>
        <form className="w-[90%] md:w-[80%] flex flex-col gap-3">
          <div className="flex flex-col gap-1 ">
            <label>Email</label>
            <div className="flex justify-between">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-[70%] p-2 bg-gray-200 rounded-md outline-0"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="w-[25%] p-2 bg-blue-600 rounded-md outline-0 text-white"
                onClick={handleSendOtp}
              >
                Send Otp
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label>OTP</label>
            <input
              type="text"
              placeholder="Enter Your Otp"
              className="w-[100%] p-2 bg-gray-200 rounded-md outline-0"
              name="otp"
              value={data.otp}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <button
              disabled={!ValideValue || passwordFiled}
              type="submit"
              className={`${
                ValideValue && !passwordFiled
                  ? "bg-blue-500 hover:bg-blue-700 "
                  : "bg-gray-600 "
              } w-full p-2  rounded-md outline-0 text-white tracking-wide `}
              onClick={handleverification}
            >
              Submit
            </button>
          </div>
        </form>

        {passwordFiled && (
          <form className="w-[90%] md:w-[80%] flex flex-col gap-3">
            <div className="flex flex-col gap-1 ">
              <label>New Password</label>
              <div className="flex justify-between">
                <input
                  type="password"
                  placeholder="Enter Your New Password"
                  className="w-full p-2 bg-gray-200 rounded-md outline-0"
                  name="password"
                  value={data2.password}
                  onChange={handleChange2}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Enter Your confirm Password"
                className="w-full p-2 bg-gray-200 rounded-md outline-0"
                name="confirm_password"
                value={data2.confirm_password}
                onChange={handleChange2}
              />
            </div>
            <div className="w-full">
              <button
                type="submit"
                disabled={!ValideValue || !ValideValue2}
                className={`${
                  ValideValue2
                    ? "bg-blue-500 hover:bg-blue-700 "
                    : "bg-gray-600 "
                } w-full p-2  rounded-md outline-0 text-white tracking-wide `}
                onClick={handlePassword}
              >
                Submit
              </button>
            </div>
          </form>
        )}
        <p>
          Already have an Account ?
          <Link to={"/login"}>
            <span className="text-blue-600 cursor-pointer"> Login</span>
          </Link>
        </p>
      </div>
    </>
  );
}

export default ForgotPassword;
