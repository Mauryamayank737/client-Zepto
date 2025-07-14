import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import UploadImage from "../../utils/UploadImage";
import { useSelector } from "react-redux";
import axios from "axios";
import SummaryApi from "../../comman/SummaryApi";
import toast from "react-hot-toast";

function EditSubCategory({ close, data: subCategory, fetchData }) {
  const [subCategoryData, setSubCategoryData] = useState({
    _id: subCategory._id,
    name: subCategory.name,
    image: subCategory.image,
    category: subCategory.category || [],
  });
  const [isUploading, setIsUploading] = useState(false);
  const allCategory = useSelector((state) => state.product.allCategory);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubCategoryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValid = Object.values(subCategoryData).every((value) => value);

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const response = await UploadImage(file);
      const imageUrl = response.data?.url || response.data?.data?.url;

      setSubCategoryData((prev) => ({
        ...prev,
        image: imageUrl,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveCategory = (categoryId) => {
    setSubCategoryData((prev) => ({
      ...prev,
      category: prev.category.filter((el) => el._id !== categoryId),
    }));
  };

  const handleAddCategory = (e) => {
    const value = e.target.value;
    if (!value) return;

    const categoryDetails = allCategory.find((el) => el._id === value);
    if (!categoryDetails) return;

    // Check if category already exists
    const exists = subCategoryData.category.some(el => el._id === value);
    if (exists) {
      toast.error("Category already added");
      return;
    }

    setSubCategoryData((prev) => ({
      ...prev,
      category: [...prev.category, categoryDetails],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios[SummaryApi.updateSubCategory.method](
        SummaryApi.updateSubCategory.url,
        subCategoryData,
        { withCredentials: true }
      );
      
      if (response.data.success) {
        toast.success("Sub Category updated successfully");
        if (fetchData) fetchData();
        close();
      } else {
        throw new Error(response.data.message || "Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Failed to update sub category");
    }
  };

  return (
    <div className="fixed inset-0 bg-[#000000] bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-[90%] md:w-[80%] lg:w-[65%] bg-white rounded-lg p-5 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Edit Sub Category</h1>
          <button
            onClick={close}
            className="text-gray-500 hover:text-red-500 transition-colors"
            aria-label="Close"
          >
            <IoMdClose size={25} />
          </button>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-medium">Sub Category Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter sub category name"
              className="p-2 bg-gray-100 rounded-md outline-none focus:ring-2 focus:ring-amber-400"
              name="name"
              value={subCategoryData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Image Section */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex flex-col gap-2">
              <label className="font-medium">Image</label>
              <div className="w-40 h-40 flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden">
                {subCategoryData.image ? (
                  <img 
                    src={subCategoryData.image} 
                    alt={subCategoryData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-gray-400">No image</p>
                )}
              </div>
            </div>

            <label htmlFor="uploadSubCategory" className="mt-6">
              <div className={`w-40 h-10 flex items-center justify-center rounded-lg border-2 border-amber-400 cursor-pointer transition-colors ${
                isUploading ? "bg-gray-200" : "hover:bg-amber-400 hover:text-white"
              }`}>
                {isUploading ? "Uploading..." : subCategoryData.image ? "Change Image" : "Upload Image"}
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

          {/* Category Selection */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">Categories</label>
            
            {/* Selected Categories */}
            <div className="p-3 bg-gray-100 rounded-lg flex flex-wrap gap-2">
              {subCategoryData.category.map((category) => (
                <div 
                  key={category._id}
                  className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm"
                >
                  <span className="text-sm capitalize">{category.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(category._id)}
                    className="text-gray-500 hover:text-red-500"
                    aria-label={`Remove ${category.name}`}
                  >
                    <IoMdClose size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Category Selector */}
            <select
              className="w-full p-2 border-2 border-gray-300 rounded-lg outline-none focus:border-amber-400"
              onChange={handleAddCategory}
              defaultValue=""
            >
              <option value="">Select Category</option>
              {allCategory.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValid || isUploading}
            className={`w-full p-3 rounded-md text-white font-medium transition-colors ${
              isValid && !isUploading 
                ? "bg-blue-500 hover:bg-blue-600" 
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isUploading ? "Processing..." : "Update Sub Category"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditSubCategory;