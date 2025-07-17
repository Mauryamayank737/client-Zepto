import React, { useEffect, useState } from "react";
import SummaryApi from "../comman/SummaryApi";
import axios from "axios";
import ProductCard1 from "./ProductCard";

const SupperSaver = () => {
  const [productData, setProductData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const productList = async () => {
    try {
      setLoading(true);
      const response = await axios({
        method: SummaryApi.list.method,
        url: `${SummaryApi.list.url}?limit=${limit}&page=${page}`,
        data: { currentPrice: 1, order: 1 },
        params:{page ,limit}
      });
      setProductData(response.data.data || []);
      setLoading(false); 
    } catch (error) {
      console.log(error.message || error);
      setLoading(false);
    }
  };

  useEffect(() => {
    productList();
  }, [limit, page]);

  return (
    <div className="md:w-[90%] lg:w-[80%] m-auto flex justify-center gap-3 flex-wrap my-6">
      {productData.map((d, index) => (
        <ProductCard1 data={d} key={d._id || index} />
      ))}

      <div className="w-full flex justify-center mt-4">
        {loading ? (
          <div className="bg-gray-200 px-4 py-2 rounded shadow text-gray-600">
            Loading...
          </div>
        ) : (
          <button
            className="bg-amber-100 cursor-pointer text-center py-2 px-4 rounded shadow hover:bg-amber-200"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next Page
          </button>
        )}
      </div>
      <div className="w-full flex justify-center mt-4">
        {loading ? (
          <div className="bg-gray-200 px-4 py-2 rounded shadow text-gray-600">
            Loading...
          </div>
        ) : (
          <button
            className="bg-amber-100 cursor-pointer text-center py-2 px-4 rounded shadow hover:bg-amber-200"
            onClick={() => setPage((prev) => prev - 1)}
          >
            prev Page
          </button>
        )}
      </div>
    </div>
  );
};

export default SupperSaver;
