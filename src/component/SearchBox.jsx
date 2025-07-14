import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { CiSearch } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router";

function SearchBox() {
    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage ,setIsSearchPage] = useState(false)

    useEffect(()=>{
        const isSearch = location.pathname ==="/search"
        setIsSearchPage(isSearch)

    },[location])

    const redirectToSearchPage = ()=>{
        navigate('/search')
        console.log(location)
    }
  return (
    <>
      <div className="w-full flex gap-3 border-1 border-gray-400 px-4 py-2 rounded-lg bg-white h-full items-center">
      <CiSearch size={22} />
       <div className="w-full">{
        !isSearchPage?(
            <div className="w-full" onClick={redirectToSearchPage}>
                <TypeAnimation
        sequence={[
          "Search for 'milk' ",
          1000,
          "Search for 'coffee' ",
          1000,
          "Search for 'atta' ",
          1000,
          "Search for 'apple juice' ",
          1000,
          "Search for 'butter' ",
          1000,
          "Search for 'vegitables' ",
          1000,
          "Search for 'juice' ",
          1000,
        ]}
        wrapper="span"
        speed={50}
        style={{ display: "inline-block" }}
        repeat={Infinity}
        className="text-gray-400 capitalize "
      />
            </div>
        ):(
            <div className="w-full ">
                <input type="text" placeholder="Search Atta Dal and more" className="w-full outline-0" />
            </div>
        )
        }

       </div>
      </div>
      
    </>
  );
}

export default SearchBox;
