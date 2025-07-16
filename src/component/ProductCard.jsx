import { Link, useNavigate } from "react-router-dom";
import { DisplayPriceRupee } from "../utils/DisplayPriceRupee";
import { memo, useState } from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import axios from "axios";
import toast from "react-hot-toast";
import SummaryApi from "../comman/SummaryApi";

const ProductCard1 = memo(({ data, cat_id }) => {
  const [quantity, setQuantity] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDecLoading, setIsDecLoading] = useState(false);
  const isOutOfStock = data?.stock === 0;
  const navigate = useNavigate();
  const { fetchCart } = useGlobalContext();

  const discount = Math.ceil(
    ((data?.originalPrice - data?.currentPrice) / data?.originalPrice) * 100
  );

  const url = `/view/product/${encodeURIComponent(data?._id)}/${encodeURIComponent(
    data?.name
  )}/${encodeURIComponent(cat_id)}`;

  const handleAddToCart = async (e) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (isOutOfStock || isLoading) return;

    setIsLoading(true);

    try {
      const response = await axios({
        url: SummaryApi.addcart.url,
        method: SummaryApi.addcart.method,
        data: {
          productId: data?._id,
          quantity: 1,
        },
        withCredentials: true,
      });

      if (response.data.success) {
        setIsAdded(true);
        setQuantity((prev) => prev + 1);
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
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecrement = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock || isDecLoading) return;

    setIsDecLoading(true);

    try {
      const response = await axios({
        url: SummaryApi.decrement.url,
        method: SummaryApi.decrement.method,
        data: {
          productId: data?._id,
        },
        withCredentials: true,
      });

      if (response.data.success) {
        setQuantity((prev) => Math.max(0, prev - 1));
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

  return (
    <div className="w-38 lg:w-56 flex flex-col lg:gap-2 p-1 lg:p-2 rounded border border-gray-200 hover:shadow-md transition-shadow duration-300">
      <Link
        to={url}
        className="flex flex-col flex-grow"
        key={`${data?.name}+${data?._id}`}
        aria-label={`View ${data?.name} product details`}
      >
        <div className="w-full h-30 lg:h-40 relative">
          {isOutOfStock && (
            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-bl-lg z-10">
              OUT OF STOCK
            </div>
          )}

          {discount > 0 && (
            <div className="absolute top-0 left-0 bg-red-500 py-1 text-sm font-semibold px-3 rounded text-white z-10">
              <h2>Off: {discount}%</h2>
            </div>
          )}
          <img
            src={data?.image?.[0]}
            alt={data?.name}
            className={`w-full h-full rounded-lg object-scale-down ${
              isOutOfStock ? "opacity-50" : ""
            }`}
            loading="lazy"
          />
        </div>

        <div className="bg-gray-200 w-fit px-3 py-1 text-sm text-purple-600 font-semibold rounded mt-2">
          10 min
        </div>

        <h3 className="w-full text-sm lg:text-[16px] font-semibold rounded line-clamp-2 mt-1">
          {data?.name}
        </h3>

        <div className="w-fit text-sm font-semibold text-gray-600">
          {data?.unit}
        </div>
      </Link>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-2 mt-2">
        <div className="w-full flex flex-col">
          <span className="text-lg font-bold text-gray-900">
            {DisplayPriceRupee(data?.currentPrice)}
          </span>
          {data?.originalPrice > data?.currentPrice && (
            <del className="text-red-600 text-sm">
              {DisplayPriceRupee(data?.originalPrice)}
            </del>
          )}
        </div>

        <div className="w-[80%] m-auto">
          {!isAdded ? (
            <button
              className={`w-full lg:w-fit h-8 px-7 flex justify-center items-center text-md font-semibold rounded-md transition-all duration-300 ${
                isOutOfStock || isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-purple-500 text-white hover:bg-white hover:text-purple-500 border border-purple-500"
              }`}
              onClick={handleAddToCart}
              aria-label={`Add ${data?.name} to cart`}
              disabled={isOutOfStock || isLoading}
            >
              {isLoading ? "..." : isOutOfStock ? "Out" : "Add"}
            </button>
          ) : (
            <div className="w-full flex items-center justify-center gap-1 h-8">
              <button
                className="w-full px-2 h-full flex items-center justify-center bg-purple-500 text-white hover:bg-purple-700 rounded disabled:opacity-50"
                onClick={handleDecrement}
                aria-label="Decrease quantity"
                disabled={isDecLoading}
              >
                {isDecLoading ? "..." : "-"}
              </button>
              <span className="w-full h-full px-2 flex items-center justify-center font-medium border border-purple-500 rounded-md">
                {quantity}
              </span>
              <button
                className="w-full px-2 h-full flex items-center justify-center bg-purple-500 text-white hover:bg-purple-700 rounded disabled:opacity-50"
                onClick={handleAddToCart}
                aria-label="Increase quantity"
                disabled={isLoading || isOutOfStock}
              >
                {isLoading ? "..." : "+"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default ProductCard1;