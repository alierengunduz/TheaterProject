import Slider from "react-slick";
import { useRef } from "react";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import ChildrenCard from "../ui/ChildrenCard";
import Title from "../ui/Title";
import { ChildrenTheatreType } from "../../types/type";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchChildrenTheatre } from "../../redux/features/childrentheatreslice";
const SliderCom = () => {
  const sliderRef = useRef<any>(null); // Slider'a referans oluşturuyoruz
  const dispatch = useDispatch<AppDispatch>();
  const { childrenTheatre, status, error } = useSelector(
    (state: RootState) => state.childrenTheatres
  );

  useEffect(() => {
    dispatch(fetchChildrenTheatre());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>{error}</div>;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    lazyLoad: "ondemand" as const, // Specify the type explicitly
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    cssEase: "linear",
    centerMode: true,
    centerPadding: "1px",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerPadding: "1px",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerPadding: "1px",
        },
      },
      {
        breakpoint: 890,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "1px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "1px",
        },
      },
    ],
  };

  return (
    <div className="mt-14 flex flex-col gap-y-5">
      <div className="flex sm:flex-row flex-col sm:gap-y-0 gap-y-5 items-center justify-between">
        <div className="flex items-center gap-x-10 w-full">
          <Title text1="Bu Ay" text2="Sahneye Çıkacak" />
          <div className="flex items-center gap-x-5">
            <span
              className="cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-300 p-2 rounded-t-lg"
              onClick={() => sliderRef.current.slickPrev()} // Önceki slide'a git
            >
              <FaAnglesLeft size={30} />
            </span>
            <span
              className="cursor-pointer hover:bg-blue-800 hover:text-white transition-all duration-300 p-2 rounded-t-lg"
              onClick={() => sliderRef.current.slickNext()} // Sonraki slide'a git
            >
              <FaAnglesRight size={30} />
            </span>
          </div>
        </div>
        <div>
          <button className="bg-orange-600 text-white py-2 px-6 text-sm rounded-md flex text-center">
            Hepsini Göster
          </button>
        </div>
      </div>
      <Slider ref={sliderRef} {...settings}>
        {childrenTheatre.map((item: ChildrenTheatreType) => (
          <ChildrenCard key={item._id} item={item} />
        ))}
      </Slider>
    </div>
  );
};

export default SliderCom;
