import React, { useState } from "react";
import ConfirmBox from "../ConfirmBox";
import SummaryApi from "../../comman/SummaryApi";
import axios from "axios";
import toast from "react-hot-toast";
import EditProduct from './EditProduct';
import { NavLink } from "react-router-dom";

const ProductAdminCard = ({ data, setEditData }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmBox, setConfirmBox] = useState({
    open: false,
    data: null,
  });

  const handleDelete = async () => {
    if (!confirmBox.data) return;

    try {
      setLoading(true);
      await axios[SummaryApi.DeleteProduct.method](
        SummaryApi.DeleteProduct.url,
        { productId: confirmBox.data._id },
        { withCredentials: true }
      );
      toast.success("Product deleted successfully");
      // You should notify parent to re-fetch data
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete product"
      );
    } finally {
      setLoading(false);
      setConfirmBox({ open: false, data: null });
    }
  };

  return (
    <div className="w-40 md:w-50 flex flex-col gap-1 bg-white p-2 text-[12px] md:text-[16px] rounded shadow relative">
      <img
        src={data.image[0]}
        alt={data.name}
        className="w-full h-40 object-center md:object-cover rounded-xl"
      />
      <h2 className="text-ellipsis line-clamp-1 font-medium capitalize">{data.name}</h2>

      <div>
        <p className="flex gap-1 font-semibold">
          Price: &#8377;<del>{data.originalPrice}</del> {data.currentPrice}
        </p>
      </div>

      <div>
        <p className="md:text-[16px] capitalize font-semibold mb-[2px]">
          Description:
        </p>
        <p className="text-ellipsis line-clamp-2">{data.description}</p>
      </div>

      <div className="flex justify-start items-center gap-2">
        <p className="md:text-[16px] capitalize font-semibold mb-[2px]">Unit:</p>
        <p>{data.unit}</p>
      </div>

      {/* Always visible buttons */}
      <div className="w-full flex items-center justify-between gap-2 mt-2">
        <NavLink 
          to={`/dashboard/product/view/${data._id}`} 
          className="w-full"
        >
          <button className="w-full border-2 border-green-600 py-1 rounded-lg cursor-pointer hover:bg-green-600 hover:text-white transition-colors">
            View
          </button>
        </NavLink>
        
        <button
          className="w-full border-2 border-red-600 py-1 rounded-lg cursor-pointer hover:bg-red-600 hover:text-white transition-colors"
          onClick={() => setConfirmBox({ open: true, data })}
        >
          Delete
        </button>
      </div>

      {/* Confirm Delete */}
      {confirmBox.open && (
        <ConfirmBox
          close={() => setConfirmBox({ open: false, data: null })}
          confirm={handleDelete}
        />
      )}

      {openEdit && <EditProduct data={data} close={() => setOpenEdit(false)} />}
    </div>
  );
};

export default ProductAdminCard;