import React, { useEffect } from "react";
import Nav from "./component/Nav";
import Card_work from "./component/Card_work";
import Footer from "./component/Footer";
import { Outlet } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { fetchUserDetails } from "./utils/FetchUser";
import { setUserDetails } from "./store/userSlice";
import { setAllCategory, setAllSubCategory } from "./store/productSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import SummaryApi from "./comman/SummaryApi";
import { handleAddItemCart } from "./store/cartProduct";
import GlobalProvider from "./provider/GlobalProvider";

function App() {
  const dispatch = useDispatch();
  const fetchUser = async () => {
    const userData = await fetchUserDetails();

    if (userData) {
      // console.log("user Data ",userData.data.body )
      dispatch(setUserDetails(userData.data.body));
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axios[SummaryApi.AllCategory.method](
        SummaryApi.AllCategory.url
      );

      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllCategory(responseData.data));
      }
    } catch (error) {}
  };

  const fetchSubCategory = async () => {
    try {
      const response = await axios[SummaryApi.AllCategory.method](
        SummaryApi.Allsubcategory.url
      );

      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data));
      }
    } catch (error) {}
  };

  const fetchCart = async (req,res) => {
    try {
      const cart = await axios ({
        url:SummaryApi.getCartList.url,
        method:SummaryApi.getCartList.method,
         withCredentials: true 
      })
      dispatch(handleAddItemCart(cart.data.data || cart.data))
      console.log("cart" ,cart.data.data || cart.data)
    } catch (error) { 
      
    }
  }

  useEffect(() => {
    fetchCart()
    fetchUser();
    fetchCategory();
    fetchSubCategory();
  }, []);
  return (
    <GlobalProvider>
      <Nav />
      <Outlet />

      <Card_work />
      <Footer />
      <Toaster position="top-right" />
    </GlobalProvider>
  );
}

export default App;
