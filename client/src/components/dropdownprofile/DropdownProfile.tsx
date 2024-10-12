import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { IoIosExit } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { logout } from "../../redux/features/userSlice";

const DropdownProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  const handleLogout = async () => {
    try {
      await dispatch(logout() as any); // Type assertion to `any` as a workaround
      navigate("/"); // Redirect to home page after logout
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "Logout",
      key: "3",
      icon: <IoIosExit size={20} />,
      danger: true,
      onClick: handleLogout, // Call logout handler
    },
  ];

  const menuProps = {
    items,
  };

  return (
    <div>
      <Dropdown.Button menu={menuProps}>
        {user ? user.name : "User"} {/* Kullanıcı adını göster */}
      </Dropdown.Button>
    </div>
  );
};

export default DropdownProfile;
