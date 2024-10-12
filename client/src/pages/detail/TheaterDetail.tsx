import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchTheaterById } from "../../redux/features/theaterslice";
import TheaterDetailLeft from "../../components/theaterDetail/TheaterDetailLeft";
import TheaterDetailRight from "../../components/theaterDetail/TheaterDetailRight";
import TheaterDetailContect from "../../components/theaterDetail/TheaterDetailContect";
const TheaterDetail = () => {
  const { theaterId } = useParams<{ theaterId: string }>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (theaterId) {
      dispatch(fetchTheaterById(theaterId));
    }
  }, [dispatch, theaterId]);

  return (
    <div className="flex flex-col  gap-y-10 mt-10 w-full">
      <div className="flex lg:flex-row flex-col lg:gap-y-0 gap-y-10 gap-x-10">
        <div className="lg:w-1/3 w-full">
          <TheaterDetailLeft />
        </div>
        <div className="lg:w-2/3 w-full">
          <TheaterDetailRight />
        </div>
      </div>
      <div>
        <TheaterDetailContect />
      </div>
    </div>
  );
};

export default TheaterDetail;
