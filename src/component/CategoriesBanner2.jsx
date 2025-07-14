import React from "react";
import CategoriesBannertype2 from "./CategoriesBannertype2";
import img from "../Images/categoriesBannerImg2.webp";
import BannerButton from "./BannerButton";
function CategoriesBanner2() {
  return (
    <div className="w-full min-h-[300px] flex justify-between items-center my-[40px] lg:px-[100px] md:px-[50px] px-[30px] bg-amber-200 rounded-t-4xl rounded-bl-4xl">
      <div className="flex flex-col gap-[24px] w-[30%] h-full">
        <img src={img} alt="" className="lg:w-[300px]" />
        <BannerButton />
      </div>
      <div className="w-[70%]">
        <CategoriesBannertype2 />
      </div>
    </div>
  );
}

export default CategoriesBanner2;
