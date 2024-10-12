import TheaterCard from "../ui/TheaterCard";
import { images } from "../../assets/images/assets";
import Banner from "../banner/Banner";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchTheatre } from "../../redux/features/theaterslice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { ChildrenTheatreType } from "../../types/type";

const TheatreContent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { theater, status, error, sortOrder } = useSelector(
    (state: RootState) => state.theaters
  );

  const { setTheaterFilter } = useSelector(
    (state: RootState) => state.theaterFilters
  );

  useEffect(() => {
    const theatreToFetch =
      setTheaterFilter === "all" ? "" : setTheaterFilter.toLowerCase();
    dispatch(fetchTheatre({ type: theatreToFetch, sortOrder }));
  }, [dispatch, setTheaterFilter, sortOrder]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>{error}</div>;
  }

  return (
    <div className="flex-1 flex flex-col gap-y-5">
      <div>
        <Banner image={images.banner2} />
      </div>
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5 place-items-center">
        {theater.map((item: ChildrenTheatreType) => (
          <TheaterCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default TheatreContent;
