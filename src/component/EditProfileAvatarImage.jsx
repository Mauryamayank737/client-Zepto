import React, { useState } from "react";
import { useSelector } from "react-redux";
import userImage from "../Images/emptyPerson.png";
import axios from "axios";
import SummaryApi from "../comman/SummaryApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { IoMdClose } from "react-icons/io";

function EditProfile({ close }) {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUploadAvatarImage = async (e) => {
    try {
      console.log("hit 1", e)
      setLoading(true);
      const file = e.target.files[0];
      console.log("hit 2", file)

      if (!file) {
        setLoading(false);
        return;
      }

      let formData = new FormData();
      formData.append("avatar", file);
      console.log("formData", formData)

      const response = await axios[SummaryApi.uploadAvatar.method](
        SummaryApi.uploadAvatar.url,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
console.log('response',response)
      toast.success("Profile image updated successfully!");
      navigate("/dashboard/profile");
      // Instead of reload, you can dispatch an action to update user state in Redux
      window.location.reload();
    } catch (error) {
      console.error("Error in handleUploadAvatarImage:", error);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-[#6a6a6a78] opacity-100 z-50">
      <div className="w-[300px] lg:w-[400px] min-h-[100px] py-[20px] m-auto shadow-lg bg-white flex flex-col justify-center items-center rounded-lg relative">
        <div className="absolute top-[5px] right-[5px] cursor-pointer" onClick={close}>
          <IoMdClose size={22} />
        </div>

        <img
          src={user.avatar || userImage}
          alt={user.name || "User Avatar"}
          className="h-[120px] w-[120px] rounded-full border border-neutral-300 object-cover"
        />

        <label htmlFor="uploadProfile">
          <div className="w-[150px] my-2 py-2 text-white bg-blue-400 hover:bg-blue-700 rounded-xl flex items-center justify-center cursor-pointer">
            {loading ? "Loading..." : "Upload"}
          </div>
        </label>

        <input
          onChange={handleUploadAvatarImage}
          type="file"
          id="uploadProfile"
          className="hidden"
          disabled={loading}
        />
      </div>
    </div>
  );
}

export default EditProfile;
