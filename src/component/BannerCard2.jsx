import React from "react";

const BannerCard2 = (props) => {
  return (
    <div className=" flex flex-col items-center justify-center gap-[10px] py-[10px] lg:w-[130px] w-[120px] text-center min-h-[150px] cursor-pointer bg">
      <div className=" w-[80px] h-[80px]
        lg:w-[100px] lg:h-[100px] rounded-full overflow-hidden bg-green-300 border-1 border-gray-200">
      <img
        src={props.img}
        alt=""
        className="w-full h-full transform-cpu hover:scale-[1.2] transition duration-900 "
      />
      </div>
      <div className="text-[16px] font-semibold capitalize">
        <h2>{props.name}</h2>
      </div>
      
    </div>
  );
};

export default BannerCard2;
