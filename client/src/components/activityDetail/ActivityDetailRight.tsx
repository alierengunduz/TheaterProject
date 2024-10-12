import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { TiTicket } from "react-icons/ti";
import { FaHeart } from "react-icons/fa";

const ActivityDetailRight = () => {
  const { activityDetail, status, error } = useSelector(
    (state: RootState) => state.activityTheatres
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>{error}</div>;
  }
  // Format the time to display only the hours, minutes, and seconds
  const formattedTime = activityDetail?.time
    ? new Date(activityDetail.time).toLocaleTimeString()
    : "";

  return (
    <div className="flex flex-col gap-y-10">
      <div className="bg-white shadow-md shadow-white p-5 rounded-md flex flex-col gap-y-5">
        <h1 className="text-2xl font-semibold capitalize tracking-wider">
          {activityDetail?.name}
        </h1>
        <div className="flex items-center gap-x-2">
          <span className="text-green-600">
            <TiTicket size={20} />
          </span>
          <span className="text-sm">Tiyatro</span>
        </div>
        <div className="bg-[#F1F1F1] flex flex-col gap-y-2 p-3 rounded-lg text-[#4B4B4B]">
          <h1 className="font-bold">Etkinlik Detayı</h1>
          <p className="text-sm leading-relaxed">
            {activityDetail?.description}
          </p>
        </div>
        <div className="flex md:flex-row flex-col md:gap-y-0 gap-y-5 items-center justify-between">
          <div className="flex items-center gap-x-3 tracking-tighter">
            <div className="flex items-center gap-x-2 border-r-2 border-dashed pr-3 cursor-pointer hover:bg-orange-600 p-2 rounded-lg hover:text-white hover:border-0 group transition-all duration-300">
              <span>Biletler</span>
              <span className="bg-[#2dd87b] text-white py-1 px-3 group-hover:bg-purple-400 text-xs rounded-full">
                5
              </span>
            </div>
            <div className="flex items-center gap-x-2 border-r-2 border-dashed pr-3 cursor-pointer hover:bg-orange-600 p-2 rounded-lg hover:text-white hover:border-0 group transition-all duration-300">
              <span>Sanatçılar</span>
              <span className="bg-[#2dd87b] text-white py-1 px-3 group-hover:bg-purple-400 text-xs rounded-full">
                2
              </span>
            </div>
            <div>Kurallar</div>
          </div>
          <div className="bg-orange-600 flex gap-x-3 items-center text-white py-2 px-6 rounded-md tracking-tighter font-bold text-sm">
            <button className="">Favorilerime Ekle</button>
            <span>
              <FaHeart />
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md shadow-white p-5 rounded-md grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-y-0 gap-y-5  gap-5">
        <div className="flex sm:justify-start items-center sm:gap-x-3 gap-x-10 justify-between">
          <span>Yaş sınırı: </span>
          <span className="bg-green-400 text-white text-xs py-1 px-3 rounded-md">
            {activityDetail?.age}
          </span>
        </div>
        <div className="flex sm:justify-start items-center sm:gap-x-3 gap-x-10 justify-between">
          <span>Süre: </span>
          <span className="bg-green-400 text-white text-xs p-2 rounded-md">
            {" "}
            {formattedTime}
          </span>
        </div>
        <div className="flex sm:justify-start items-center sm:gap-x-3 gap-x-10 justify-between">
          <span>Etkinlik Türü: </span>
          <span className="bg-green-400 text-white text-xs rounded-md py-2 px-4">
            {activityDetail?.eventtype}
          </span>
        </div>
      </div>
      <div className="bg-white shadow-md shadow-white p-5 rounded-md">
        <button className="bg-gray-700 text-white mx-auto w-full py-2 rounded-lg hover:bg-gradient-to-tl from-orange-400 to-orange-800 transition-all duration-300">
          Biletini Al
        </button>
      </div>
    </div>
  );
};

export default ActivityDetailRight;
