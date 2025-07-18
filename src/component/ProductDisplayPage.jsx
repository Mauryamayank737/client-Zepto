import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import SummaryApi from "../comman/SummaryApi";
import ProductCard1 from "./ProductCard";
import noReturnIcon from "../assets/noReturn.svg";
import FastDelivery from "../assets/fastDelivery.svg";
import LoadingCard from "./LoadingCard";
import { toast } from "react-hot-toast";
import { useGlobalContext } from "../provider/GlobalProvider";

const ProductDisplayPage = () => {
const { id, name, cat_id } = useParams();
  const navigate = useNavigate();
  const { fetchCart } = useGlobalContext();

  const [productData, setProductData] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [otherProducts, setOtherProducts] = useState([]);
  const [otherRelatedProducts, setOtherRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDecLoading, setIsDecLoading] = useState(false);

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
      
      // Check if product is already in cart
      const cartResponse = await axios({
        method: SummaryApi.checkCartItem.method,
        url: `${SummaryApi.checkCartItem.url}/${response.data.data._id}`,
        withCredentials: true
      });
      
      if (cartResponse.data.success && cartResponse.data.data) {
        setIsAdded(true);
        setQuantity(cartResponse.data.data.quantity);
      }
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

  const handleAddToCart = async () => {
    if (productData?.stock === 0 || isLoading) return;
    
    setIsLoading(true);
    
    try {
      const response = await axios({
        url: SummaryApi.addcart.url,
        method: SummaryApi.addcart.method,
        data: { 
          productId: productData?._id,
          quantity: quantity
        },
        withCredentials: true,
      });

      if (response.data.success) {
        setIsAdded(true);
        setQuantity(quantity+1)
        toast.success(response.data.message || "Added to cart successfully");
        fetchCart();
      } else {
        toast.error(response.data.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error(
        error.response?.data?.message || error.message || "Failed to add to cart"
      );
      
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // const handleA = async() => {
  //   if (productData?.stock === 0) return;
  //   setQuantity(prev => prev + 1);
  //   if (!isAdded) {
  //     await handleAddToCart();
  //   }
  // };

  const handleDecrement = async () => {
    if (productData?.stock === 0 || isDecLoading) return;
    
    setIsDecLoading(true);
    
    try {
      const response = await axios({
        url: SummaryApi.decrement.url,
        method: SummaryApi.decrement.method,
        data: { 
          productId: productData?._id
        },
        withCredentials: true,
      });

      if (response.data.success) {
        setQuantity(prev => Math.max(1, prev - 1));
        if (quantity <= 1) {
          setIsAdded(false);
        }
        toast.success(response.data.message || "Item quantity decreased");
        fetchCart();
      } else {
        toast.error(response.data.message || "Failed to update cart");
      }
    } catch (error) {
      console.error("Decrement cart error:", error);
      toast.error(
        error.response?.data?.message || error.message || "Failed to update cart"
      );
    } finally {
      setIsDecLoading(false);
    }
  };

  const handleBuyNow = async () => {
    if (productData?.stock === 0) return;
    
    if (!isAdded) {
      // await handleAddToCart();
    }
    // navigate('/cart');
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
            <h2 className="text-lg lg:text-2xl font-bold line-clamp-3 ">{productData.name}</h2>
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
                <p className="w-full text-center text-[11px]">Fast Delivery</p>
              </div>
            </div>
          </div>

          {/* Product buy and add button */}
            {/* <div className="p-4 capitalize"> */}
      <div>
        {productData.stock == 0 ? (
          <div className="flex justify-between gap-4 sticky bottom-0 bg-white p-4 shadow-md">
            <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors capitalize">
              Out of Stock
            </button>
          </div>
        ) : (
          <div className="flex justify-between gap-4 sticky bottom-0 bg-white p-4 shadow-md">
            <button
              className="w-full py-3 bg-purple-500 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
              onClick={handleBuyNow}
              disabled={isLoading}
            >
              Buy Now
            </button>

            {!isAdded ? (
              <button
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                onClick={handleAddToCart}
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add to Cart"}
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 w-full bg-white rounded-lg">
                <button
                  className="px-4 py-3 bg-green-600 text-white hover:bg-green-700 rounded-l-lg disabled:opacity-50"
                  onClick={handleDecrement}
                  disabled={isDecLoading}
                >
                  {isDecLoading ? "..." : "-"}
                </button>
                <span className="px-4 py-3 font-medium">
                  {quantity}
                </span>
                <button
                  className="px-4 py-3 bg-green-600 text-white hover:bg-green-700 rounded-r-lg disabled:opacity-50"
                  onClick={handleAddToCart}
                  disabled={isLoading}
                >
                  {isLoading ? "..." : "+"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ... (rest of the JSX remains the same) ... */}
    {/* </div> */}
        </div>
      </div>

      {/* Related/Other Products */}

      {otherRelatedProducts.length > 0 && (
        <div className="w-full lg:w-[80%] m-auto mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            More Products in This Category
          </h2>
          <div className="w-full flex gap-3 justify-center lg:justify-start flex-wrap">
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
        <div className="w-full lg:w-[80%] m-auto mt-8">
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
