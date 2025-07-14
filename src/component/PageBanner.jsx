import React from "react";
import BannerButton from "./BannerButton";

const PageBanner = (props) => {
  return (
    <div className="w-full min-h-[200px] bg-gradient-to-r from-[#1acb76f9] via-[#7cda89] to-[#71d3a4f9]  m-auto rounded-t-3xl rounded-l-3xl flex justify-center items-center px-[20px] relative overflow-hidden cursor-pointer my-[20px]">
      <div className="w-[50%] h-full flex flex-col  justify-center gap-2 lg:px-[30px] ">
        <h2
          className="capitalize
              text-[40px]  lg:text-[60px] font-bold text-white leading-[40px] lg:leading-[60px]"
        >
          {props.header}
        </h2>
        <p className=" text-[16px] lg:text-[25px] capitalize text-white">
          {props.pera}
        </p>
        <BannerButton
          content="see all"
          buttonStyle={{
            background: "black",
          }}
        />
      </div>
      <div className="w-[50%] h-full ">
        <img
          src={props.image}
          alt=""
          className=" absolute bottom-[0px] right-[0px] w-[50%] h-full"
        />
      </div>
    </div>
  );
};

export default PageBanner;
