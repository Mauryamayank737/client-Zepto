import React from "react";
import PageBanner from "../component/PageBanner";
import bannerimage from "../Images/app.png";
import OfferCard from "../component/OfferCard";
import img1 from "../Images/offerCard.webp";
import img2 from "../Images/offerCard2.webp";
import CategoriesBanner from "../component/CategoriesBanner";
import SectionSlider from "../component/SectionSlider";
import Sectionbannerimage1 from "../Images/categoriesBannerImg.webp";
import Sectionbannerimage2 from "../Images/categoriesBannerImg2.webp";
import CategoriesBannertype2 from "../component/CategoriesBannertype2";
import CategoriesBanner2 from "../component/CategoriesBanner2";
import CategoriesCard from "../component/CategoriesCard";
import RecipeSection from "../component/RecipeSection";
import Nav from "../component/Nav";
import CategoriesBannerSlider from "../component/CategoriesBannerSlider";
import Ctegories_slider from "../component/Ctegories_slider";
import Categories from "../component/Categories";

import BannerImage from "../assets/bannerImage.webp";
import MobileBannerImage from "../assets/mobileBanner.webp";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CategoryWiseProductDisplay from "../component/CategoryWiseProductDisplay";

function Home() {
  const bannerStyles1 = {
    background: "linear-gradient(to top,#120000, #fff)",
    borderRadius: "4rem 4rem 0  4rem",
  };
  const OfferCardStyles1 = {
    background: "pink",
  };

  const allCategory = useSelector((state) => state.product.allCategory);
  return (
    <>
      <div className="h-[100%] ">
        {/* <Categories /> */}
        <Ctegories_slider />
        {/* page banner */}
        <div className="w-[90%] lg:w-[85%] m-auto">
          <div className="w-full h-[200px] lg:h-[250px] bg-gray-300 m-auto my-5 rounded-xl">
            <picture>
              {/*Mobile & Tablet */}
              <img
                src={MobileBannerImage}
                alt="Banner Image"
                className=" w-full h-full  md:block lg:hidden"
              />
              {/* Desktop */}
              <img
                src={BannerImage}
                alt="Banner Image"
                className="hidden w-full h-full object-cover lg:block"
              />
            </picture>
          </div>
          <div className="w-full flex justify-center gap-[20px] flex-wrap ">
            <OfferCard img={img1} />
            <OfferCard img={img2} style={OfferCardStyles1} />
          </div>

          {/* display category product */}

          {
            allCategory.map((data ,index)=>{
              return(
<CategoryWiseProductDisplay categoryData={data} key={index} />
              )
            })
          }
          

          {/*
          <CategoriesBanner img={Sectionbannerimage1} />
          <CategoriesBanner
            style={bannerStyles1}
            img={Sectionbannerimage2}
            buttonStyle={{ background: "#204049" }}
          />

          <CategoriesBanner2 />
          <SectionSlider name="coffee section" />
          <SectionSlider name="coffee section" />
          <SectionSlider name="other section" />

          <CategoriesCard name="coffee" />
          <CategoriesCard name="coffee" />
          <RecipeSection name="coffee" />
          <SectionSlider name="coffee section" />
          <SectionSlider name="coffee section" />
  */}
        </div>
      </div>
    </>
  );
}

export default Home;
