import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CategoriesSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 11,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 9,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const navigate = useNavigate()
  const allCategory = useSelector((state) => state.product.allCategory);
  const allSubCategory = useSelector((state) => state.product.allSubCategory);
  // console.log("subcategory",allSubCategory)

  const handleCategoryClick = (categoryId, categoryName) => {
    return () => {
      // Find first subcategory for this category
      const subcategory = allSubCategory.find((sub) => 
        sub.category[0]?._id === categoryId
      );

      // console.log(subcategory)
      
      if (subcategory) {
        navigate(`/${encodeURIComponent(categoryId)}/${encodeURIComponent(categoryName)}/All`);
      } else {
        // Fallback if no subcategory exists
        // navigate(`/${encodeURIComponent(categoryId)}`);
      }
    };
  };

  return (
    <div className="w-[90%] h-full mx-auto ">
      <Slider {...settings}>
        
{allCategory.map((data) => (
          <div
            key={data._id}
            className="flex justify-start items-start text-center w-[150px] h-fit cursor-pointer mx-5"
          >
            <div 
              className="flex flex-col justify-start py-2 items-center w-[130px] h-[180px] rounded-md hover:shadow-md transition-all"
              onClick={handleCategoryClick(data._id, data.name)}
            >
              <div className="bg-gray-200 p-2 rounded-lg">
                <img
                  src={data.image}
                  alt={data.name}
                  className="w-[90px] h-[90px] object-contain rounded-xl"
                />
              </div>
              <div className="uppercase font-semibold text-sm mt-2 text-center px-1 line-clamp-2">
                {data.name}
              </div>
            </div>
          </div>
        ))}
      
        
      </Slider>
    </div>
  );
}

export default CategoriesSlider;