import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchActorById } from "../../redux/features/actorslice";
import ActorDetailLeft from "../../components/actorDetail/ActorDetailLeft";
import ActorDetailRight from "../../components/actorDetail/ActorDetailRight";
import ActorDetailContect from "../../components/actorDetail/ActorDetailContect";
const ActorDetail = () => {
  const { actorId } = useParams<{ actorId: string }>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (actorId) {
      dispatch(fetchActorById(actorId));
    }
  }, [dispatch, actorId]);

  return (
    <div className="flex flex-col  gap-y-10 mt-10 w-full">
      <div className="flex lg:flex-row flex-col lg:gap-y-0 gap-y-10 gap-x-10">
        <div className="lg:w-1/3 w-full">
          <ActorDetailLeft />
        </div>
        <div className="lg:w-2/3 w-full">
          <ActorDetailRight />
        </div>
      </div>
    </div>
  );
};

export default ActorDetail;
