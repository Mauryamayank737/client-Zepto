import axios from "axios";
import { useEffect, useState } from "react";
import SummaryApi from "../comman/SummaryApi";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const getCart = async (req, res) => {
    try {
      const cart = await axios({
        url: SummaryApi.getCartList.url,
        method: SummaryApi.getCartList.method,
        withCredentials: true,
      });

      setCartData(cart.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getCart();
  }, []);

  console.log("cart data", cartData);
  return (
    <div className="bg-red-200 w-full z-200 flex justify-end">
      <div className="w-[500px] bg-white flex justify-center flex-col items-center gap-3  ">
        {cartData.map((data, index) => {
          return (
            <div className="py-3 my-2 shadow-2xl w-[90%] m-auto flex justify-center flex-col items-center border border-amber-200">
              {data.productId?.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
