import { images } from "../../assets/images/assets";

const ContentData = [
  {
    id: 1,
    title: "KONSER",
    image: images.c1,
  },
  {
    id: 2,
    title: "TİYATRO",
    image: images.c2,
  },
  {
    id: 3,
    title: "FESTİVAL",
    image: images.c3,
  },
  {
    id: 4,
    title: "SERGİ",
    image: images.c4,
  },
  {
    id: 5,
    title: "MÜZİK",
    image: images.c5,
  },
  {
    id: 6,
    title: "SANATÇI",
    image: images.c6,
  },
];

const Content = () => {
  return (
    <ul className="py-10 gap-5 grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 place-items-center">
      {ContentData.map((item) => (
        <li
          className="flex sm:flex-row flex-col sm:gap-y-0 gap-y-5 items-center sm:w-48 w-32 bg-white py-2 px-4 rounded-3xl shadow-md shadow-orange-400 hover:bg-gradient-to-tr from-orange-100 to-orange-200 hover:font-bold border-orange-500 transition-all duration-300 cursor-pointer"
          key={item.id}
        >
          <img src={item.image} alt="" />
          <h2 className="text-sm">{item.title}</h2>
        </li>
      ))}
    </ul>
  );
};

export default Content;
