import { FC } from "react";
import { DataProps } from "../../components/pressRelease/PressRelease";
interface PressReleaseCardProps {
  item: DataProps;
}

const PressReleaseCard: FC<PressReleaseCardProps> = ({ item }) => {
  return (
    <li className="md:h-[450px] sm:h-[400px] h-[350px] border-4 flex flex-col justify-between  border-gray-600 p-2 border-double rounded-md">
      <div className="h-[50%]">
        <img
          className="w-full h-full object-cover rounded-md"
          src={item.image}
          alt=""
        />
      </div>
      <div className="h-[50%] flex flex-col gap-y-3 mt-1">
        <span className="text-xs bg-orange-600 text-white w-max p-1 rounded-md">
          {item.date}
        </span>
        <h1 className="text-sm">{item.title}</h1>
        <p className="text-xs">{item.description}</p>
      </div>
    </li>
  );
};

export default PressReleaseCard;
