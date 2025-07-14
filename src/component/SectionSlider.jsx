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
import ProductCard from "./ProductCard";
import { IoIosArrowForward } from "react-icons/io";

function SectionSlider(props) {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: true,
        },
      },

      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };
  const calculateDiscount = (original, current) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="w-full py-[20px] my-10">
      <div className="w-[95%] m-auto">
        <div className=" flex justify-between items-center">
          <h1>{props.name}</h1>
          <h2 className="text-red-500 text-[16px] font-semibold cursor-pointer flex items-center gap-3">See All <IoIosArrowForward /></h2>
        </div>
        <div className="w-full m-auto py-4 ">
          <Slider {...settings}>
            {data.map((d) => (
              <ProductCard
                img={d.image}
                name={d.productName}
                size={d.size}
                originalPrice={d.originalPrice}
                currentPrice={d.currentPrice}
                discountPercent={calculateDiscount(
                  d.originalPrice,
                  d.currentPrice
                )}
                time={d.time}
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
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
    time: "30 min",
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
export default SectionSlider;
