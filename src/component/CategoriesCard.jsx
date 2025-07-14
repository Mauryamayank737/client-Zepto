import React from "react";
import img1 from "../Images/coffee1.webp";
import img2 from "../Images/coffee2.webp";
import img3 from "../Images/coffee3.webp";
import img4 from "../Images/coffee4.webp";
import img5 from "../Images/coffee5.webp";
import img6 from "../Images/coffee6.webp";
import img7 from "../Images/coffee7.webp";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const CategoriesCard = (props) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },


      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },]
  };
  return (
    <div className=" w-full ">
      <div>
        <h1 className="w-[95%] m-auto">{props.name}</h1>

        <div className=" flex gap-4 py-[20px] overflow-hidden ">
        <div className="w-[90%] m-auto ">
        <Slider {...settings}>
          {data.map((d) => (
            <div className="text-center md:w-[200px] cursor-pointer">
              <div className="w-[150px] h-[150px] rounded-4xl overflow-hidden m-auto my-2">
                <img
                  src={d.image}
                  alt=""
                  className="w-full h-full bg-amber-950  transform-cpu hover:scale-[1.2] transition duration-900"
                />
              </div>
              <div className="w-[90%] m-auto">
                <h2 className="font-semibold md:text-[25px] text-gray-700 capitalize">{d.productName}</h2>
              </div>
            </div>
          ))}
          </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};
const data = [
  {
    id: 1,
    image: `${img1}`,
    categoies: "coffee",
    productName: "Iced cappucino",
    size: "400ml",
    currentPrice: 149,
    originalPrice: 289,
  },
  {
    id: 2,
    image: `${img2}`,
    categoies: "coffee",
    productName: "Hot Chocolate",
    size: "250ml",
    currentPrice: 135,
    originalPrice: 279,
    time: 30,
  },
  {
    id: 3,
    image: `${img3}`,
    categoies: "coffee",
    productName: "Hazelnut cold coffee",
    size: "350ml",
    currentPrice: 169,
    originalPrice: 279,
  },
  {
    id: 4,
    image: `${img4}`,
    categoies: "coffee",
    productName: "Hazelnut cold coffee",
    size: "400ml",
    currentPrice: 100,
    originalPrice: 120,
  },
  {
    id: 5,
    image: `${img5}`,
    categoies: "coffee",
    productName: "strawberry lemonade",
    size: "450ml",
    currentPrice: 139,
    originalPrice: 229,
  },
  {
    id: 6,
    image: `${img6}`,
    categoies: "coffee",
    productName: "strawberry lemonade",
    size: "400ml",
    currentPrice: 100,
    originalPrice: 120,
  },
  {
    id: 7,
    image: `${img7}`,
    categoies: "coffee",
    productName: "Americano",
    size: "250ml",
    currentPrice: 129,
    originalPrice: 264,
  },
];

export default CategoriesCard;
