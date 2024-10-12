import { useEffect } from "react";
import { RootState, AppDispatch } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { ChildrenTheatreType } from "../../types/type";
import {
  setActivityFilter,
  fetchActivityFilter,
} from "../../redux/features/activityfilterslice";

const ActivityTab = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    activityFilter,
    status,
    error,
    setActivityFilter: selectedFilter,
  } = useSelector((state: RootState) => state.activityFilters);

  useEffect(() => {
    dispatch(fetchActivityFilter());
  }, [dispatch]);

  const handleFilterClick = (filterId: string) => {
    dispatch(setActivityFilter(filterId));
  };

  if (status === "loading") {
    return <p>Yükleniyor...</p>;
  }

  if (status === "failed") {
    return <p>{error}</p>;
  }

  return (
    <ul className="flex flex-col gap-y-3  text-sm text-white">
      {/* "Hepsi" filtresi */}
      <li
        className={`cursor-pointer py-2 px-6 bg-gradient-to-tr from-pink-600 to-purple-600 rounded-md ${
          selectedFilter === "all"
            ? "from-red-800  to-yellow-400 font-bold"
            : ""
        }`}
        onClick={() => handleFilterClick("all")}
      >
        Hepsi
      </li>

      {/* Diğer filtreler */}
      {activityFilter.map((activity: ChildrenTheatreType) => (
        <li
          key={activity._id}
          className={`cursor-pointer py-2 px-6 bg-gradient-to-tr from-pink-600 to-purple-600 rounded-md ${
            selectedFilter === activity._id
              ? "from-red-800  to-yellow-400 font-bold"
              : ""
          }`}
          onClick={() => handleFilterClick(activity._id)}
        >
          {activity.name}
        </li>
      ))}
    </ul>
  );
};

export default ActivityTab;
