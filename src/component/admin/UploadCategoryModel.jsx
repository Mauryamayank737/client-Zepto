import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { ImSpinner8 } from "react-icons/im"; // For loading spinner
import UploadImage from "../../utils/UploadImage";
import axios from "axios";
import SummaryApi from "../../comman/SummaryApi";
import toast from "react-hot-toast";

const UploadCategoryModel = ({ close,fetchData }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form data:", data);
    const response = await axios [SummaryApi.addCategory.method](SummaryApi.addCategory.url ,{name :data.name ,image:data.image},{ withCredentials: true } )
    // console.log(response)
    toast.success("Category created ")
    close()
    // Submit logic here
  };

  const handleUploadCategory = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Assuming UploadImage accepts a progress callback
      const response = await UploadImage(file, (progress) => {
        setUploadProgress(Math.round((progress.loaded / progress.total) * 100));
      });

      const imageUrl = response.data?.url || response.data?.data?.url;
      
      if (imageUrl) {
        setData((prev) => ({
          ...prev,
          image: imageUrl,
        }));
      } else {
        console.error("Image URL not found in response");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemoveImage = () => {
    setData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#00000075] flex justify-center items-center z-50">
      <div className="w-[90%] md:w-[70%] lg:w-[60%] p-[20px] bg-white rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Category</h1>
          <button
            className="w-fit block ml-auto cursor-pointer hover:text-red-500"
            onClick={close}
            disabled={isUploading}
          >
            <IoMdClose size={25} />
          </button>
        </div>
        <form className="my-4 flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="categoryName">Name</label>
            <input
              type="text"
              id="categoryName"
              placeholder="Enter Category name"
              value={data.name}
              name="name"
              onChange={handleOnChange}
              className="p-2 outline-0 bg-neutral-100 border-1 border-gray-400 rounded-md focus-within:border-[#9165e4]"
              required
              disabled={isUploading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <p>Image</p>
            <div className="flex flex-col lg:flex-row items-center gap-3">
              <div className="w-[200px] h-[200px] bg-gray-200 flex justify-center items-center rounded-md overflow-hidden relative">
                {data.image ? (
                  <>
                    <img
                      src={data.image}
                      alt="Category preview"
                      className="w-full h-full object-cover"
                    />
                    {!isUploading && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        title="Remove image"
                      >
                        <IoMdClose size={14} />
                      </button>
                    )}
                  </>
                ) : isUploading ? (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <ImSpinner8 className="animate-spin" size={24} />
                    <span className="text-sm">{uploadProgress}%</span>
                  </div>
                ) : (
                  <p className="text-gray-500">No Image</p>
                )}
              </div>

              <label htmlFor="CategoryImage" className="cursor-pointer">
                <div
                  className={`w-[200px] p-2 border rounded-md text-center transition-colors ${
                    isUploading
                      ? "bg-gray-300 cursor-not-allowed"
                      : "border-amber-400 hover:bg-amber-400 hover:text-white"
                  }`}
                >
                  {isUploading ? (
                    "Uploading..."
                  ) : data.image ? (
                    "Change Image"
                  ) : (
                    "Upload Image"
                  )}
                </div>
                <input
                  type="file"
                  id="CategoryImage"
                  className="hidden"
                  onChange={handleUploadCategory}
                  accept="image/*"
                  disabled={isUploading}
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className={`mt-4 px-4 py-2 text-white rounded-md transition-colors ${
              isUploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#9165e4] hover:bg-[#7d4fd4]"
            }`}
            disabled={isUploading}
            onClick={handleSubmit}
          >
            {isUploading ? "Processing..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadCategoryModel;