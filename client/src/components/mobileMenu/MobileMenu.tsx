import React from "react";
import { Drawer } from "antd";
import { Link } from "react-router-dom";
interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose }) => {
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <Drawer title="ABC Tiyatro" placement="right" onClose={onClose} open={open}>
      <ul className="flex flex-col gap-3">
        <li>
          <Link onClick={handleLinkClick} to="/">
            Home
          </Link>
        </li>
        <li>
          <Link onClick={handleLinkClick} to="/theaters">
            Tiyatrolar
          </Link>
        </li>
        <li>
          <Link onClick={handleLinkClick} to="/childrens-theaters">
            Çocuk Tiyatroları
          </Link>
        </li>
        <li>
          <Link onClick={handleLinkClick} to="/activity">
            Yurt Dışı Etkinlikleri
          </Link>
        </li>
        <li>
          <Link onClick={handleLinkClick} to="/actors">
            Oyuncular
          </Link>
        </li>
      </ul>
    </Drawer>
  );
};

export default MobileMenu;
