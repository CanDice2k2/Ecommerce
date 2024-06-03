import React from "react";
import HomeCarousel from "../customer/Components/Carousel/HomeCarousel";
import { homeCarouselData } from "../customer/Components/Carousel/HomeCaroselData";
import HomeProductSection from "../customer/Components/Home/HomeProductSection";
import { donghoNam } from "../Data/Men/donghoNam.js";
import { thunNam } from "../Data/Men/thunNam.js";
import { aothunNu } from "../Data/Women/aothunNu.js";

const Homepage = () => {

  return (
    <div className="">
      <HomeCarousel images={homeCarouselData} />

      <div className="space-y-10 py-20">
      <HomeProductSection data={thunNam} section={"ÁO THUN NAM"} />
        <HomeProductSection data={donghoNam} section={"ĐỒNG HỒ NAM"} />
        <HomeProductSection data={aothunNu} section={"Áo thun nữ"} />
        
        {/* <HomeProductSection data={mensPantsPage1} section={"Men's Pants"} /> */}
      </div>

      
    </div>
  );
};

export default Homepage;
