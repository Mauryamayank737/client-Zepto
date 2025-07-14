import React from "react";
import { useSelector } from "react-redux";

const AdminPermission = ({ children }) => {
  const user = useSelector((state) => state.user);
  
  return (
    <>
      {user.role === "ADMIN" ? (
        <>{children}</>
      ) : (
        <p className="text-[24px] md:text-[32px] text-red-500 text-center font-bold capitalize py-5 lg:py-0 ">
         Access permission not granted
        </p>
      )}
    </>
  );
};

export default AdminPermission;