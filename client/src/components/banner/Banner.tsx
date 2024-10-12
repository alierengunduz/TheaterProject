import { FC } from "react";

interface BannerProps {
  image: string;
}

const Banner: FC<BannerProps> = ({ image }) => {
  return (
    <div>
      <img className="" src={image} alt="" />
    </div>
  );
};

export default Banner;
