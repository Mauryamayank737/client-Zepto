import React, { useEffect } from "react";
import emptyPerson from "../Images/emptyPerson.png";
import axios from "axios";
import SummaryApi from "../comman/SummaryApi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { BiLinkExternal } from "react-icons/bi";

const UserProfile = ({close}) => {
  let navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleLogout = async (e) => {
    try {
      console.log("hello");
      const response = await axios[SummaryApi.logout.method](
        SummaryApi.logout.url,
        { withCredentials: true }
      );
      toast.success("logout submit");
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

  return (
    <>
      <div className="w-full h-full  px-[20px] ">
        <div className="pb-[10px] border-b-1 border-slate-300 my-1">
          <div className="font-semibold">My Account</div>
          <div className="capitalize text-sm flex items-center gap-2 max-w-[200px] text-ellipsis line-clamp-1">
            {user.name || user.mobile}
            
            <Link to={"/dashboard/profile"}>
              <BiLinkExternal className="hover:text-amber-400" size={15} onClick={close} />
            </Link>
          </div>
        </div>

        <div className="grid text-sm  gap-1">
          <Link
            to={"/dashboard/myorder"}
            className="px-2 py-1  hover:bg-amber-100"
            onClick={close}
          >
           My order
          </Link>
          <Link
            to={"/dashboard/address"}
            className="px-2 py-1 hover:bg-amber-100"
            onClick={close}
          >
            Save Address
          </Link>
          <button
            onClick={handleLogout}
            className="text-left px-2 py-1  hover:bg-red-100 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
