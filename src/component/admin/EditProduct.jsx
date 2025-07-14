import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import UploadImage from "../../utils/UploadImage"; // make sure this function exists
import axios from "axios";
import SummaryApi from "../../comman/SummaryApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const EditProduct = ({ data: productData, close }) => {
  const [data, setData] = useState({
    _id: productData._id,
    name: productData.name,
    image: productData.image || [],
    category: productData.category || [],
    subCategory: productData.subCategory || [],
    unit: productData.unit,
    stock: productData.stock,
    originalPrice: productData.originalPrice,
    currentPrice: productData.currentPrice,
    description: productData.description,
    more_details: productData.more_details || {},
  });

  const [isUploading, setIsUploading] = useState(false);
  const [openMoreField, setOpenMoreField] = useState(false);
  const [newField, setNewField] = useState({ key: "", value: "" });

  const allCategory = useSelector((state) => state.product.allCategory);
  const allSubCategory = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await UploadImage(file);
      setData((prev) => ({
        ...prev,
        image: [...prev.image, url],
      }));
    } catch (error) {
      console.error("Image Upload Failed:", error);
    } finally {
      setIsUploading(false);
    }
  };
const removeImage = (index) => {
  if (window.confirm("Are you sure you want to remove this image?")) {
    setData((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index),
    }));
  }
};


  const removeCategory = (index) => {
    setData((prev) => ({
      ...prev,
      category: prev.category.filter((_, i) => i !== index),
    }));
  };

  const removeSubCategory = (index) => {
    setData((prev) => ({
      ...prev,
      subCategory: prev.subCategory.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (data.originalPrice < data.currentPrice) {
              return toast.error("Your product prices higher then original price");
        }

    try {
      const response = await axios[SummaryApi.UpdateProduct.method](
        SummaryApi.UpdateProduct.url,
        data,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Product updated successfully");
        navigate("/dashboard/product")
      } else {
        throw new Error(response.data.message || "Update failed");
      }
    } catch (error) {
      toast.error(error.message || error);
    } finally {
      close();
    }
  };

  const handleAddMoreField = () => {
    if (!newField.key.trim()) return;
    setData((prev) => ({
      ...prev,
      more_details: {
        ...prev.more_details,
        [newField.key]: newField.value,
      },
    }));
    setNewField({ key: "", value: "" });
    setOpenMoreField(false);
  };

  console.log(data);

  return (
    <div className="w-full h-full fixed top-0 bottom-0 left-0 right-0 bg-[#00000075] flex justify-center  z-50 overflow-auto">
      <div className="w-[90%] md:w-[80%] lg:w-[67%] h-fit p-5 bg-white my-8 lg:my-15 rounded capitalize">
        <div className="flex justify-between my-3 ">
          <h1>Edit Product</h1>
          <IoMdClose
            size={25}
            onClick={close}
            className="cursor-pointer hover:text-red-600"
          />
        </div>

        <form className="grid gap-2 h-full" onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="grid gap-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Product Name"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
              className="w-full bg-gray-100 p-2 outline-0 rounded-lg"
            />
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <label htmlFor="Description">Description</label>
            <textarea
              placeholder="Enter Product Description"
              name="description"
              value={data.description}
              onChange={handleChange}
              rows={3}
              required
              className="w-full bg-gray-100 p-2 outline-0 rounded-lg"
            />
          </div>

          {/* Image Upload */}
          <div className="grid gap-2">
            <p>Image</p>
            <label
              htmlFor="productImage"
              className="h-24 flex flex-col justify-center items-center rounded-lg bg-gray-200 hover:text-gray-600 cursor-pointer"
            >
              {isUploading ? (
                <Loading />
              ) : (
                <>
                  <MdCloudUpload size={35} />
                  <p>Upload Image</p>
                </>
              )}
              <input
                type="file"
                id="productImage"
                hidden
                disabled={isUploading}
                onChange={handleImageUpload}
                accept="image/*"
              />
            </label>

            <div className="flex justify-center gap-4 flex-wrap">
              {data.image.map((img, index) => (
                <div
                  key={index}
                  className="h-[120px] w-[120px] shadow-lg rounded-lg relative group"
                >
                  <img
                    src={img}
                    alt="product"
                    className="w-full h-full rounded-lg object-cover"
                  />
                  <div
                    className="absolute bottom-1 right-1 bg-red-600 rounded-lg p-1 hidden group-hover:block"
                    onClick={() => removeImage(index)}
                  >
                    <MdDelete size={25} className="text-white cursor-pointer" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="grid gap-2">
            <label>Category</label>
            <div className="p-2 flex gap-2 bg-gray-100 rounded-lg flex-wrap min-h-12">
              {data.category.map((cat, index) => (
                <div
                  key={index}
                  className="flex gap-1 items-center bg-white px-3 py-1 rounded-full shadow"
                >
                  <p className="capitalize text-sm">{cat.name}</p>
                  <IoMdClose
                    size={16}
                    className="hover:text-red-500"
                    onClick={() => removeCategory(index)}
                  />
                </div>
              ))}
            </div>
            <select
              className="w-full outline-0 bg-gray-100 p-2 rounded-lg"
              onChange={(e) => {
                const value = e.target.value;
                if (!value) return;
                const selected = allCategory.find((el) => el._id === value);
                if (data.category.some((cat) => cat._id === value)) return;
                setData((prev) => ({
                  ...prev,
                  category: [...prev.category, selected],
                }));
                e.target.value = "";
              }}
              defaultValue=""
            >
              <option value="">Select Category</option>
              {allCategory.map((cat) => (
                <option value={cat._id} key={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory */}
          <div className="grid gap-2">
            <label>Sub Category</label>
            <div className="p-2 flex gap-2 bg-gray-100 rounded-lg flex-wrap min-h-12">
              {data.subCategory.map((sub, index) => (
                <div
                  key={index}
                  className="flex gap-1 items-center bg-white px-3 py-1 rounded-full shadow"
                >
                  <p className="capitalize text-sm">{sub.name}</p>
                  <IoMdClose
                    size={16}
                    className="hover:text-red-500"
                    onClick={() => removeSubCategory(index)}
                  />
                </div>
              ))}
            </div>
            <select
              className="w-full outline-0 bg-gray-100 p-2 rounded-lg"
              onChange={(e) => {
                const value = e.target.value;
                if (!value) return;
                const selected = allSubCategory.find((el) => el._id === value);
                if (data.subCategory.some((sub) => sub._id === value)) return;
                setData((prev) => ({
                  ...prev,
                  subCategory: [...prev.subCategory, selected],
                }));
                e.target.value = "";
              }}
              defaultValue=""
            >
              <option value="">Select Sub Category</option>
              {allSubCategory.map((sub) => (
                <option value={sub._id} key={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="flex flex-col md:flex-row gap-2">
            <div className="w-full md:w-1/2">
              <label>Original Price</label>
              <input
                type="number"
                name="originalPrice"
                value={data.originalPrice}
                onChange={handleChange}
                required
                placeholder="Enter original price"
                className="w-full bg-gray-100 p-2 rounded-lg"
              />
            </div>
            <div className="w-full md:w-1/2">
              <label>Current Price</label>
              <input
                type="number"
                name="currentPrice"
                value={data.currentPrice}
                onChange={handleChange}
                required
                placeholder="Enter current price"
                className="w-full bg-gray-100 p-2 rounded-lg"
              />
            </div>
          </div>

          {/* Unit and Stock */}
          <div className="flex flex-col md:flex-row gap-2">
            <div className="w-full md:w-1/2">
              <label>Unit</label>
              <input
                type="text"
                name="unit"
                value={data.unit}
                onChange={handleChange}
                required
                placeholder="e.g. Kg, Litre, Piece"
                className="w-full bg-gray-100 p-2 rounded-lg"
              />
            </div>
            <div className="w-full md:w-1/2">
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                value={data.stock}
                onChange={handleChange}
                required
                className="w-full bg-gray-100 p-2 rounded-lg"
              />
            </div>
          </div>

          {/* More Details */}
          {Object.keys(data.more_details).map((key, index) => (
            <div key={index} className="grid gap-1">
              <label htmlFor={key}>{key}</label>
              <input
                type="text"
                id={key}
                value={data.more_details[key]}
                onChange={(e) => {
                  const value = e.target.value;
                  setData((prev) => ({
                    ...prev,
                    more_details: {
                      ...prev.more_details,
                      [key]: value,
                    },
                  }));
                }}
                className="w-full bg-gray-100 p-2 rounded-lg"
              />
            </div>
          ))}

          {openMoreField && (
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Field Name"
                value={newField.key}
                onChange={(e) =>
                  setNewField((prev) => ({ ...prev, key: e.target.value }))
                }
                className="bg-gray-100 p-2 rounded-lg"
              />
              <input
                type="text"
                placeholder="Field Value"
                value={newField.value}
                onChange={(e) =>
                  setNewField((prev) => ({ ...prev, value: e.target.value }))
                }
                className="bg-gray-100 p-2 rounded-lg"
              />
              <button
                type="button"
                onClick={handleAddMoreField}
                className="col-span-2 bg-green-600 text-white py-1 rounded hover:bg-green-700"
              >
                Add
              </button>
            </div>
          )}

          <div
            onClick={() => setOpenMoreField(true)}
            className="w-fit px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 mt-2"
          >
            Add Fields
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
