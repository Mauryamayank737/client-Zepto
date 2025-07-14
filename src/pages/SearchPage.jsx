import BannerImage from "../assets/bannerImage.webp";
import MobileBannerImage from "../assets/mobileBanner.webp";
function SearchPage() {
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
      
    </>
  );
}

export default SearchPage;
