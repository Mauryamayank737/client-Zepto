import React, { useEffect, useState } from "react";
import UploadSubCategoryModel from "./UploadSubCategoryModel";
import axios from "axios";
import SummaryApi from "../../comman/SummaryApi";
import toast from "react-hot-toast";
import DisplayTable from "../DisplayTable";
import { createColumnHelper } from "@tanstack/react-table";
import ViewImage from "./ViewImage";
import EditSubCategory from "./EditSubCategory";
import ConfirmBox from "../ConfirmBox";
import { useSelector } from "react-redux";

const Sub_category = () => {
  const [openAddSubCategory, setOpenSubCategory] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columnHelper = createColumnHelper();
  const [viewImage, setViewImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [editSubCategory, setEditSubCategory] = useState(false);
  const [confirmBox, setConfirmBox] = useState({
    open: false,
    id: null
  });
  const [editData, setEditData] = useState({
    _id: "",
    name: "",
    image: "",
    category: []
  });

  const columns = [
    columnHelper.display({
      id: "serialNo",
      header: "S.No",
      cell: ({ row }) => row.index + 1,
    }),
    columnHelper.accessor("name", {
      header: "Sub Category Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("category", {
      header: "Parent Category",
      cell: (info) => {
        const categories = info.getValue();
        return categories?.map((cat) => cat.name).join(", ") || "N/A";
      },
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: (info) => {
        const imageUrl = info.getValue();
        return imageUrl ? (
          <div className="flex justify-center items-center">
            <img
              src={imageUrl}
              alt="Sub Category"
              className="w-13 h-13 object-cover rounded cursor-pointer"
              onClick={() => {
                setImageUrl(imageUrl);
                setViewImage(true);
              }}
            />
          </div>
        ) : (
          "No Image"
        );
      },
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => {
              setEditData(row.original);
              setEditSubCategory(true);
            }}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => setConfirmBox({
              open: true,
              id: row.original._id
            })}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      ),
    }),
  ];

  const handleDelete = async () => {
    try {
      await axios[SummaryApi.deleteSubCategory.method](
        SummaryApi.deleteSubCategory.url,
        { subCategoryId: confirmBox.id },
        { withCredentials: true }
      );
      toast.success("Sub-category deleted successfully");
      fetchSubCategory();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete sub-category"
      );
    } finally {
      setConfirmBox({ open: false, id: null });
    }
  };

  const fetchSubCategory = async () => {
    setLoading(true);
    try {
      const response = await axios[SummaryApi.Allsubcategory.method](
        SummaryApi.Allsubcategory.url,
        { withCredentials: true }
      );
      setData(response.data.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch sub-categories");
    } finally {
      setLoading(false);
    }
  };

  const handleSubCategoryAdded = () => {
    fetchSubCategory();
    setOpenSubCategory(false);
  };

  const handleSubCategoryUpdated = () => {
    fetchSubCategory();
    setEditSubCategory(false);
  };

  useEffect(() => {
    fetchSubCategory();
  }, []);

  return (
    <div className="p-4">
      <section className="mb-6">
        <div className="p-4 shadow-md rounded-lg mb-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Sub Categories</h1>
          <button
            className="px-5 py-2 border-2 border-amber-400 rounded-lg text-gray-600 hover:bg-amber-400 hover:text-white transition-colors"
            onClick={() => setOpenSubCategory(true)}
          >
            Add Sub Category
          </button>
        </div>
      </section>

      <div className="bg-white rounded-lg shadow-md p-4 overflow-auto">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <DisplayTable data={data} columns={columns} />
        )}
      </div>

      {openAddSubCategory && (
        <UploadSubCategoryModel
          close={() => setOpenSubCategory(false)}
          onSuccess={handleSubCategoryAdded}
        />
      )}

      {viewImage && (
        <ViewImage 
          url={imageUrl}  
          close={() => setViewImage(false)} 
        />
      )}

      {editSubCategory && (
        <EditSubCategory 
          data={editData} 
          close={() => setEditSubCategory(false)}
          onSuccess={handleSubCategoryUpdated}
          fetchData={fetchSubCategory}
        />
      )}

      {confirmBox.open && (
        <ConfirmBox 
          close={() => setConfirmBox({ open: false, id: null })} 
          confirm={handleDelete}
        />
      )}
    </div>
  );
};

export default Sub_category;