import { Rate, Progress } from "antd";
import { FaStar } from "react-icons/fa6";

const ActorDetailContect = () => {
  return (
    <div className="bg-white rounded-lg shadow-md shadow-white p-5 flex md:flex-row flex-col md:gap-y-0 gap-y-10 justify-between">
      <div className="flex flex-col gap-y-4 md:w-[55%] w-full">
        <h1>Zengin Mutfağı Oyununa Kaç Puan Veriyorsunuz?</h1>
        <span className="text-xs">267 kullanıcı değerlendirdi</span>
        <span>
          <Rate />
        </span>
        <span>Oyun Hakkındaki Yorumlarınızı Bizimle Paylaşır Mısınız?</span>
        <textarea className="border-2 h-36" name="" id=""></textarea>
        <div className="flex items-center gap-x-3">
          <input className="w-5 h-5" type="checkbox" name="" id="spoiler" />
          <label htmlFor="spoiler">Yorumum spoiler içerir</label>
        </div>
        <div>
          <button className="bg-yellow-600 text-white py-2 px-6 rounded-md">
            Gönder
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-y-5 p-10 md:w-[30%] w-full">
        <div className="flex items-end">
          <span className="text-6xl">4,5</span>
          <span className="text-sm"> /5</span>
        </div>
        <Rate allowHalf defaultValue={4.5} />
        <span className="text-sm">Doğrulanmış İzleyici Puanı</span>
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center gap-x-2 border-2 p-1 rounded-md">
            <span>5</span>
            <span>
              <FaStar />
            </span>
            <Progress percent={80} status="active" />
          </div>
          <div className="flex items-center gap-x-2 border-2 p-1 rounded-md">
            <span>4</span>
            <span>
              <FaStar />
            </span>
            <Progress percent={25} status="active" />
          </div>
          <div className="flex items-center gap-x-2 border-2 p-1 rounded-md">
            <span>3</span>
            <span>
              <FaStar />
            </span>
            <Progress percent={57} status="active" />
          </div>
          <div className="flex items-center gap-x-2 border-2 p-1 rounded-md">
            <span>2</span>
            <span>
              <FaStar />
            </span>
            <Progress percent={33} status="active" />
          </div>
          <div className="flex items-center gap-x-2 border-2 p-1 rounded-md">
            <span>1</span>
            <span>
              <FaStar />
            </span>
            <Progress percent={10} status="active" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorDetailContect;
