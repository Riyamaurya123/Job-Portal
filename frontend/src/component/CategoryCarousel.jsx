import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const CategoryCarousel = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const Category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
  ];

    const searchJobHandler = (query)=>{
      dispatch(setSearchedQuery(query))
      navigate("/browse")
      
    }
  

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Show 3 slides at once
    slidesToScroll: 1,
    centerMode: true, // Enables center focus
    centerPadding: "0px", // Ensures proper alignment
    nextArrow: <NextArrow />, // Custom Next Button
    prevArrow: <PrevArrow />, // Custom Prev Button
  };

  return (
    <div className="w-1/2 mx-auto my-10 relative">
      <Slider {...settings}>
        {Category.map((item, index) => (
          <div key={index} className="text-center p-5">
            <div onClick={()=>searchJobHandler(item)} className="category-slide border p-4 rounded-md transition-all duration-300">
              {item}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div 
      className="absolute top-1/2 right-[-30px] transform -translate-y-1/2 cursor-pointer text-3xl text-black hover:text-blue-500"
      onClick={onClick}
    >
      <IoIosArrowForward />
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div 
      className="absolute top-1/2 left-[-30px] transform -translate-y-1/2 cursor-pointer text-3xl text-black hover:text-blue-500"
      onClick={onClick}
    >
      <IoIosArrowBack />
    </div>
  );
};

export default CategoryCarousel;
