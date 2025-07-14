import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { MdCloudUpload } from "react-icons/md";
import { useSelector } from "react-redux";
import UploadImage from "../../utils/UploadImage";
import ViewImage from "./ViewImage";
import { MdDelete } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import AddFieldComponent from "./AddFieldComponent";
import axios from "axios";
import SummaryApi from "../../comman/SummaryApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    images: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: null,
    originalPrice: null,
    currentPrice: null,
    description: "",
    more_details: {},
  });
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [ViewImageUrl, setViewImageUrl] = useState("");
  const allCategory = useSelector((state) => state.product.allCategory);
  const allSubCategory = useSelector((state) => state.product.allSubCategory);

  const [openMoreField, setOpenMoreField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  console.log(data);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: Number(value) || 0,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setIsUploading(true);
    if (!file) {
      setIsUploading(false);
      return;
    }
    try {
      const response = await UploadImage(file);
      const { data: ImageResponse } = response;
      const imageUrl = ImageResponse.data.url;
      setData((preve) => ({
        ...preve,
        images: [...preve.images, imageUrl],
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index) => {
    setData((preve) => {
      const updatedImages = [...preve.images];
      updatedImages.splice(index, 1);
      return {
        ...preve,
        images: updatedImages,
      };
    });
  };

  const fetchSubCategory = async () => {
    try {
      const response = await axios[SummaryApi.allsubcategory.method](
        SummaryApi.allsubcategory.url
      );

      console.log("sub category ", response);

      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setSubCategory(responseData.data));
      }
    } catch (error) {}
  };

  const removeCategory = (index) => {
    setData((preve) => {
      const updatedCategories = [...preve.category];
      updatedCategories.splice(index, 1);
      return {
        ...preve,
        category: updatedCategories,
      };
    });
  };
  const removeSubCategory = (index) => {
    setData((preve) => {
      const updatedSubCategories = [...preve.subCategory];
      updatedSubCategories.splice(index, 1);
      return {
        ...preve,
        subCategory: updatedSubCategories,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.originalPrice < data.currentPrice) {
           toast.error("Your product prices higher then original price");
    } else {
       try {
        const response = await axios[SummaryApi.addProduct.method](
          SummaryApi.addProduct.url,
          {
            ...data,
            stock: Number(data.stock),
          },
          { withCredentials: true }
        );

        const { data: responseData } = response;
        if (responseData.success) {
          toast.success("Product created successfully");
          navigate("/dashboard/product");
          window.location.reload();
        }
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      }

    }
  };

  const handleAddField = () => {
    console.log("hello");
    setData((preve) => {
      return {
        ...preve,
        more_details: {
          ...preve.more_details,
          [fieldName]: "",
        },
      };
    });
    setFieldName("");
    setOpenMoreField(false);
  };

  useEffect(() => {
    fetchSubCategory();
  }, []);

  return (
    <div className="container p-4 max-w-6xl">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
        </div>

        <form className="grid gap-2" onSubmit={handleSubmit}>
          {/* product name */}
          <div className="grid gap-1 ">
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
          {/* discription */}
          <div className="grid gap-2 ">
            <label htmlFor="Description">Description</label>
            <textarea
              type="text"
              placeholder="Enter Product Description"
              name="description"
              value={data.description}
              onChange={handleChange}
              rows={3}
              required
              className="w-full bg-gray-100 p-2 outline-0 rounded-lg"
            />
          </div>

          {/* image */}
          <div className="grid gap-2 ">
            <p>Image</p>
            <div className="grid gap-3">
              <label
                htmlFor="productImage"
                className="h-24 flex flex-col justify-center items-center rounded-lg bg-gray-200 hover:text-gray-600 cursor-pointer capitalize"
              >
                {isUploading ? (
                  <Loading />
                ) : (
                  <>
                    <MdCloudUpload size={35} className="" />
                    <p>upload Image</p>
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

              {/* display upload image */}
              <div className="flex justify-center gap-4 flex-wrap">
                {data.images.map((img, index) => (
                  <div
                    key={index}
                    className="h-[120px] w-[120px] shadow-lg rounded-lg relative group"
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full rounded-lg object-cover"
                      onClick={() => setViewImageUrl(img)}
                    />
                    <div
                      className="absolute bottom-1 right-1 bg-red-600 rounded-lg p-1 hidden group-hover:block"
                      onClick={() => removeImage(index)}
                    >
                      <MdDelete
                        size={25}
                        className="text-white cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Category  */}
          <div className="grid gap-2">
            <label>Category</label>
            {/* display selected categories */}
            <div className="p-2  flex gap-2 bg-gray-100 rounded-lg flex-wrap min-h-12">
              {data.category.map((details, index) => (
                <div
                  className="flex gap-1 justify-between items-center cursor-pointer bg-white px-3 py-1 rounded-full shadow"
                  key={index}
                >
                  <p className="capitalize text-sm">{details.name}</p>
                  <IoMdClose
                    size={16}
                    className="text-gray-700 hover:text-red-500"
                    onClick={() => removeCategory(index)}
                  />
                </div>
              ))}
            </div>

            {/* select category */}
            <div className="border-2 focus-within:border-amber-400 p-2 rounded-lg">
              <select
                className="w-full outline-0 capitalize bg-transparent"
                onChange={(e) => {
                  const value = e.target.value;
                  if (!value) return;
                  const categoryDetails = allCategory.find(
                    (el) => el._id === value
                  );
                  // Check if category already exists
                  if (data.category.some((cat) => cat._id === value)) {
                    return;
                  }
                  setData((preve) => ({
                    ...preve,
                    category: [...preve.category, categoryDetails],
                  }));
                  e.target.value = ""; // Reset select after selection
                }}
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

          {/* sub-category */}

          <div className="grid gap-2">
            <label>Sub Category</label>
            {/* display selected subcategories */}
            <div className="p-2  flex gap-2 bg-gray-100 rounded-lg flex-wrap min-h-12">
              {data.subCategory.map((details, index) => (
                <div
                  className="flex gap-1 justify-between items-center cursor-pointer bg-white px-3 py-1 rounded-full shadow"
                  key={index}
                >
                  <p className="capitalize text-sm">{details.name}</p>
                  <IoMdClose
                    size={16}
                    className="text-gray-700 hover:text-red-500"
                    onClick={() => removeSubCategory(index)}
                  />
                </div>
              ))}
            </div>

            {/* select sub-category */}
            <div className="border-2 focus-within:border-amber-400 p-2 rounded-lg">
              <select
                className="w-full outline-0 capitalize bg-transparent"
                onChange={(e) => {
                  const value = e.target.value;
                  if (!value) return;
                  const subcategoryDetails = allSubCategory.find(
                    (el) => el._id === value
                  );
                  // Check if category already exists
                  if (data.category.some((cat) => cat._id === value)) {
                    return;
                  }
                  setData((preve) => ({
                    ...preve,
                    subCategory: [...preve.subCategory, subcategoryDetails],
                  }));
                  e.target.value = ""; // Reset select after selection
                }}
                defaultValue=""
              >
                <option value="">Select Sub-Category</option>
                {allSubCategory.map((subcategory) => (
                  <option value={subcategory._id} key={subcategory._id}>
                    {subcategory.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* price */}
          <div className="w-[100%] flex flex-col md:flex-row justify-between text-start items-center gap-2 my-2 ">
            <div className="md:w-[49%] w-full flex flex-col gap-2  ">
              <label htmlFor="originalPrice">Original Price</label>
              <input
                type="number"
                name="originalPrice"
                value={data.originalPrice}
                onChange={handleChange}
                required
                placeholder="Enter the original price"
                className="w-full h-full bg-neutral-100 p-2 outline-none border-0 rounded-lg overflow-hidden"
              />
            </div>
            <div className="md:w-[49%] w-full flex flex-col gap-2  ">
              <label htmlFor="currentPrice">Current Price</label>
              <input
                type="number"
                name="currentPrice"
                value={data.currentPrice}
                onChange={handleChange}
                required
                placeholder="Enter the current price"
                className="w-full h-full bg-neutral-100 p-2 outline-none border-0 rounded-lg overflow-hidden"
              />
            </div>
          </div>
          {/* unit and stock */}
          <div className="w-[100%] flex flex-col md:flex-row justify-between text-start items-center gap-2 my-2 ">
            <div className="md:w-[49%] w-full flex flex-col gap-2  ">
              <label htmlFor="Unit">Unit</label>
              <input
                type="text"
                name="unit"
                value={data.unit}
                onChange={handleChange}
                required
                placeholder="Enter the product unit type like kilograms, liters, grams, and pieces"
                className="w-full h-full bg-neutral-100 p-2 outline-none border-0 rounded-lg overflow-hidden"
              />
            </div>
            <div className="md:w-[49%] w-full flex flex-col gap-2  ">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                name="stock"
                value={data.stock}
                onChange={handleChange}
                required
                placeholder="Enter the product stock"
                className="w-full h-full bg-neutral-100 p-2 outline-none border-0 rounded-lg overflow-hidden"
              />
            </div>
          </div>

          {/* Add more fields as needed */}
          <div>
            {Object?.keys(data?.more_details).map((k, index) => {
              return (
                <div className="grid gap-1 ">
                  <label htmlFor={k}>{k}</label>
                  <input
                    id={k}
                    type="text"
                    value={data?.more_details[k]}
                    onChange={(e) => {
                      const value = e.target.value;
                      setData((perve) => {
                        return {
                          ...perve,
                          more_details: {
                            ...perve.more_details,
                            [k]: value,
                          },
                        };
                      });
                    }}
                    required
                    className="w-full bg-gray-100 p-2 outline-0 rounded-lg"
                  />
                </div>
              );
            })}
          </div>
          <div
            className="w-[200px] bg-blue-600 p-2 rounded-lg text-center text-white cursor-pointer hover:bg-blue-800 font-semibold capitalize "
            onClick={() => {
              setOpenMoreField(true);
            }}
          >
            Add fields
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Product
          </button>
        </form>
      </div>

      {ViewImageUrl && (
        <ViewImage url={ViewImageUrl} close={() => setViewImageUrl("")} />
      )}

      {openMoreField && (
        <AddFieldComponent
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          submit={handleAddField}
          close={() => setOpenMoreField(false)}
        />
      )}
    </div>
  );
};

export default UploadProduct;
