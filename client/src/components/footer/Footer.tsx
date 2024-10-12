import "./Footer.css";
import { Checkbox } from "antd";
import type { CheckboxProps } from "antd";

const onChange: CheckboxProps["onChange"] = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

const Footer = () => {
  return (
    <div className="md:h-[400px] h-full mt-10 footerImg relative">
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-65 z-10"></div>
      <div className="flex flex-col gap-y-10 items-center  md:p-10 p-2  h-full text-white z-20 relative">
        <div className="flex flex-col gap-y-5  sm:w-[55%] w-[90%]">
          <h1 className="text-2xl font-bold tracking-tighter">
            Tiyatrolarımızdan Haberder Olun
          </h1>
          <p className="text-gray-400  font-thin">
            Filimlerimiz, Dizilerimiz, Tiyatrolarımız ve daha fazlası hakkında
            haberdar olmak için e-posta adresinizi girin ve bültenimize abone
            olun.
          </p>
        </div>
        <div className="flex flex-col gap-y-5">
          <input
            type="text"
            placeholder="E-posta Adresi"
            className="w-80 p-2 rounded-md outline-none text-gray-800"
          />
          <div className="flex flex-col gap-y-3">
            <Checkbox className="text-white" onChange={onChange}>
              Tiyatrolardan Haber Almak İstiyorum.{" "}
              <span className="text-pink-600 font-bold">
                Ticari Elektronik İleti
              </span>
              Gönderilmesine Onay Veriyorum.
            </Checkbox>
            <Checkbox className="text-white" onChange={onChange}>
              <span className="text-pink-600 font-bold">Aydınlatma Metni</span>{" "}
              ve Kişisel Verilerin Korunması Hakkında Bilgilendirme Metnini
              Okudum ve Kabul Ediyorum.
            </Checkbox>
            <Checkbox className="text-white" onChange={onChange}>
              Tiyatrolarımızın{" "}
              <span className="text-pink-600 font-bold">
                Kampanya ve Promosyonlarından{" "}
              </span>{" "}
              Haberdar Olmak İstiyorum.
            </Checkbox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
