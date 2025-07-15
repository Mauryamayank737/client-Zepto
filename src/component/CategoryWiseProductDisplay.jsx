import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import SummaryApi from "../comman/SummaryApi";
import ProductCard1 from "./ProductCard";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import LoadingCard from "./LoadingCard";

const CategoryWiseProductDisplay = ({ categoryData }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [showArrows, setShowArrows] = useState(false);
  const scrollContainerRef = useRef(null);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: SummaryApi.getProductByCategory.method,
        url: SummaryApi.getProductByCategory.url,
        data: { id: categoryData._id },
      });
      setProducts(response.data.data || []);
    } catch (error) {
      console.log("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryData?._id) {
      fetchProduct();
    }
  }, [categoryData]);

  useEffect(() => {
    const checkOverflow = () => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowArrows(scrollWidth > clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [products]);




  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full h-full relative">
      {/* Header */}
      <div className="flex justify-between py-5 font-semibold text-lg">
        <h3>{categoryData?.name || "Category"}</h3>
        <Link
          to={`/${categoryData?._id}/${categoryData?.name}/all`}
          className="text-purple-600 hover:text-purple-800"
        >
          See All
        </Link>
      </div>

      {/* Product Scroll Row */}
      <div
        ref={scrollContainerRef}
        className="pl-2 pr-12 flex gap-3 overflow-x-auto scrollbar-hide"
      >
        {loading ? (
          <div className="flex gap-2 lg:gap-4  lg:pb-4">
            {[...Array(6)].map((_, index) => (
              <LoadingCard key={index} />
            ))}
          </div>
        ) : (
         
            products.map((p) => (
            <div key={p._id || p.id} className="flex-shrink-0">
              <ProductCard1 data={p} cat_id={categoryData._id} />
            </div>
          ))
        )}
      </div>

      {/* Scroll Arrows */}
      {showArrows && !loading && (
        <>
          <button
            onClick={() => scroll("left")}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 shadow-lg absolute left-2 top-1/2 transform -translate-y-1/2 z-10"
          >
            <MdKeyboardArrowLeft size={32} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 shadow-lg absolute right-2 top-1/2 transform -translate-y-1/2 z-10"
          >
            <MdKeyboardArrowRight size={32} />
          </button>
        </>
      )}
    </div>
  );
};

export default CategoryWiseProductDisplay;
