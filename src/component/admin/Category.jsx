import React, { useEffect, useState } from "react";
import UploadCategoryModel from "./UploadCategoryModel";
import Loading from "./Loading";
import NoData from "./NoData";
import axios from "axios";
import SummaryApi from "../../comman/SummaryApi";
import EditCategory from "./EditCategory";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import ConfirmBox from "../ConfirmBox";

const Category = () => {
  const [addCategory, setAddCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [confirmBox, setConfirmBox] = useState({
    open: false,
    data: null
  });
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  });

  const allCategory = useSelector((state) => state.product.allCategory);

  const handleDelete = async () => {
    if (!confirmBox.data) return;
    
    try {
      setLoading(true);
      const response = await axios[SummaryApi.deleteCategory.method](
        SummaryApi.deleteCategory.url,
        { categoryId: confirmBox.data._id },
        { withCredentials: true }
      );
      toast.success("Category deleted successfully");
      // Update local state by filtering out the deleted item
      setCategoryData(prev => prev.filter(item => item._id !== confirmBox.data._id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete category");
    } finally {
      setLoading(false);
      setConfirmBox({ open: false, data: null });
    }
  };

  useEffect(() => {
    // Initialize with Redux data
    if (allCategory) {
      setCategoryData(allCategory);
    }
  }, [allCategory]);

  return (
    <section className="my-[30px] lg:my-[0px]">
      <div className="p-2 shadow-xl rounded-md mb-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Category</h1>
        <button
          className="px-5 py-2 border-2 border-amber-400 rounded-lg text-gray-500 cursor-pointer hover:bg-amber-400 hover:text-black transition-colors"
          onClick={() => setAddCategory(true)}
        >
          Add Category
        </button>
      </div>

      {!categoryData[0] && !loading && <NoData />}

      <div className="flex flex-wrap gap-3 lg:gap-6 justify-center">
        {categoryData.map((data, index) => (
          <div key={data._id || index} className="w-[150px]">
            <div className="w-full min-h-[200px] overflow-hidden flex flex-col justify-start items-center gap-3 bg-gray-200 shadow-md py-2 rounded-lg group">
              <img
                src={data.image}
                alt={data.name}
                className="w-[110px] h-[110px] md:w-[130px] md:h-[130px] rounded-full bg-white object-cover"
              />
              <h2 className="uppercase text-[16px] font-semibold text-center px-2">
                {data.name}
              </h2>
            </div>
            <div className="w-full flex my-3 items-center justify-between h-9">
              <button
                onClick={() => {
                  setOpenEdit(true);
                  setEditData(data);
                }}
                className="border-2 border-green-600 w-[47%] py-1 rounded-lg cursor-pointer hover:bg-green-600 hover:text-white transition-colors"
              >
                Edit
              </button>
              <button
                className="border-2 border-red-600 w-[47%] py-1 rounded-lg cursor-pointer hover:bg-red-600 hover:text-white transition-colors"
                onClick={() => setConfirmBox({ open: true, data })}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {loading && <Loading />}

      {addCategory && (
        <UploadCategoryModel close={() => setAddCategory(false)} />
      )}

      {openEdit && (
        <EditCategory
          data={editData}
          close={() => setOpenEdit(false)}
        />
      )}

      {confirmBox.open && (
        <ConfirmBox 
          close={() => setConfirmBox({ open: false, data: null })} 
          confirm={handleDelete}
        />
      )}
    </section>
  );
};

export default Category;