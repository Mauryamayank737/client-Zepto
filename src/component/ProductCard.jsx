import { Link } from "react-router-dom";
import { DisplayPriceRupee } from "../utils/DisplayPriceRupee";
import { memo, useState, useCallback } from "react";

const ProductCard1 = memo(({ data, cat_id }) => {
  const [quantity, setQuantity] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const calculateDiscount = useCallback((originalPrice, currentPrice) => {
    return Math.ceil(((originalPrice - currentPrice) / originalPrice) * 100);
  }, []);

  const discount = calculateDiscount(data.originalPrice, data.currentPrice);

  const url = `/view/product/${encodeURIComponent(data._id)}/${encodeURIComponent(
    data.name
  )}/${encodeURIComponent(cat_id)}`;

  const handleAddToCart = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdded(true);
    setQuantity(1);
    // Add your actual cart logic here
    console.log("Added to cart:", data._id);
  }, [data._id]);

  const handleIncrement = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity(prev => prev + 1);
  }, []);

  const handleDecrement = useCallback((e) => {
  e.preventDefault();
  e.stopPropagation();
  setQuantity((prev) => {
    if (prev > 1) {
      return prev - 1;
    } else {
      setIsAdded(false);
      return 0;
    }
  });
}, []);

  return (
    <Link
      to={url}
      className="w-38 lg:w-56 flex flex-col lg:gap-2 p-1 lg:p-2 rounded border border-gray-200 hover:shadow-md transition-shadow duration-300"
      key={`${data.name}+${data._id}`}
      aria-label={`View ${data.name} product details`}
    >
      <div className="w-full h-30 lg:h-40 relative">
        {discount > 0 && (
          <div className="absolute top-0 left-0 bg-red-400 py-1 text-sm font-semibold px-3 rounded text-white z-10">
            <h2>Off: {discount}%</h2>
          </div>
        )}
        <img
          src={data.image[0]}
          alt={data.name}
          className="w-full h-full rounded-lg object-scale-down"
          loading="lazy"
        />
      </div>

      <div className="bg-gray-200 w-fit px-3 py-1 text-sm text-purple-600 font-semibold rounded mt-2">
        10 min
      </div>

      <h3 className="w-full text-sm lg:text-[16px] font-semibold rounded line-clamp-2 mt-1">
        {data.name}
      </h3>

      <div className="w-fit text-sm font-semibold text-gray-600">{data.unit}</div>

      <div className="flex lg:flex-row flex-col justify-between gap-2 mt-2">
        <div className="w-full py-1 text-sm font-semibold rounded-md flex flex-col">
          <span className="text-lg font-bold text-gray-900">
            {DisplayPriceRupee(data.currentPrice)}
          </span>
          {data.originalPrice > data.currentPrice && (
            <del className="text-red-600 text-sm">
              {DisplayPriceRupee(data.originalPrice)}
            </del>
          )}
        </div>

        {!isAdded ? (
          <button
            className="w-full h-8 flex justify-center items-center py-1 bg-purple-500 text-md font-semibold text-white hover:bg-white hover:text-purple-500 border border-purple-500 rounded-md transition-all duration-300"
            onClick={handleAddToCart}
            aria-label={`Add ${data.name} to cart`}
          >
            Add
          </button>
        ) : (
          <div className="flex items-center justify-between gap-1 text-center   h-8 w-full">
            <button
              className="px-2 h-full flex items-center justify-center bg-purple-500 text-white  hover:bg-purple-700 rounded-l-md  rounded-md"
              onClick={handleDecrement}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="h-full flex-grow text-center font-medium border border-purple-500 rounded-md">{quantity}</span>
            <button
              className="px-2 h-full flex items-center justify-center bg-purple-500 text-white  hover:bg-purple-700 rounded-l-md  rounded-md"
              onClick={handleIncrement}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        )}
      </div>
    </Link>
  );
});

export default ProductCard1;