import React from "react";
import img1 from "../Images/sliderimg1.png";
import img2 from "../Images/sliderimg2.png";
import img3 from "../Images/sliderimg3.png";
import img4 from "../Images/sliderimg4.png";
import img5 from "../Images/sliderimg5.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const OfferCardSlider = (props) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },]
  };
  return (
    <div className={`flex items-center justify-center w-[90%] h-full m-auto`}>
       <div className="w-full m-auto slider ">
       <Slider {...settings}>
      {data.map((data) => (
        <div className="flex flex-col justify-evenly items-center w-[130px] h-[180px] rounded-md cursor-pointer
        ">
          <img
            src={data.img}
            alt=""
            className="p-[10px] rounded-xl w-full h-[130px] md:h-[150]"
          />
        </div>
      ))}
      </Slider>
      </div>
    </div>
  );
};

const data = [
  {
    id: 1,
    img: `${img1}`,
  },
  {
    id: 2,
    img: `${img2}`,
  },
  {
    id: 3,
    img: `${img3}`,
  },
  {
    id: 4,
    img: `${img4}`,
  },
  {
    id: 5,
    img: `${img5}`,
  },
];

export default OfferCardSlider;
