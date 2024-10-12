import { images } from "../../assets/images/assets";
import { Carousel } from "antd";
import "./Hero.css"; // CSS'i buraya dahil ediyoruz
const Hero = () => {
  return (
    <div>
      <Carousel arrows dotPosition="left" infinite={false}>
        <div>
          <img className="carousel-img" src={images.hero1} alt="" />
        </div>
        <div>
          <img className="carousel-img" src={images.hero2} alt="" />
        </div>
        <div>
          <img className="carousel-img" src={images.hero3} alt="" />
        </div>
      </Carousel>
    </div>
  );
};

export default Hero;
