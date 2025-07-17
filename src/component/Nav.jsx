// Nav.js (updated full code)
import React, { useState, useCallback, useEffect } from "react";
import logo from "../Images/logo.png";
import { CiSearch, CiCircleRemove } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdMyLocation, MdOutlineArrowDropDown } from "react-icons/md";
import { IoMdArrowDropup } from "react-icons/io";
import { TiShoppingCart } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBox from "./SearchBox";
import UserProfile from "./UserProfile";
import AdminProfile from "./admin/AdminProfile";
import { DisplayPriceRupee } from "../utils/DisplayPriceRupee";
import axios from "axios";
import SummaryApi from "../comman/SummaryApi";
import { useGlobalContext } from "../provider/GlobalProvider";
import toast from "react-hot-toast";

function Nav() {
  const [location, setLocation] = useState(false);
  const [userProfile, setUserProfile] = useState(false);
  const [locationData, setLocationData] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [cartSection, setCartSection] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const cartItem = useSelector((state) => state?.cartItem.cart);
  const { fetchCart } = useGlobalContext();

  const apiEndPoint = "https://api.opencagedata.com/geocode/v1/json";
  const apiKey = "b5a4b8f5f9494d33bf2fb76e5906a6db";

  const getUserCurrentLocation = useCallback(async (latitude, longitude) => {
    try {
      setLoadingLocation(true);
      const query = `${latitude}%2C+${longitude}`;
      const response = await fetch(`${apiEndPoint}?q=${query}&key=${apiKey}&pretty=1`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setLocationData(data.results[0]);
      }
    } catch (error) {
      console.error("Location error:", error);
    } finally {
      setLoadingLocation(false);
    }
  }, []);

  const handleCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getUserCurrentLocation(latitude, longitude);
        },
        (error) => console.error("Location access error:", error)
      );
    } else {
      console.log("Geolocation not supported.");
    }
  }, [getUserCurrentLocation]);

  const toggleUserProfile = useCallback(() => setUserProfile((prev) => !prev), []);
  const closeLocationModal = useCallback(() => { setLocation(false); setLocationData(null); }, []);

  useEffect(() => {
    const qty = cartItem.reduce((pre, cur) => pre + cur.quantity, 0);
    const price = cartItem.reduce((pre, cur) => pre + cur.productId.currentPrice * cur.quantity, 0);
    setTotalQty(qty);
    setTotalPrice(price);
  }, [cartItem]);

  const handleAddToCart = async (productId) => {
    try {
      const response = await axios({
        url: SummaryApi.addcart.url,
        method: SummaryApi.addcart.method,
        data: { productId },
        withCredentials: true,
      });
      if (response.data.success) {
        fetchCart();
        toast.success(response.data.message || "Added to cart");
      }
    } catch (error) {
      toast.error("Failed to add item");
    }
  };

  const handleDecrement = async (productId) => {
    try {
      const response = await axios({
        url: SummaryApi.decrement.url,
        method: SummaryApi.decrement.method,
        data: { productId },
        withCredentials: true,
      });
      if (response.data.success) {
        fetchCart();
        toast.success(response.data.message || "Item removed");
      }
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  function calculateTax(amount, options = {}) {
    const { rate = 18, type = "gst", inclusive = false, roundTo = 2 } = options;
    const round = (value) => Number(value.toFixed(roundTo));
    let tax, total;
    if (inclusive) {
      tax = round((amount * rate) / (100 + rate));
      amount = round(amount - tax);
    } else {
      tax = round((amount * rate) / 100);
      amount = round(amount);
    }
    total = round(amount + tax);
    return { amount, tax, total, rate };
  }

  return (
    <>
      <div className="bg-gradient-to-b from-[#e2caf2f9] to-[#fff] w-full h-[120px] lg:h-[80px] pt-5 sticky top-0 z-20">
        <div className="lg:w-[90%] w-[90%] h-[60px] flex items-center justify-between gap-[15px] m-auto">
          <div className="w-[180px] h-full cursor-pointer flex justify-center items-center">
            <Link to="/">
              <img
                src={logo}
                alt="Company Logo"
                className="w-[180px] h-[30px]"
              />
            </Link>
          </div>

          <div>
            <button className="w-full" aria-label="Super saver toggle">
              <div className="h-[44px] rounded-full border border-gray-200 py-1 px-[5px] w-[120px] md:flex hidden">
                <div className="relative flex h-full w-full cursor-pointer items-center rounded-full p-0.5 transition-all bg-slate-300">
                  <div className="h-8 w-8 rounded-full shadow-md transition-transform duration-[0.5s] ease-in-out translate-x-0 bg-white" />
                  <img
                    alt="super-saver"
                    loading="lazy"
                    width={44}
                    height={26}
                    decoding="async"
                    className="relative overflow-hidden h-[26px] w-11 left-5"
                    src="https://www.zeptonow.com/images/super-saver/super-saver-inactive.svg"
                    style={{ color: "transparent", objectFit: "contain" }}
                  />
                </div>
              </div>
            </button>
          </div>

          {/* Location Section */}
          <div
            className="w-[260px] h-full items-center justify-between cursor-pointer hidden md:flex"
            onClick={() => setLocation(true)}
            aria-label="Select location"
          >
            <h2>Select Location</h2>
            <RiArrowDropDownLine size={22} />
          </div>

          {/* Search section */}
          <div className="md:flex w-full hidden">
            <SearchBox />
          </div>

          {/* User profile or login section */}
          {user._id ? (
            <div className="min-w-[40px] md:min-w-[100px] min-h-[40px] relative flex items-center justify-center cursor-pointer">
              <div
                onClick={toggleUserProfile}
                className="flex items-center gap-1"
              >
                <h2 className="text-[16px] font-[400]">Account</h2>
                {!userProfile ? (
                  <MdOutlineArrowDropDown size={22} />
                ) : (
                  <IoMdArrowDropup size={22} />
                )}
              </div>
              {userProfile && (
                <div className="absolute top-23 right-0 md:top-12 md:right-[-20px] bg-white w-[90vw] md:w-[300px] min-h-[200px] z-20 shadow-2xl rounded-lg flex justify-center items-center py-3">
                  {user.role === "ADMIN" ? <AdminProfile /> : <UserProfile />}
                </div>
              )}
            </div>
          ) : (
            <div>
              <Link
                to="/login"
                className="flex flex-col justify-center items-center cursor-pointer"
                aria-label="Login"
              >
                <FaRegUserCircle className="w-[20px] h-[20px]" />
                <p>Login</p>
              </Link>
            </div>
          )}

          {/* Cart section */}
          <div
            className="justify-center items-center min-w-[150px] py-2 gap-2 cursor-pointer md:flex hidden bg-[#6f22fe] text-white rounded-md relative"
            onClick={() => setCartSection(true)}
            aria-label="Shopping cart"
          >
            <TiShoppingCart size={30} className="animate-bounce" />
            <div className="flex">
              {cartItem[0] ? (
                <div className="flex flex-col justify-center items-center">
                  <p>{totalQty} Products</p>
                  <p>{DisplayPriceRupee(totalPrice)}</p>
                </div>
              ) : (
                "My cart"
              )}
            </div>
          </div>
        </div>

        <div className="md:hidden w-[95%] h-[40px] m-auto">
          <SearchBox />
        </div>
      </div>

      {/* Location card section */}
      {location && (
        <div className="fixed inset-0 bg-[#00000075] flex items-center justify-center z-50">
          <div className="h-[400px] w-full md:w-[600px] shadow-2xl flex flex-col items-center gap-2 py-[20px] px-[20px] bg-white rounded-lg relative">
            <CiCircleRemove
              className="absolute top-[10px] right-[20px] w-[20px] h-[20px] cursor-pointer"
              onClick={closeLocationModal}
              aria-label="Close location modal"
            />
            <div className="border-b-2 border-b-gray-200 py-1 w-full">
              <h1 className="text-[16px] font-bold tracking-[2px] text-center">
                Your Location
              </h1>
            </div>
            <div className="flex gap-3 px-[20px] py-[10px] w-[100%] rounded-lg bg-gray-200 items-center">
              <CiSearch className="w-[20px] h-[20px] font-bold" />
              <input
                type="text"
                placeholder="Search A New Location"
                className="w-full outline-0 border-0 placeholder:text-gray-500 placeholder:text-[12px] placeholder:tracking-[1px]"
                aria-label="Search location input"
              />
            </div>

            {loadingLocation ? (
              <div className="flex justify-center items-center h-20">
                <p>Loading location...</p>
              </div>
            ) : locationData ? (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg w-full">
                <h3 className="font-bold">Detected Location:</h3>
                <p>{locationData.formatted}</p>
              </div>
            ) : (
              <div className="flex items-center justify-start gap-[20px] w-full mt-[20px]">
                <div>
                  <MdMyLocation className="text-red-500 w-[20px] h-[20px]" />
                </div>
                <div>
                  <h1 className="text-red-500 font-bold">Current Location</h1>
                  <p className="text-[14px] text-gray-500 font-semibold">
                    Enable your current location for better services
                  </p>
                </div>
                <div>
                  <button
                    className="border-2 border-gray-400 text-red-500 py-1 px-3 cursor-pointer rounded-md hover:bg-red-50 transition-colors"
                    onClick={handleCurrentLocation}
                    disabled={loadingLocation}
                  >
                    {loadingLocation ? "Detecting..." : "Enable"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* cart section */}

       {cartSection && (
        <div className="fixed inset-0 bg-[#000000c6] flex justify-end z-50">
          <div className="w-[600px] bg-white flex flex-col gap-3  overflow-y-scroll">
            <div className="w-[100%] m-auto flex justify-between sticky py-10 px-5 top-0 bg bg-white"
>
              <h1>Total Products: {cartItem.length}</h1>
              <CiCircleRemove onClick={() => setCartSection(false)} size={22} className="cursor-pointer" />
            </div>
            {cartItem.map((data, index) => (
              <div key={index} className="shadow p-4 border border-gray-200 rounded w-[90%] mx-auto">
                <div className="flex items-center gap-4">
                  <img src={data.productId.image[0]} alt="" className="w-16 h-16 rounded" />
                  <div className="flex-1">
                    <h2 className="font-semibold line-clamp-1">{data.productId.name}</h2>
                    <p className="text-sm text-gray-500">{data.productId.unit}</p>
                    <p className="text-sm font-semibold">Price: {DisplayPriceRupee(data.productId.currentPrice)}</p>
                    <p className="text-sm font-semibold">Qty: {data.quantity}</p>
                    <p className="text-sm font-semibold">Total: {DisplayPriceRupee(data.productId.currentPrice * data.quantity)}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleDecrement(data.productId._id)} className="bg-purple-500 text-white px-2 py-1 rounded">-</button>
                    <span className="px-2">{data.quantity}</span>
                    <button onClick={() => handleAddToCart(data.productId._id)} className="bg-purple-500 text-white px-2 py-1 rounded">+</button>
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-gray-100 w-[90%] mx-auto p-4 rounded text-sm font-semibold">
              <p>Total Items: {cartItem.length}</p>
              <p>Total Quantity: {totalQty}</p>
              <p>Total Price: {DisplayPriceRupee(totalPrice)}</p>
              <p>Tax: {DisplayPriceRupee(calculateTax(totalPrice).tax)}</p>
              <p>Grand Total: {DisplayPriceRupee(calculateTax(totalPrice).total)}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default React.memo(Nav);
