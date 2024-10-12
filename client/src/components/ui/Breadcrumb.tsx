import { Breadcrumb } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
interface BreadcrumbComProps {
  item: string;
}

const BreadcrumbCom: FC<BreadcrumbComProps> = ({ item }) => {
  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: <Link to="/">Anasayfa</Link>,
          },
          {
            title: (
              <Link to={item}>
                {item === "/theaters"
                  ? "Tiyatro"
                  : item === "/childrens-theaters"
                  ? "Çocuk Tiyatrosu"
                  : item === "/activity"
                  ? "Etkinlik"
                  : item === "/actors"
                  ? "Oyuncular"
                  : item === "/exhibitions"
                  ? "Sergiler"
                  : item === "/musicals"
                  ? "Müzikaller"
                  : item === "/scenes"
                  ? "Sahne"
                  : item === "/theater-scripts"
                  ? "Oyun Metinleri"
                  : ""}
              </Link>
            ),
          },
        ]}
      />
    </div>
  );
};

export default BreadcrumbCom;
