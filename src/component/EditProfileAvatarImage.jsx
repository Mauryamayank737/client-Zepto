import React, { useState, useRef } from "react";
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
  const fileInputRef = useRef();
  const navigate = useNavigate();

  const handleUploadAvatarImage = async (e) => {
    const file = e.target.files[0];
    
    try {
      setLoading(true);
      
      // Validate file
      if (!file) {
        toast.error("Please select a file");
        return;
      }

      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        toast.error("Only JPEG, PNG, or WebP images are allowed");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      const formData = new FormData();
      formData.append("avatar", file);

      // Upload with credentials
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

      // Handle success
      toast.success("Profile image updated successfully!");
      if (fileInputRef.current) fileInputRef.current.value = ''; // Reset input
      close();
      navigate(0); // Soft refresh

    } catch (error) {
      // Enhanced error handling
      console.error("Upload error:", error);
      
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         "Image upload failed";
      
      toast.error(errorMessage);

      // Handle unauthorized (401) errors
      if (error.response?.status === 401) {
        try {
          // Attempt token refresh
          await axios.post('/api/refresh-token', {}, { withCredentials: true });
          // Retry the upload if refresh succeeded
          return handleUploadAvatarImage(e);
        } catch (refreshError) {
          toast.error("Session expired. Please login again.");
          navigate('/login');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#6a6a6a78] z-50 flex items-center justify-center">
      <div className="relative bg-white rounded-lg p-6 w-[90%] max-w-[400px]">
        <button 
          onClick={close}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          disabled={loading}
        >
          <IoMdClose size={22} />
        </button>

        <div className="flex flex-col items-center">
          <img
            src={user?.avatar || userImage}
            alt={user?.name || "User Avatar"}
            className="h-32 w-32 rounded-full border border-gray-300 object-cover mb-4"
          />

          <label 
            htmlFor="uploadProfile"
            className={`w-full px-4 py-2 rounded-lg text-white text-center cursor-pointer ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </span>
            ) : "Upload New Avatar"}
          </label>

          <input
            id="uploadProfile"
            type="file"
            ref={fileInputRef}
            accept="image/jpeg, image/png, image/webp"
            onChange={handleUploadAvatarImage}
            className="hidden"
            disabled={loading}
          />

          <p className="mt-2 text-sm text-gray-500">
            Max file size: 5MB (JPEG, PNG, WebP)
          </p>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;