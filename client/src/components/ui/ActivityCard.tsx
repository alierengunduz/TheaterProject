import { FC } from "react";
import { ChildrenTheatreType } from "../../types/type";
import { useNavigate } from "react-router-dom";

interface ChildrenCardProps {
  item: ChildrenTheatreType;
}

const ActivityCard: FC<ChildrenCardProps> = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/activity/${item._id}`)}
      className="relative md:w-[360px] sm:w-[320px] w-full h-[440px] group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
    >
      {/* Resim (Üst Kısım) */}
      <div className="w-full h-2/3 bg-gradient-to-br from-red-600 to-orange-300">
        <img
          src={
            item.image[0]
              ? `http://localhost:8000/images/${item.image[0].replace(
                  "uploads/",
                  ""
                )}`
              : ""
          }
          alt="theatre image"
          className="w-full h-full object-cover rounded-t-lg transition-transform duration-500 ease-out group-hover:scale-75 group-hover:rotate-12"
        />
      </div>

      {/* İçerik (Alt Kısım) */}
      <div className="p-4 bg-white h-1/3 rounded-b-lg flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {item.name}
        </h3>
        <p className="text-sm text-gray-600">
          {item.description?.slice(0, 50)}...
        </p>
        <span className="text-xs bg-orange-600 text-white text-center py-2 rounded-sm">
          {item.createdAt.slice(0, 10)}
        </span>
      </div>
    </div>
  );
};

export default ActivityCard;
