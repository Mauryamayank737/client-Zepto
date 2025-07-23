import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import SummaryApi from "../comman/SummaryApi";
import { useState } from "react";
import ProductCard1 from "./ProductCard";
import AllSubCategory from "../assets/images.png";
import NoData from "./admin/NoData";
import LoadingCard from "./LoadingCard";

const ProductPage = () => {
  const { categoryid, categoryName } = useParams();
  const [subcategory, setSubcategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchSubcategory = async (id) => {
    try {
      const response = await axios({
        method: SummaryApi.getSubcategoryByCategory.method,
        url: SummaryApi.getSubcategoryByCategory.url,
        data: { id },
      });
      setSubcategory(response.data.data || response.data);
    } catch (error) {
      console.error("Failed to fetch subcategories:", error);
      setError("Failed to load subcategories");
    }
  };

  const fetchProductByCategory = async (id) => {
    try {
      setLoading(true);
      const result = await axios({
        url: SummaryApi.getProductByCategory.url,
        method: SummaryApi.getProductByCategory.method,
        data: { id },
      });
      setProducts(result.data.data);
      setError(null);
      navigate(
        `/${encodeURIComponent(categoryid)}/${encodeURIComponent(
          categoryName
        )}/All`
      );
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setError("Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsBySubcategory = async (id, name) => {
    try {
      setLoading(true);
      const result = await axios({
        url: SummaryApi.getProductBySubcategory.url,
        method: SummaryApi.getProductBySubcategory.method,
        data: { id },
      });
      setProducts(result.data.data);
      setError(null);
      console.log("categoryid", categoryid);
      console.log("categoryName", categoryName);
      console.log("id", id);
      navigate(
        `/${encodeURIComponent(categoryid)}/${encodeURIComponent(
          categoryName
        )}/${encodeURIComponent(name)}`
      );
    } catch (error) {
      console.error("Failed to fetch subcategory products:", error);
      setError("Failed to load subcategory products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryid) {
      fetchSubcategory(categoryid);
      fetchProductByCategory(categoryid);
    }
  }, [categoryid]);

  return (
    <div className="w-[90%] m-auto flex flex-col lg:flex-row gap-4 relative">
      {/* Subcategory section */}
      <div className="flex lg:flex-col items-center w-full lg:w-40 lg:border-r-1 border-gray-200 px-5 py-2 gap-4 lg:sticky top-24">
        <div
          className="w-15 h-15 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer p-2"
          onClick={() => fetchProductByCategory(categoryid)} // Fixed onClick
        >
          <img
            src={AllSubCategory}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {subcategory.map((data, index) => (
          <div
            key={data._id || index}
            className="w-15 h-15 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => fetchProductsBySubcategory(data._id, data.name)} // Fixed onClick
          >
            <img
              src={data.image || "/placeholder-image.jpg"}
              alt={data.name || "Subcategory"}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder-image.jpg";
              }}
            />
          </div>
        ))}
      </div>

      {/* Product section */}
      <div className="w-full flex flex-wrap justify-center lg:justify-start gap-3">
        {loading ? (
          [...Array(5)].map((_, index) => <LoadingCard key={index} />)
        ) : error ? (
          <NoData />
        ) : (
          products.map((data, index) => (
            <ProductCard1
              key={data._id || index} // Added proper key
              data={data}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductPage;
