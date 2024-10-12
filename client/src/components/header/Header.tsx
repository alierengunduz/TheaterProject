import { useSelector } from "react-redux";
import Navbar from "../navbar/Navbar";
import { RootState } from "../../redux/store";
import DropdownProfile from "../dropdownprofile/DropdownProfile";
import { useState } from "react";
import MobileMenu from "../mobileMenu/MobileMenu";
import { CiUser } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { images } from "../../assets/images/assets";
const Header = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <header className="flex items-center justify-between py-3">
      <img
        className="w-16 h-16 object-cover rounded-full"
        src={images.logo}
        alt=""
      />
      <div className="md:flex hidden">
        <Navbar />
      </div>
      <div className="">
        {user ? (
          <DropdownProfile />
        ) : (
          <NavLink to="/login">
            <CiUser className="w-6 h-6 cursor-pointer md:flex hidden" />
          </NavLink>
        )}
      </div>
      <FaBarsStaggered
        className="md:hidden w-6 h-6 cursor-pointer"
        onClick={toggleDrawer}
      />
      <MobileMenu open={open} onClose={toggleDrawer} />
    </header>
  );
};

export default Header;
