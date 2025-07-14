import React from "react";
import img1 from "../Images/coffee1.webp";
import img2 from "../Images/coffee2.webp";
import img3 from "../Images/coffee3.webp";
import img4 from "../Images/coffee4.webp";
import img5 from "../Images/coffee5.webp";
import img6 from "../Images/coffee6.webp";
import img7 from "../Images/coffee7.webp";
import BannerCard2 from "./BannerCard2";

function CategoriesBannertype2() {
  return <div className="flex flex-wrap gap-4 justify-center items-start">{data.map((d,index)=>(
    <div key={index} >
        <BannerCard2 img={d.image}
              name={d.productName}/>
    </div>
  ))}</div>;
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
    id: 7,
    image: `${img7}`,
    categoies: "coffee",
    productName: "Americano",
    size: "250ml",
    currentPrice: 129,
    originalPrice: 264,
  },
];

export default CategoriesBannertype2;
