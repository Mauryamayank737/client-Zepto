import React from "react";
import { NavLink } from "react-router";
import { BsBagHeart } from "react-icons/bs";
import { BiSolidCoffeeTogo } from "react-icons/bi";
import { SiCcleaner } from "react-icons/si";
import { PiBird } from "react-icons/pi";
import { GiFruitTree } from "react-icons/gi";
import { FaHeadphones } from "react-icons/fa6";
import { FaMobileAlt } from "react-icons/fa";
import { RiBrushAiLine } from "react-icons/ri";
import { MdOutlineDiscount } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { TbBabyBottle } from "react-icons/tb";
const Categories = () => {
  return (
    <div className="md:w-[100%] m-auto shadow-md min-h-[50px] bg-white">
      <ul className="w-[95%] md:w-[85%] m-auto flex justify-evenly font-semibold flex-wrap items-center text-center ">
        <li>
          <BsBagHeart size={25}/> All
        </li>
        <li>
          <BiSolidCoffeeTogo size={25}/>
          Cafe
        </li>
        <li>
          <SiCcleaner size={25} />
          Home
        </li>
        <li>
          <PiBird size={25}/>
          Toy
        </li>
        <li>
          <GiFruitTree size={25} />
          fresh
        </li>
        <li>
          <FaHeadphones size={25} />
          Electronic
        </li>
        <li>
          <FaMobileAlt size={25}/>
          Mobile
        </li>
        <li>
          <RiBrushAiLine size={25}/>
          Beauty
        </li>
        <li>
          <MdOutlineDiscount size={25}/>
          Deal Zone
        </li>
        <li>
          <GiClothes size={25}/>
          Fashion
        </li>
        <li>
          <TbBabyBottle size={25} />
          Baby Store
        </li>
      </ul>
    </div>
  );
};

export default Categories;
