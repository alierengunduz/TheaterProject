import { FC } from "react";

interface TitleProps {
  text1: string;
  text2: string;
}

const Title: FC<TitleProps> = ({ text1, text2 }) => {
  return (
    <div className="flex items-center  gap-x-2">
      <h1 className="font-bold lg:text-2xl md:text-xl text-base md:tracking-wider tracking-normal">
        {text1} <span className="text-gray-600">{text2}</span>
      </h1>
      <hr className="bg-gradient-to-bl from-gray-500 to-gray-800 md:w-20 w-10 md:h-5 h-3 rounded-full" />
    </div>
  );
};

export default Title;
