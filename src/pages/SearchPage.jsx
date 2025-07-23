import { useState } from "react";
import BannerImage from "../assets/bannerImage.webp";
import MobileBannerImage from "../assets/mobileBanner.webp";
import { useEffect } from "react";
import axios from "axios";
import SummaryApi from "../comman/SummaryApi";
import ProductCard1 from "../component/ProductCard";
import LoadingCard from '../component/LoadingCard'
function SearchPage() {
  const [productData, setProductData] = useState([]);
  const [search ,setSearch] = useState("")
  const [loading ,setLoading] = useState(false)

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await axios({
        method: SummaryApi.list.method,
        url: SummaryApi.list.url, 
        data: {}, 
      });
      setProductData(response.data.data)
    } catch (error) {}finally{
      setLoading(false)
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <>
      <div className="w-[90%] lg:w-[85%] m-auto  h-[200px] lg:h-[250px] bg-gray-300 my-5 rounded-xl">
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

     <div className="w-[90%] lg:w-[80%] m-auto  flex justify-center lg:justify-start gap-1 lg:gap-3 flex-wrap">
       {productData.map((data,index)=>{
        return(
          <ProductCard1 data={data } key={index} />
        )
      })}
      {loading && 
      (
       [...Array(10)].map((_, index) => (
                  <LoadingCard key={index} />
                ))
      )
      }
     </div>
    </>
  );
}

export default SearchPage;
