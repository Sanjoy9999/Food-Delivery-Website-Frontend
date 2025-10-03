import React, { useEffect, useRef, useState } from "react";
import Nav from "./Nav";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaAnglesRight } from "react-icons/fa6";
import { categories } from "../category";
import CategoryCard from "./CategoryCard";
import { useSelector } from "react-redux";
import FoodCard from "./FoodCard";

function UserDashboard() {
  const { currentCity,shopInMyCity,itemsInMyCity } = useSelector((state) => state.user);
  const catScrollRef = useRef();
  const shopScrollRef = useRef();
  const [showLeftCateButton, setShowLeftCateButton] = useState(false);
  const [showRightCateButton, setShowRightCateButton] = useState(false);
  const [showLeftShopButton, setShowLeftShopButton] = useState(false);
  const [showRightShopButton, setShowRightShopButton] = useState(false);

  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction == "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current;

    if (element) {
      setLeftButton(element.scrollLeft > 0);
      // console.log("Scroll Left",element.scrollLeft)
      // console.log("Client width",element.clientWidth)

      // console.log("Scroll width",element.scrollWidth)

      setRightButton(
        element.scrollLeft + element.clientWidth < element.scrollWidth
      );
    }
  };

useEffect(() => {
  if (catScrollRef.current && shopScrollRef.current) {
    // Initial button state update
    updateButton(catScrollRef, setShowLeftCateButton, setShowRightCateButton);
    updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);
    
    // Define the handler functions so we can reference them when removing
    const catScrollHandler = () => {
      updateButton(catScrollRef, setShowLeftCateButton, setShowRightCateButton);
    };
    
    const shopScrollHandler = () => {
      updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);
    };
    
    // Add event listeners with the named functions
    catScrollRef.current.addEventListener("scroll", catScrollHandler);
    shopScrollRef.current.addEventListener("scroll", shopScrollHandler);
    
    // Clean up function
    return () => {
      if (catScrollRef.current) {
        catScrollRef.current.removeEventListener("scroll", catScrollHandler);
      }
      if (shopScrollRef.current) {
        shopScrollRef.current.removeEventListener("scroll", shopScrollHandler);
      }
    };
  }
}, [categories]);

  

  return (
    <>
      <div className="w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff0e8] overflow-y">
        <Nav />

        {/* Food Categories  */}
        <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
          <h1 className="text-gray-800 text-2xl sm:text-3xl">
            Inspiration for your first order
          </h1>

          <div className="w-full relative">
            {showLeftCateButton && (
              <button
                className="absolute left-0 lg:-left-10 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 hover:scale-110 transition-transform duration-300 cursor-pointer"
                onClick={() => scrollHandler(catScrollRef, "left")}
              >
                <FaAnglesLeft />
              </button>
            )}

            <div
              className="w-full flex overflow-x-auto gap-4 pb-2 "
              ref={catScrollRef}
            >
              {categories.map((cat, index) => (
                <CategoryCard key={index} name={cat.category} image={cat.image} />
              ))}
            </div>
            {showRightCateButton && (
              <button
                className="absolute right-0  lg:-right-10 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 hover:scale-110 transition-transform duration-300 cursor-pointer"
                onClick={() => scrollHandler(catScrollRef, "right")}
              >
                <FaAnglesRight />
              </button>
            )}
          </div>
        </div>

        {/* Shop according to your location  */}
        <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
          <h1 className="text-gray-800 text-2xl sm:text-3xl">
            Best shop in {currentCity}
          </h1>
          <div className="w-full relative">
            {showLeftShopButton && (
              <button
                className="absolute left-0 lg:-left-10 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 hover:scale-110 transition-transform duration-300 cursor-pointer"
                onClick={() => scrollHandler(shopScrollRef, "left")}
              >
                <FaAnglesLeft />
              </button>
            )}

            <div
              className="w-full flex overflow-x-auto gap-4 pb-2 "
              ref={shopScrollRef}
            >
              {shopInMyCity?.map((shop, index) => (
                <CategoryCard key={index} name={shop.name} image={shop.image}/>
              ))}
            </div>
            {showRightShopButton && (
              <button
                className="absolute right-0  lg:-right-10 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 hover:scale-110 transition-transform duration-300 cursor-pointer"
                onClick={() => scrollHandler(shopScrollRef, "right")}
              >
                <FaAnglesRight />
              </button>
            )}
          </div>
        </div>

        <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
          <h1 className="text-gray-800 text-2xl sm:text-3xl">
            Suggested food items
          </h1>
          <div className="w-full h-auto flex flex-wrap gap-[20px] justify-center">
            {itemsInMyCity?.map((item, index) => (
              <FoodCard key={index} data={item} />
            ))}
          </div>
        </div>

      </div>
    </>
  );
}

export default UserDashboard;
