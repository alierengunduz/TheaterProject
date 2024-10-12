import { FC } from "react";
import { Link } from "react-router-dom";

interface NavbarButtonProps {
  title: string;
  link: string;
  isActive: boolean;
  setActiveLink: (link: string) => void;
}

const NavbarButton: FC<NavbarButtonProps> = ({
  title,
  link,
  isActive,
  setActiveLink,
}) => {
  return (
    <Link
      onClick={() => setActiveLink(link)}
      to={link}
      className="relative inline-block px-3 py-2 text-white text-xs tracking-tight no-underline group"
    >
      {title}
      {/* Aktifse animasyonu sıfırla ama renkleri koru */}
      <span
        className={`absolute inset-0 bg-red-500 transition-all duration-300 ease-out ${
          isActive
            ? "skew-x-0 left-0 top-0 w-1/2"
            : "skew-x-30 -top-1 -left-1 w-1/2"
        } h-full group-hover:skew-x-0 group-hover:left-1/2 group-hover:top-0 -z-10`}
      ></span>
      <span
        className={`absolute inset-0 bg-blue-800 transition-all duration-300 ease-out ${
          isActive
            ? "skew-x-0 left-1/2 top-0 w-1/2"
            : "skew-x-30 top-1 left-1/2 w-1/2"
        } h-full group-hover:skew-x-0 group-hover:left-0 group-hover:top-0 -z-10`}
      ></span>
    </Link>
  );
};

export default NavbarButton;
