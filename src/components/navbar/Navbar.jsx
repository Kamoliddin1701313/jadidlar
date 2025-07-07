import { Link } from "react-router-dom";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { BsFillCaretDownFill } from "react-icons/bs";
import style from "./navbar.module.scss";
import jadidlar_logo from "../../assets/icons/jadidlar_logo.svg";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [globalSearch, setGlobalSearch] = useState(true);

  const ToggleLanguage = () => {
    setToggle(!toggle);
  };

  const SearchBtn = () => {
    setGlobalSearch(!globalSearch);
  };

  return (
    <div className={style.container}>
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
                    <Link to="/koruvlar">Koʻruvlar</Link>
                    <Link to="/eshituvlar">Eshituvlar</Link>
                  </li>
                </ul>
              </div>

              <Link to="/about">Biz haqimizda</Link>

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
