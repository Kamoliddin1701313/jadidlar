import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { BsFillCaretDownFill } from "react-icons/bs";
import style from "./navbar.module.scss";
import jadidlar_logo from "../../assets/icons/jadidlar_logo.svg";
import { useEffect, useState } from "react";
import { IoMdLogOut } from "react-icons/io";
import { GrClose } from "react-icons/gr";
import { Fade } from "react-awesome-reveal";

function Navbar() {
  const { pathname } = useLocation();

  const token = localStorage.getItem("token");

  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [toggle, setToggle] = useState(false);
  const [globalSearch, setGlobalSearch] = useState(true);
  const ToggleLanguage = () => {
    setToggle(!toggle);
  };

  const SearchBtn = () => {
    setGlobalSearch(!globalSearch);
  };

  const Logout = () => {
    localStorage.removeItem("token");
    setIsModalOpen(false);
  };

  const bgClass =
    pathname === "/" ? style.backgroundBlack : style.backgroundBlue;

  return (
    <div
      className={`${style.container} ${bgClass}`}
      style={
        isScrolled
          ? { backgroundColor: "#0e2a63", boxShadow: "0px 0px 20px #0000ffa6" }
          : {}
      }
    >
      {isModalOpen && (
        <Fade cascade damping={0.2} className={style.modal}>
          <div className={style.modal_box}>
            <GrClose onClick={() => setIsModalOpen(false)} />
            <div className={style.modal_card}>
              <p>Hisobdan chiqmoqchimisiz?</p>
              <button onClick={Logout}>Hisobdan Chiqish</button>
            </div>
          </div>
        </Fade>
      )}

      {globalSearch ? (
        <header className={style.header}>
          <Link to="/">
            <img
              src={jadidlar_logo}
              alt="jadidlar_logo"
              className={style.logo}
            />
          </Link>

          <div className={style.navbar}>
            <nav className={style.navbar_link}>
              <Link to="/jadids">Jadidlar</Link>

              <div className={style.link}>
                <button>
                  <span>Manbalar</span> <FaChevronDown />
                </button>

                <ul>
                  <li>
                    <Link to="/archivedDocuments/royxat">Arxiv hujjatlari</Link>
                    <Link to="/press/tarix">Matbuot</Link>
                  </li>
                </ul>
              </div>

              <div className={style.link}>
                <button>
                  <span>Izlanishlar</span>
                  <FaChevronDown />
                </button>

                <ul>
                  <li>
                    <Link to="/research/asarlar">Asarlar</Link>
                    <Link to="/research/maqolalar">Maqolalar</Link>
                    <Link to="/research/dissertatsiyalar">
                      Dissertatsiyalar
                    </Link>
                    <Link to="/research/esdaliklar">Esdaliklar</Link>
                  </li>
                </ul>
              </div>

              <div className={style.link}>
                <button>
                  <span>Til va imlo</span>
                  <FaChevronDown />
                </button>

                <ul>
                  <li>
                    <Link to="/languageSpelling/asarlar">Asarlar</Link>
                    <Link to="/languageSpelling/maqolalar">Maqolalar</Link>
                    <Link to="/languageSpelling/hikmatlar">Hikmatlar</Link>
                  </li>
                </ul>
              </div>

              <div className={style.link}>
                <button>
                  <span>Turkiston muxtoriyati</span>
                  <FaChevronDown />
                </button>

                <ul>
                  <li>
                    <Link to="/turkistan/asarlar">Asarlar</Link>
                    <Link to="/turkistan/maqolalar">Maqolalar</Link>
                    <Link to="/turkistan/sherlar">Sheʼrlar</Link>
                    <Link to="/turkistan/esdaliklar">Esdaliklar</Link>
                  </li>
                </ul>
              </div>

              <div className={style.link}>
                <button>
                  <span>Voqealar</span>
                  <FaChevronDown />
                </button>
                <ul>
                  <li>
                    <Link to="/eventsList/yangiliklar">Yangiliklar</Link>
                    <Link to="/eventsList/yiginlar">Yigʻinlar</Link>
                    <Link to="/eventsList/seminarlar">Seminarlar</Link>
                  </li>
                </ul>
              </div>

              <div className={style.link}>
                <button>
                  <span>Ko‘r-eshit-o‘qi</span>
                  <FaChevronDown />
                </button>

                <ul>
                  <li>
                    <Link to="/suratlar">Suratlar</Link>
                    <Link to="/koruvlar/id">Koʻruvlar</Link>
                    <Link to="/eshituvlar">Eshituvlar</Link>
                  </li>
                </ul>
              </div>

              <Link to="/about">Biz haqimizda</Link>

              {token ? (
                <button
                  className={style.logout_icon}
                  onClick={() => setIsModalOpen(true)}
                >
                  <IoMdLogOut />
                </button>
              ) : (
                ""
              )}

              <button className={style.search_btn} onClick={SearchBtn}>
                <FaSearch />
              </button>

              <div className={style.link}>
                <button onClick={ToggleLanguage}>
                  <span>Uzb</span>
                  <BsFillCaretDownFill
                    style={{
                      transform: toggle ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s",
                    }}
                  />
                </button>

                <div className={toggle ? style.open : style.hidden}>
                  <span onClick={ToggleLanguage}>O'zbek</span>

                  <span onClick={ToggleLanguage}>Ўзбек</span>

                  <span onClick={ToggleLanguage}>English</span>
                </div>
              </div>
            </nav>
          </div>
        </header>
      ) : (
        <Fade cascade damping={0.2}>
          <div className={style.global_search}>
            <input type="search" placeholder="Qidiruv ..." />
            <button onClick={SearchBtn}>qidiruv</button>
          </div>
        </Fade>
      )}
    </div>
  );
}

export default Navbar;
