import style from "./footer.module.scss";
import { FaFacebookF } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { PiTelegramLogoBold } from "react-icons/pi";
import logo from "../../assets/icons/logo.svg";

function Footer() {
  return (
    <div className={style.container}>
      <div className={style.footer}>
        <div className={style.footer_contact}>
          <div className={style.footer_logo}>
            <img src={logo} alt="footer_logo" />
          </div>

          <div className={style.link}>
            <span>Email :</span>
            <a href="#">jadid@info.uz</a>
          </div>

          <div className={style.link}>
            <span>Telefon</span>
            <a href="tel:+998712335470">+998712335470</a>
          </div>

          <div className={style.link}>
            <span>Ijtimoiy tarmoq</span>

            <div className={style.icons}>
              <a href="#">
                <FaFacebookF />
              </a>

              <a href="#">
                <FiInstagram />
              </a>

              <a href="#">
                <PiTelegramLogoBold />
              </a>
            </div>
          </div>
        </div>

        <div className={style.footer_line}></div>
        <div className={style.footer_text}>
          <h3>«Jadidlar» Barcha huquqlar himoyalangan</h3>
          <h3>© Copyright 2024 -</h3>
        </div>
      </div>
    </div>
  );
}

export default Footer;
