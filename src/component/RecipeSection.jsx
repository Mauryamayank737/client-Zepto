import React from "react";
import img1 from "../Images/dish1.webp";
import img2 from "../Images/dish2.webp";
import img3 from "../Images/dish3.webp";
import img4 from "../Images/dish4.webp";
import img5 from "../Images/dish5.webp";
import img6 from "../Images/coffee6.webp";
import img7 from "../Images/coffee7.webp";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { PiCookingPot } from "react-icons/pi";
import { TbSquareDot } from "react-icons/tb";
import { FaLeaf } from "react-icons/fa"; // For veg
import { FaEgg } from "react-icons/fa"; // For non-veg

const RecipeSection = (props) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 900,
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
      },
    ],
  };

  return (
    <div className=" w-[95%] m-auto ">
      <h1>{props.name}</h1>
      <div className=" ">
        <Slider {...settings}>
          {data.map((d) => (
            <div className="w-[100%] min-h-[280px] m-auto ">
              <div className="w-full h-[250px] mt-2 relative">
                <img
                  src={d.image}
                  alt=""
                  className="w-[90%] h-full m-auto  rounded-xl  "
                />
              
                {d.productType == "veg" ? (
                  <div className="absolute bottom-[10px] left-[30px] flex gap-2 items-center font-semibold text-[16px] capitalize ">
                    <FaLeaf className="text-green-600" />
                    veg
                  </div>
                ) : (
                  <div className="absolute bottom-[10px] left-[30px] flex gap-2 items-center text-red-700 font-semibold text-[16px] capitalize">
                    <FaEgg className="text-red-600" />
                    non veg
                  </div>
                )}
              </div>
              <div className=" w-[90%] m-auto">
                <h2 className="text-start capitalize font-semibold">
                  {d.productName}
                </h2>
                <div className="flex gap-3 items-center">
                  <PiCookingPot />
                  <p>{d.time || 40} min</p>
                </div>
              </div>
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
    image: `${img1}`,
    categoies: "coffee",
    productName: "Malai kofta",
    size: "400ml",
    currentPrice: 149,
    originalPrice: 289,
    productType: "veg",
  },
  {
    id: 2,
    image: `${img2}`,
    categoies: "coffee",
    productName: "pav bahji",
    size: "250ml",
    currentPrice: 135,
    originalPrice: 279,
    time: 30,
    productType: "veg",
  },
  {
    id: 3,
    image: `${img3}`,
    categoies: "coffee",
    productName: "hulab jamun",
    size: "350ml",
    currentPrice: 169,
    originalPrice: 279,
    productType: "veg",
  },
  {
    id: 4,
    image: `${img4}`,
    categoies: "coffee",
    productName: "dal makhani",
    size: "400ml",
    currentPrice: 100,
    originalPrice: 120,
    productType: "veg",
  },
  {
    id: 5,
    image: `${img5}`,
    categoies: "coffee",
    productName: "samosa",
    size: "450ml",
    currentPrice: 139,
    originalPrice: 229,
    productType: "veg",
  },
  {
    id: 6,
    image: `${img6}`,
    categoies: "coffee",
    productName: "strawberry lemonade",
    size: "400ml",
    currentPrice: 100,
    originalPrice: 120,
    productType: "veg",
  },
  {
    id: 7,
    image: `${img7}`,
    categoies: "coffee",
    productName: "Americano",
    size: "250ml",
    currentPrice: 129,
    originalPrice: 264,
    productType: "veg",
  },
];
export default RecipeSection;
