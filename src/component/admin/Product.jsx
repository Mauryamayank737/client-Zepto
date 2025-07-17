import React, { useEffect, useState, useMemo, useCallback } from "react";
import NoData from "./NoData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SummaryApi from "../../comman/SummaryApi";
import Loading from "./Loading";
import toast from "react-hot-toast";
import ProductAdminCard from "./ProductAdminCard";
import { CiSearch } from "react-icons/ci";
import debounce from "lodash/debounce";
import { IoChevronBackOutline } from "react-icons/io5";
import { GrFormNext } from "react-icons/gr";

const Product = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [option, setOption] = useState({});
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const ProductList = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${SummaryApi.list.url}/?limit=${limit}&page=${page}`,
        option,
        { withCredentials: true }
      );
      setProductData(response.data.data);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [option, limit, page]);

  const debouncedSearch = useMemo(
    () =>
      debounce(async (value) => {
        try {
          setSearchLoading(true);
          const response = await axios.post(
            SummaryApi.SearchProduct.url,
            { name: value },
            { withCredentials: true }
          );
          setProductData(response.data.data);
          setTotalPages(1); // Reset pagination during search
        } catch (error) {
          toast.error(error.response?.data?.message || "Search failed");
        } finally {
          setSearchLoading(false);
        }
      }, 500),
    []
  );

  const handleOnChange = (e) => {
    const value = e.target.value.trimStart();
    setSearch(value);
    if (value.length >= 1) {
      debouncedSearch(value);
      setPage(1); 
    } else {
      ProductList();
    }
  };

  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= 100) {
      setLimit(value);
      setPage(1); // Reset to first page when changing limit
    }
  };

  useEffect(() => {
    if (search.length < 1) {
      ProductList();
    }
  }, [option, limit, page, search.length, ProductList]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="md:p-4">
      <section className="mb-6">
        <div className="p-4 shadow-md rounded-lg mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-xl font-semibold">Product</h1>

          <div className="flex flex-col md:flex-row gap-3 items-start md:items-center w-full md:w-auto">
            {/* Search input - now visible on mobile */}
            <div className="bg-gray-100 items-center px-2 rounded-md border-2 border-gray-100 focus-within:border-amber-400 w-full md:w-auto flex">
              <CiSearch size={23} />
              <input
                type="text"
                placeholder="Search Product..."
                className="p-2 bg-transparent outline-0 w-full"
                value={search}
                onChange={handleOnChange}
              />
              {(loading || searchLoading) && (
                <span className="ml-2 text-gray-500">Searching...</span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {/* Sort by */}
              <select
                onChange={(e) => {
                  const value = e.target.value;
                  switch (value) {
                    case "name-desc":
                      setOption({ name: 1, order: 1 });
                      break;
                    case "name-asc":
                      setOption({ name: 1 });
                      break;
                    case "price-desc":
                      setOption({ currentPrice: 1, order: 1 });
                      break;
                    case "price-asc":
                      setOption({ currentPrice: 1 });
                      break;
                    case "date-desc":
                      setOption({ createdAt: 1 });
                      break;
                    case "date-asc":
                      setOption({ createdAt: 1, order: 1 });
                      break;
                    default:
                      setOption({});
                  }
                  setPage(1);
                }}
                className="px-5 py-2 border-2 border-amber-400 rounded-lg text-gray-600 transition-colors cursor-pointer w-full md:w-auto"
              >
                <option value="">Default Sorting</option>
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="name-desc">Name (A-Z)</option>
                <option value="name-asc">Name (Z-A)</option>
                <option value="price-asc">Price (High to Low)</option>
                <option value="price-desc">Price (Low to High)</option>
              </select>

              {/* Add product button */}
              <button
                className="px-5 py-2 border-2 border-amber-400 rounded-lg text-gray-600 hover:bg-amber-400 hover:text-white transition-colors cursor-pointer w-full md:w-auto"
                onClick={() => navigate("/dashboard/uploadproduct")}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end items-center gap-3">
          <label className="text-sm">Products per page:</label>
          <input 
            type="number" 
            value={limit} 
            onChange={handleLimitChange}
            min="1"
            max="100"
            className="w-20 outline-none px-3 py-1 border rounded"
          />
        </div>
      </section>

      {(loading || searchLoading) && <Loading />}

      <div className="flex justify-center items-start gap-2 lg:gap-5 flex-wrap bg-gray-200 py-3 md:p-5 rounded">
        {!loading && !searchLoading && Array.isArray(productData) && productData.length > 0 ? (
          productData.map((data, index) => (
            <ProductAdminCard data={data} key={data._id || index} />
          ))
        ) : (
          !loading && !searchLoading && <NoData message="No products found. Try adjusting your search or filters." />
        )}
      </div>

      {!loading && !searchLoading && productData.length > 0 && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 my-5">
          <div className="text-sm text-gray-600">
            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, productData.length)} of results
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className={`py-2 px-4 flex items-center gap-1 rounded ${
                page > 1 
                  ? "bg-amber-400 text-white hover:bg-amber-500" 
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <IoChevronBackOutline size={18} /> Prev
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show limited page numbers with ellipsis
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-10 h-10 rounded ${
                      page === pageNum
                        ? "bg-amber-400 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              {totalPages > 5 && (
                <span className="px-2">...</span>
              )}
            </div>
            
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className={`py-2 px-4 flex items-center gap-1 rounded ${
                page < totalPages
                  ? "bg-amber-400 text-white hover:bg-amber-500"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Next <GrFormNext size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;