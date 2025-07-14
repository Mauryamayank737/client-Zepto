import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userImage from "../Images/emptyPerson.png";
import EditProfile from "./EditProfileAvatarImage";
import axios from "axios";
import SummaryApi from "../comman/SummaryApi";
import toast from "react-hot-toast";
import { data, useNavigate } from "react-router";
const Profile = () => {
  const [editProfileImage, setEditProfileImage] = useState(false);
  const [ editInformation, setEditInformation] = useState(false);
  

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile:"",
  });

  const user = useSelector((state) => state.user);


  useEffect(() => {
    setUserData({
      name: user.name || "",
      email: user.email || "",
      mobile: user.mobile || "",
    });
  }, [user]);
  
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setUserData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUpdateDetail = async (e) => {
    try {
      e.preventDefault();
      // console.log(userData);
      const response = await axios[SummaryApi.updateUserDetail.method](
        SummaryApi.updateUserDetail.url,
        {name:userData.name ,mobile :userData.mobile},
        { withCredentials: true }
      );
      toast.success("User Detail Updated");
      navigate('/')
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
    <div className="w-full my-[20px]">
      <div className="flex w-full flex-col lg:flex-row justify-center items-center">
        <div className="w-[100%] lg:w-[30%]">
        <img
          src={user.avatar || userImage}
          alt=""
          className="
        h-[120px] w-[120px] lg:h-[160px] lg:w-[160px]   rounded-full border-1 border-neutral-300 "
        />
        <button
          className="w-[120px] lg:w-[160px] my-2 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-xl"
          onClick={() => setEditProfileImage(true)}
        >
          Edit
        </button>
        {editProfileImage && (
          <EditProfile close={() => setEditProfileImage(false)} />
        )}
        </div>

        <div className="w-[100%] lg:w-full" >

          <div className="flex flex-col gap-3">
            <div>
              <span className="font-semibold text-md">Name</span>
              <h2 className="py-2 px-5 bg-blue-50 outline-0 w-[100%] lg:w-[70%] capitalize rounded-lg">{user.name}</h2>
            </div>
            <div>
              <span className="font-semibold text-md">Email</span>
              <h2 className="py-2 px-5 bg-blue-50 outline-0 w-[100%] lg:w-[70%]  rounded-lg">{user.email}</h2>
            </div>
            <div>
              <span className="font-semibold text-md">Mobile</span>
              <h2 className="py-2 px-5 bg-blue-50 outline-0 w-[100%] lg:w-[70%] capitalize rounded-lg">{user.mobile || "None"}</h2>
            </div>
            <div>
              
              <h2 className="py-2 px-5 bg-blue-400 hover:bg-blue-800 hover:text-white outline-0 w-[100%] lg:w-[70%] capitalize rounded-lg text-center" onClick={()=>setEditInformation(!editInformation)}>{!editInformation?"Edit Information":"Remove Edit Box"}</h2>
            </div>
            
           
          </div>
        </div>
      </div>
      <div>
      {
        editInformation &&(
          <div>
          <form
          className="w-full lg:w-[80%] flex flex-col gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid gap-2">
            <label htmlFor="name" className="font-semibold text-md">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={userData.name}
              className="py-2 px-5 bg-blue-50 outline-0 w-full capitalize rounded-lg"
              name="name"
              onChange={handleOnChange}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="mobile" className="font-semibold text-md capitalize">
              mobile
            </label>
            {/* {console.log(userData,"uaedata")} */}
            <input
            type="text"
            placeholder="Enter Your Mobile Number"
            value={userData.mobile}
            className="py-2 px-5 bg-blue-50 outline-0 w-full capitalize rounded-lg"
            name="mobile"
            onChange={handleOnChange}
          />
          </div>
          <button
            className="w-full border-2  py-2 px-5 bg-blue-500 hover:bg-blue-600  outline-0 text-white capitalize rounded-lg"
            onClick={handleUpdateDetail}
          >
            submit
          </button>
        </form>
  
          </div>
        )
      }
      </div>
    </div>
  );
};

export default Profile;
