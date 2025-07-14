import { Link, useParams } from "react-router-dom";
import { DisplayPriceRupee } from "../utils/DisplayPriceRupee";
import { useNavigate } from "react-router-dom";

const ProductCard1 = ({ data, cat_id }) => {
  const category_id = cat_id;

  const navigate = useNavigate();
  // const info = useParams()
  // console.log(info)

  const calculateDiscount = (originalPrice, currentPrice) => {
    return Math.ceil(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  const discount = calculateDiscount(data.originalPrice, data.currentPrice);

  const url = `/view/product/${encodeURIComponent(
    data._id
  )}/${encodeURIComponent(data.name)}/${encodeURIComponent(category_id)}`;

  return (
    <Link
      to={url}
      className="w-38  lg:w-56 flex flex-col lg:gap-2  p-1 lg:p-2  rounded border border-gray-200 "
      key={`${data.name}+${data._id}`}
    >
      <div className="w-full h-30 lg:h-40 relative ">
        <div className="absolute top-0 left-0 bg-red-400 py-1 text-sm font-semibold px-3 rounded text-white">
          <h2>Off : {discount}%</h2>
        </div>
        <img
          src={data.image[0]}
          alt=""
          className="w-full h-full rounded-lg object-scale-down"
        />
      </div>
      <div className="bg-gray-200 w-fit px-3 py-1 text-sm text-purple-600 font-semibold rounded">
        10 min
      </div>
      <div className="w-full text-sm lg:text-[16px] font-semibold rounded line-clamp-2">
        <h2>{data.name}</h2>
      </div>

      <div className="w-fit text-sm font-semibold">{data.unit}</div>

      <div className="flex justify-between gap-2 mt-2">
        <div className="w-full py-1 text-sm font-semibold  rounded-md flex flex-col">
          {DisplayPriceRupee(data.currentPrice)}
          <del className="text-red-600">
            {DisplayPriceRupee(data.originalPrice)}
          </del>
        </div>
        <div className="w-full h-8 flex justify-center items-center py-1 bg-purple-500 text-md font-semibold text-white hover:bg-white hover:text-purple-500 border border-purple-500 rounded-md transition-all duration-500">
          <button>Add</button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard1;
