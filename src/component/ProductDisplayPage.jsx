import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import SummaryApi from "../comman/SummaryApi";
import ProductCard1 from "./ProductCard";
import noReturnIcon from "../assets/noReturn.svg";
import FastDelivery from "../assets/fastDelivery.svg";
import LoadingCard from "./LoadingCard";

const ProductDisplayPage = () => {
  const { id, name, cat_id } = useParams();

  const [productData, setProductData] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [otherProducts, setOtherProducts] = useState([]);
  const [otherRelatedProducts, setOtherRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRelatedProducts = async (cat_id) => {
    setLoading(true);
    try {
      const response = await axios({
        method: SummaryApi.getProductByCategory.method,
        url: SummaryApi.getProductByCategory.url,
        data: { id: cat_id },
      });
      setOtherRelatedProducts(response.data.data || []);
    } catch (error) {
      console.error("Error fetching other products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOtherProductList = async () => {
    try {
      const response = await axios({
        method: SummaryApi.list.method,
        url: SummaryApi.list.url,
        data: {},
      });
      setOtherProducts(response.data.data || []);
    } catch (error) {
      console.log(error.message || error);
    }
  };

  const productDetails = async (id) => {
    try {
      const response = await axios({
        method: SummaryApi.view.method,
        url: `${SummaryApi.view.url}/${id}`,
      });
      setProductData(response.data.data);
    } catch (error) {
      console.log(error.message || error);
    }
  };

  useEffect(() => {
    if (id && cat_id) {
      productDetails(id);
      fetchRelatedProducts(cat_id);
      fetchOtherProductList();
    }
  }, [id, cat_id]);

  const calculateDiscount = (originalPrice, currentPrice) => {
    return Math.ceil(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  if (!productData) return <div>Loading...</div>;

  const discount = calculateDiscount(
    productData.originalPrice,
    productData.currentPrice
  );

  return (
    <div className="p-4 capitalize">
      <div className="w-[90%] lg:w-[80%] m-auto h-full flex flex-col lg:flex-row justify-between relative">
        {/* Left: Product Images */}
        <div className="w-full lg:w-[48%] lg:h-[600px] flex flex-col gap-2 p-3 lg:sticky top-24 ">
          <span className="text-md w-[100px] text-green-600 bg-green-100 p-2 rounded text-center absolute">
            {discount}% OFF
          </span>
          <div className="w-full h-[300px] md:min-h-[380px] lg:min-h-[450px] object-center flex justify-center rounded mb-5 bg-white py-5 ">
            <img
              src={productData.image[currentImage]}
              alt=""
              className="rounded-4xl object-contain max-h-full"
            />
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {productData.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                className="w-[70px] h-[70px] rounded-lg cursor-pointer border hover:border-green-500"
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="w-full lg:w-[48%] h-full flex flex-col gap-3">
          <div className=" border-[1px] p-3 border-gray-200 rounded-xl flex flex-col gap-4">
            <h1 className="text-2xl font-bold ">{productData.name}</h1>
            <p className="text-gray-700 text-sm lg:text-[16px] line-clamp-4">
              {productData.description}
            </p>

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
          </div>

          {/* More Details */}

          <div className="border-[1px] p-3 border-gray-200 rounded-xl flex flex-col gap-4">
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
            {/* add features */}
          <div className="flex gap-4 border-t border-gray-300 p-4">
            <div className="w-25 p-4 bg-gray-100 rounded-xl flex flex-col justify-center items-center gap-1 ">
              <img src={noReturnIcon} alt="" className="w-10 h-10" />
              <p className="w-full text-center text-[11px]">
                No Returen Or Exchange
              </p>
            </div>

            <div className=" p-4 bg-gray-100 rounded-xl flex flex-col justify-center items-center gap-1">
              <img src={FastDelivery} alt="" className="w-10 h-10" />
              <p className="w-full text-center text-[11px]">
                Fast Delivery
              </p>
            </div>
          </div>
          </div>

          

          {/* Product buy and add button */}
          <div className="flex justify-between gap-4 sticky bottom-0 bg-white p-4 shadow-md">
            <button
              className="w-full py-3 bg-purple-500 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
              onClick={() => console.log("Buy Now clicked")}
            >
              Buy Now
            </button>

            <button
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              onClick={() => console.log("Add to Cart clicked")}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Related/Other Products */}
    


      
      {otherRelatedProducts.length > 0 && (
        <div className="w-[90%] lg:w-[80%] m-auto mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            More Products in This Category
          </h2>
          <div className="flex gap-3 justify-center lg:justify-start flex-wrap">
            {loading ? (
              <div className="flex gap-2 lg:gap-4  lg:pb-4">
            {[...Array(6)].map((_, index) => (
              <LoadingCard key={index} />
            ))}
          </div>
            ) : (
              otherRelatedProducts
                .filter((p) => p._id !== id)
                .map((item) => (
                  <ProductCard1 key={item._id} data={item} cat_id={cat_id} />
                ))
            )}
          </div>
        </div>
      )}

      {/* Other Products */}
      {otherProducts.length > 0 && (
        <div className="w-[90%] lg:w-[80%] m-auto mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Other Products You Might Like
          </h2>
          <div className="flex gap-3 justify-center lg:justify-start flex-wrap">
            {loading ? (
              <div className="flex gap-2 lg:gap-4  lg:pb-4">
            {[...Array(6)].map((_, index) => (
              <LoadingCard key={index} />
            ))}
          </div>
            ) : (
              otherProducts
                .filter((p) => p._id !== id)
                .map((item) => (
                  <ProductCard1
                    key={item._id}
                    data={item}
                    cat_id={item.category}
                  />
                ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDisplayPage;
