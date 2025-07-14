import React from "react";
import { IoInformation } from "react-icons/io5";
import app from "../Images/app.png";
import bag from "../Images/bag.png";
import delivery from "../Images/fast_delivery.png";

function Card_work() {
  return (
    <>
      <h2 className="text-center text-[30px] font-semibold pb-[20px]">
        How it Works
      </h2>
      <div className="flex w-[95%] m-auto justify-center items-center gap-[20px] flex-wrap">
        {data.map((d ,index) => (
          <div key={index} className="w-[300px] min-h-[300px] rounded-md flex flex-col justify-center items-center text-center px-[30px] cursor-pointer shadow-xl bg-gray-200
          ">
            <div>
              <img src={d.image} alt="" className="w-[150px] h-[120px]" />
            </div>
            <div>
              <h1>{d.heading}</h1>
              <p>{d.information}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
const data = [
  {
    id: 1,
    image: `${app}`,
    heading: "Open the app",
    information:
      "Choose from over 7000 products across groceries, fresh fruits & veggies, meat, pet care, beauty items & more",
  },
  {
    id: 2,
    image: `${delivery}`,
    heading: "Place an order",
    information: "Add your favourite items to the cart & avail the best offers",
  },
  {
    id: 3,
    image: `${bag}`,
    heading: "Get free delivery",
    information:
      "Experience lighting-fast speed & get all your items delivered in 10 minutes",
  },
];

export default Card_work;
