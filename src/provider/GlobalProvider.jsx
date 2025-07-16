import axios from "axios";
import { createContext, useContext, useEffect } from "react";
import SummaryApi from "../comman/SummaryApi";
import { handleAddItemCart } from "../store/cartProduct";
import { useDispatch } from "react-redux";

export const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatchEvent = useDispatch();
  const fetchCart = async (req, res) => {
    try {
      const cart = await axios({
        url: SummaryApi.getCartList.url,
        method: SummaryApi.getCartList.method,
        withCredentials: true,
      });
      dispatchEvent(handleAddItemCart(cart.data.data || cart.data));
      console.log("cart", cart.data.data || cart.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchCart();
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        fetchCart,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
