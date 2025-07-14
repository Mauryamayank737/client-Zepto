import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import UploadImage from "../../utils/UploadImage";
import { useSelector } from "react-redux";
import axios from "axios";
import SummaryApi from "../../comman/SummaryApi";
import toast from "react-hot-toast";

function UploadSubCategoryModel({ close }) {
  const [subCategoryData, setSubCateoryData] = useState({
    name: "",
    image: "",
    category: [],
  });
  const [isUploading, setIsUploading] = useState(false);
  const allCategory = useSelector((state) => state.product.allCategory);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubCateoryData((preve) => ({
      ...preve,
      [name]: value,
    }));
  };

  const ValideValue = Object.values(subCategoryData).every(
    (value) => value && (Array.isArray(value) ? value.length > 0 : true)
  );

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsUploading(true);
    try {
      const response = await UploadImage(file);
      const imageUrl = response?.data?.url || response?.data?.data?.url;
      
      if (imageUrl) {
        setSubCateoryData((preve) => ({
          ...preve,
          image: imageUrl,
        }));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveCategory = (categoryId) => {
    setSubCateoryData((preve) => ({
      ...preve,
      category: preve.category.filter((el) => el._id !== categoryId),
    }));
  };

  const handleAddCategory = (e) => {
    const value = e.target.value;
    if (!value) return;
    
    const categoryExists = subCategoryData.category.some(
      (cat) => cat._id === value
    );
    if (categoryExists) return;

    const categoryDetails = allCategory.find((el) => el._id === value);
    if (categoryDetails) {
      setSubCateoryData((preve) => ({
        ...preve,
        category: [...preve.category, categoryDetails],
      }));
      e.target.value = "";
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    
    if (!ValideValue) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await axios[SummaryApi.addsubcategory.method](
        SummaryApi.addsubcategory.url,
        subCategoryData,
        { withCredentials: true }
      );
      toast.success("Sub Category created successfully");
      close();
    } catch (error) {
      console.error("Error creating sub category:", error);
      toast.error(error.response?.data?.message || "Failed to create sub category");
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#0000009f] flex justify-center items-center z-50">
      <div className="w-[90%] md:w-[80%] lg:w-[65%] bg-white rounded-lg p-5 lg:p-5 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Add Sub Category</h1>
          <button
            className="w-fit block ml-auto cursor-pointer hover:text-red-500"
            onClick={close}
          >
            <IoMdClose size={25} />
          </button>
        </div>
        <form className="my-4 flex flex-col gap-3" onSubmit={handleOnSubmit}>
          {/* Input section */}
          <div className="flex flex-col gap-2">
            <label>Sub Category Name</label>
            <input
              type="text"
              placeholder="Enter sub category name"
              className="p-2 bg-gray-200 rounded-md outline-0"
              name="name"
              value={subCategoryData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          {/* image section */}
          <div className="flex items-center justify-start gap-5 flex-col md:flex-row">
            <div className="flex flex-col gap-3 justify-center items-center md:items-start">
              <p>Image</p>
              <div className="w-[180px] h-[150px] md:w-[200px] md:h-[200px] flex justify-center items-center bg-gray-200 rounded-lg overflow-hidden text-gray-400 uppercase">
                {subCategoryData.image ? (
                  <img 
                    src={subCategoryData.image} 
                    alt="Sub Category" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p>No image</p>
                )}
              </div>
            </div>
            
            {/* Image Upload section */}
            <label htmlFor="uploadSubCategory" className="w-full">
              <div className="w-full md:w-[180px] h-[40px] border-2 border-amber-400 hover:bg-amber-400 hover:text-white flex justify-center items-center rounded-lg capitalize cursor-pointer">
                {isUploading
                  ? "Uploading..."
                  : subCategoryData.image
                  ? "Change Image"
                  : "Upload Image"}
              </div>
              <input
                type="file"
                id="uploadSubCategory"
                className="hidden"
                onChange={handleUploadSubCategoryImage}
                accept="image/*"
                disabled={isUploading}
              />
            </label>
          </div>
          
          {/* category selection section */}
          <div className="grid gap-2">
            <label>Select Category</label>
            
            {/* display selected categories */}
            <div className="p-2 flex gap-2 bg-gray-100 rounded-md flex-wrap min-h-12">
              {subCategoryData.category.map((details) => (
                <div 
                  key={details._id}
                  className="flex gap-1 items-center bg-white px-3 py-1 rounded-full shadow"
                >
                  <p className="capitalize text-sm">{details.name}</p>
                  <IoMdClose 
                    size={16} 
                    className="text-gray-700 hover:text-red-500 cursor-pointer" 
                    onClick={() => handleRemoveCategory(details._id)} 
                  />
                </div>
              ))}
            </div>

            {/* select category dropdown */}
            <div className="border-2 focus-within:border-amber-400 p-2 rounded-lg">
              <select
                className="w-full outline-0 capitalize bg-transparent"
                onChange={handleAddCategory}
                defaultValue=""
              >
                <option value="">Select Category</option>
                {allCategory.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* submit button */}
          <button
            type="submit"
            disabled={!ValideValue || isUploading}
            className={`${
              ValideValue && !isUploading 
                ? "bg-blue-500 hover:bg-blue-700 cursor-pointer" 
                : "bg-gray-400 cursor-not-allowed"
            } w-full p-2 rounded-md outline-0 text-white tracking-wide`}
          >
            {isUploading ? "Processing..." : "Add Sub Category"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadSubCategoryModel;