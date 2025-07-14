import React from "react";
import logo from "../Images/logo.png";
import playStore from "../Images/playStore.png";
import appStore from "../Images/appStore.png";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { RiFacebookFill, RiLinkedinFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const allCategory = useSelector((state) => state.product.allCategory);
  const allSubCategory = useSelector((state) => state.product.allSubCategory);

  // Static data for footer sections
  const popularProducts = [
    "Avocado", "Strawberry", "Pomegranate", "Beetroot", "Ash gourd", 
    "Bottle gourd", "Lady finger", "Potato", "Lemon", "Dalchini", 
    "Fennel seeds", "Blueberry", "Papaya", "Dragon fruit"
  ];

  const popularBrands = [
    "Yakult", "My Muse", "Aashirvaad Atta", "Too Yumm", "Lays", 
    "Figaro Olive Oil", "Nandini Milk", "Amul", "Mother Dairy Near Me", 
    "Fortune Oil"
  ];

  const footerLinks1 = [
    "home", "delivery areas", "careers", "customer support", "press"
  ];

  const footerLinks2 = [
    "privacy policy", "term of use", 
    "responsible disclosure policy", "mojo-a zepto blog"
  ];

  const allCategories = [
    "fruit And vegetables", "atta,rice,oil & dals", "Masala & Dry Fruits",
    "Sweet Cravings", "baby food", "dairy,bread & eggs",
    "Cold Drinks & Juices", "Tea Coffee & more", "home needs",
    "bath & body", "health & baby care", "paan corner"
  ];

  return (
    <footer className="bg-white text-gray-800">
      {/* Popular Searches Section */}
      <div className="w-[90%] lg:w-[80%] mx-auto my-5 py-5 border-b border-gray-300">
        <h2 className="text-lg font-semibold mb-3">Popular Searches</h2>
        
        <div className="mb-4">
          <span className="font-semibold">Products: </span>
          <span className="flex flex-wrap gap-1">
            {popularProducts.map((product, index) => (
              <span key={index} className="hover:text-primary cursor-pointer">
                {product}{index !== popularProducts.length - 1 ? " |" : ""}
              </span>
            ))}
          </span>
        </div>

        <div className="mb-4">
          <span className="font-semibold">Brands: </span>
          <span className="flex flex-wrap gap-1">
            {popularBrands.map((brand, index) => (
              <span key={index} className="hover:text-primary cursor-pointer">
                {brand}{index !== popularBrands.length - 1 ? " |" : ""}
              </span>
            ))}
          </span>
        </div>

        <div className="mb-4">
          <span className="font-semibold">All Categories: </span>
          <span className="flex flex-wrap gap-1">
            {allCategory.map((category, index) => (
              <span key={category._id} className="hover:text-primary cursor-pointer">
                {category.name}{index !== allCategory.length - 1 ? "," : ""}
              </span>
            ))}
          </span>
        </div>

        
      </div>

      {/* Footer Links Section */}
      <div className="w-[90%] lg:w-[80%] mx-auto py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="space-y-4">
          <Link to="/">
            <img src={logo} alt="Company Logo" className="w-40 h-auto" />
          </Link>
          <div className="flex space-x-4 text-gray-500">
            <a href="#" className="hover:text-primary">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="hover:text-primary">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="hover:text-primary">
              <RiFacebookFill size={24} />
            </a>
            <a href="#" className="hover:text-primary">
              <RiLinkedinFill size={24} />
            </a>
          </div>
          <p className="text-gray-500">
            © KiranaKart Technologies Private Limited
          </p>
        </div>

        {/* Quick Links 1 */}
        <div>
          <h3 className="font-semibold mb-4 uppercase">Quick Links</h3>
          <ul className="space-y-2">
            {footerLinks1.map((link, index) => (
              <li key={index}>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-primary capitalize"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links 2 */}
        <div>
          <h3 className="font-semibold mb-4 uppercase">Policies</h3>
          <ul className="space-y-2">
            {footerLinks2.map((link, index) => (
              <li key={index}>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-primary capitalize"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* App Download */}
        <div className="space-y-4">
          <h3 className="font-semibold uppercase">Download App</h3>
          <a 
            href="#" 
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:border-primary transition"
          >
            <img src={playStore} alt="Play Store" className="w-8 h-8 mr-2" />
            <span>Get it on Play Store</span>
          </a>
          <a 
            href="#" 
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:border-primary transition"
          >
            <img src={appStore} alt="App Store" className="w-8 h-8 mr-2" />
            <span>Download on App Store</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;