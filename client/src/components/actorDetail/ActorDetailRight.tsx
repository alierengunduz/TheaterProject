import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { TiTicket } from "react-icons/ti";
import { FaHeart } from "react-icons/fa";

const ActorDetailRight = () => {
  const { actorDetail, status, error } = useSelector(
    (state: RootState) => state.actors
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col gap-y-10">
      <div className="bg-white shadow-md shadow-white p-5 rounded-md flex flex-col gap-y-5">
        <h1 className="text-2xl font-semibold capitalize tracking-wider">
          {actorDetail?.name}
        </h1>
        <div className="flex items-center gap-x-2">
          <span className="text-green-600">
            <TiTicket size={20} />
          </span>
          <span className="text-sm">Tiyatro</span>
        </div>
        <div className="bg-[#F1F1F1] flex flex-col gap-y-2 p-3 rounded-lg text-[#4B4B4B]">
          <h1 className="font-bold">Etkinlik Detayı</h1>
          <p className="text-sm leading-relaxed">{actorDetail?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ActorDetailRight;
