import NavbarButton from "../ui/NavbarButton";
import { useState } from "react";
const Navbar = () => {
  const [activeLink, setActiveLink] = useState<string>("");
  const NavbarData = [
    {
      title: "Anasayfa",
      link: "/",
    },
    {
      title: "Tiyatrolar",
      link: "/theaters",
    },
    {
      title: "Çocuk Tiyatroları",
      link: "/childrens-theaters",
    },
    {
      title: "Yurt Dışı Etkinlikler",
      link: "/activity",
    },
    {
      title: "Oyuncular",
      link: "/actors",
    },
  ];

  return (
    <ul className="flex items-center gap-x-5">
      {NavbarData.map((item, index) => (
        <li key={index}>
          <NavbarButton
            title={item.title}
            link={item.link}
            isActive={activeLink === item.link} // Aktif linki kontrol et
            setActiveLink={setActiveLink} // Tıklama durumunu yönetecek
          />
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
