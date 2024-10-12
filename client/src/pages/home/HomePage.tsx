import Hero from "../../components/hero/Hero";
import Hero2 from "../../components/hero2/Hero2";
import SliderCom from "../../components/slider/Slider";
import PressRelease from "../../components/pressRelease/PressRelease";
import Content from "../../components/content/Content";
const HomePage = () => {
  return (
    <div className="space-y-5">
      <Hero />
      <Hero2 />
      <Content />
      <SliderCom />
      <PressRelease />
    </div>
  );
};

export default HomePage;
