import React from "react";
import CategoriesBannerSlider from "./CategoriesBannerSlider";
import BannerButton from "./BannerButton";

const CategoriesBanner = ({ style, img, buttonStyle }) => {
  return (
    <div
      className="w-full m-auto min-h-[300px] flex justify-between items-center my-[40px] lg:px-[100px] md:px-[50px] px-[30px]"
      style={
        style || {
          background: "linear-gradient(to top, #ffe3c4, #fff9ed)",
          borderRadius: "4rem 4rem 0  4rem",
        }
      }
    >
      <div className="flex flex-col gap-[24px] w-[30%] h-full">
        <img src={img} alt="" className="lg:w-[300px]" />
        <BannerButton buttonStyle={buttonStyle} />
      </div>
      <div className="w-[70%]">
        <CategoriesBannerSlider />
      </div>
    </div>
  );
};

export default CategoriesBanner;
