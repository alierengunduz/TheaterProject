import Title from "../ui/Title";
import PressReleaseCard from "../ui/PressReleaseCard";
import { images } from "../../assets/images/assets";

export interface DataProps {
  id: number;
  title: string;
  date: string;
  image: string;
  description: string;
}

const PressRelease = () => {
  const data = [
    {
      id: 1,
      title: "4. Çocuk Tiyatroları!",
      date: "10 Ekim 2024",
      image: images.haber1,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    },
    {
      id: 2,
      title: "28. İstanbul Tiyatro Festivali Programı Açıklandı!",
      date: "21 Kasım 2024",
      image: images.haber2,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    },
    {
      id: 3,
      title: "5 Ekim Şehirler Arası Dans Gösterisi",
      date: "13 Haziran 2024",
      image: images.haber3,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    },
    {
      id: 4,
      title: "Kastamonu Spor Günleri",
      date: "20 Temmuz 2024",
      image: images.haber4,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    },
    {
      id: 5,
      title: "9. Gülme Gösterisi",
      date: "10 Ocak 2025",
      image: images.haber5,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    },
  ];
  return (
    <div>
      <Title text1="Basın" text2="Bülteni" />
      <ul className="mt-10 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
        {data.map((item: DataProps) => (
          <PressReleaseCard key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default PressRelease;
