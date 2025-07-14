import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import SummaryApi from "../../comman/SummaryApi";
import EditProduct from "./EditProduct";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";

const ViewProduct = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const productDetails = async (id) => {
    try {
      const response = await axios[SummaryApi.view.method](
        `${SummaryApi.view.url}/${id}`
      );
      setProductData(response.data.data);
    } catch (error) {
      console.log(error.message || error);
    }
  };

  const calculateDiscount = (originalPrice, currentPrice) => {
    return Math.ceil(
      ((originalPrice - currentPrice) / originalPrice) * 100
    );
  };

  useEffect(() => {
    if (id) {
      productDetails(id);
    }
  }, [id]);

  if (!productData) return <div>Loading...</div>;

  const discount = calculateDiscount(
    productData.originalPrice,
    productData.currentPrice
  );

  return (
    <div className="p-4 capitalize">
      <div className="w-full h-full flex flex-col lg:flex-row justify-between">
        {/* Product Image and Thumbnails */}
        <div className="w-full lg:w-[48%] flex flex-col gap-2 p-3">
          <span className="text-md w-[100px] text-green-600 bg-green-100 p-2  rounded text-center absolute">
                {discount}% OFF
              </span>
          <div className="w-full h-[300px] md:min-h-[380px] lg:min-h-[450px] rounded-4xl object-center flex justify-center">
            <img
              src={productData.image[currentImage]}
              alt=""
              className="rounded-4xl object-contain max-h-full"
            />
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {productData.image.map((data, index) => (
              <div key={index}>
                <img
                  src={data}
                  alt=""
                  className="w-[70px] h-[70px] rounded-lg cursor-pointer border hover:border-green-500"
                  onClick={() => setCurrentImage(index)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-[48%] h-full flex flex-col gap-3">
          <h1 className="text-2xl font-bold">{productData.name}</h1>
          <p className="text-gray-700">{productData.description}</p>

          <div className="flex justify-between items-center">
            <h2 className="flex items-center gap-2 w-[50%] font-semibold text-md text-gray-800">
              Price: ₹{productData.currentPrice}
              <del className="text-red-400 text-[16px]">
                ₹{productData.originalPrice}
              </del>
              
            </h2>
            <h2 className="w-[50%] font-semibold text-md text-gray-800">
              Unit: {productData.unit}
            </h2>
          </div>

          <div>
            <h2 className="w-[50%] font-semibold text-md text-gray-800">
              Stock: {productData.stock}
            </h2>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-gray-800">
              More Details
            </h2>
            <div className="flex flex-col gap-2 my-2">
              {productData.more_details &&
                Object.entries(productData.more_details).map(
                  ([key, value], index) => (
                    <div
                      key={index}
                      className="flex gap-2 items-baseline text-gray-700 capitalize"
                    >
                      <p className="font-semibold text-md text-gray-800">
                        {key}:
                      </p>
                      <p className="font-normal text-md text-gray-700 leading-loose">
                        {key === "contains" &&
                        typeof value === "string" &&
                        value.startsWith("[")
                          ? JSON.parse(value).join(", ")
                          : value}
                      </p>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-[20px] sticky bottom-0 left-0 py-5 px-5 bg-gray-100 rounded shadow-sm">
        <NavLink
          to={`/dashboard/product`}
          className="w-full md:w-[40%] lg:w-[20%]"
        >
          <button className="w-full border-2 border-green-600 py-1 rounded-lg cursor-pointer hover:bg-green-600 hover:text-white transition-colors flex items-center justify-center gap-2 font-semibold">
            <IoMdArrowRoundBack size={19} /> All Products
          </button>
        </NavLink>

        <button
          onClick={() => {
            setOpenEdit(true);
          }}
          className="w-full md:w-[40%] lg:w-[20%] border-2 border-green-600 py-1 rounded-lg cursor-pointer hover:bg-green-600 hover:text-white transition-colors flex justify-center gap-2 items-center font-semibold"
        >
          Update Product <FaArrowRight size={14} />
        </button>
      </div>

      {openEdit && (
        <EditProduct data={productData} close={() => setOpenEdit(false)} />
      )}
    </div>
  );
};

export default ViewProduct;
