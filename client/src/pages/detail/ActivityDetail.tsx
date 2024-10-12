import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchActivityById } from "../../redux/features/activitytheatreslice";
import ActivityDetailLeft from "../../components/activityDetail/ActivityDetailLeft";
import ActivityDetailRight from "../../components/activityDetail/ActivityDetailRight";
import ActivityDetailContect from "../../components/activityDetail/ActivityDetailContect";
const ActivityDetail = () => {
  const { activityId } = useParams<{ activityId: string }>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (activityId) {
      dispatch(fetchActivityById(activityId));
    }
  }, [dispatch, activityId]);

  return (
    <div className="flex flex-col  gap-y-10 mt-10 w-full">
      <div className="flex lg:flex-row flex-col lg:gap-y-0 gap-y-10 gap-x-10">
        <div className="lg:w-1/3 w-full">
          <ActivityDetailLeft />
        </div>
        <div className="lg:w-2/3 w-full">
          <ActivityDetailRight />
        </div>
      </div>
      <div>
        <ActivityDetailContect />
      </div>
    </div>
  );
};

export default ActivityDetail;
