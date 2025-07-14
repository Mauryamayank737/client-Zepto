import React from "react";

const BannerButton = ({ buttonStyle, content }) => {
  return (
    <div>
      <button
        className="md:px-[20px] py-[10px] px-[10px] max-w-[120px] lg:min-w-[200px] rounded-md text-[16px] lg:text-[24px] text-white font-bold cursor-pointer capitalize text-center "
        style={buttonStyle || { background: "black" }}
      >
        {content || "order Now"}
      </button>
    </div>
  );
};

export default BannerButton;
