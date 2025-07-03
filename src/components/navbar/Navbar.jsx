import { Link } from "react-router-dom";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { BsFillCaretDownFill } from "react-icons/bs";
import style from "./navbar.module.scss";
import jadidlar_logo from "../../assets/icons/jadidlar_logo.svg";
import { useState } from "react";

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [globalSearch, setGlobalSearch] = useState(true);

  const ToggleLanguage = () => {
    setToggle(!toggle);
  };

  const SearchBtn = () => {
    setGlobalSearch(false);
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
              <Link>Jadidlar</Link>

              <div className={style.link}>
                <button>
                  <span>Manbalar</span> <FaChevronDown />
                </button>

                <ul>
                  <li>
                    <Link>Arxiv hujjatlari</Link>
                    <Link>Matbuot</Link>
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
                    <Link>Asarlar</Link>
                    <Link>Maqolalar</Link>
                    <Link>Dissertatsiyalar</Link>
                    <Link>Esdaliklar</Link>
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
                    <Link>Asarlar</Link>
                    <Link>Maqolalar</Link>
                    <Link>Hikmatlar</Link>
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
                    <Link>Asarlar</Link>
                    <Link>Maqolalar</Link>
                    <Link>Sheʼrlar</Link>
                    <Link>Esdaliklar</Link>
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
                    <Link>Yangiliklar</Link>
                    <Link>Yigʻinlar</Link>
                    <Link>Seminarlar</Link>
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
                    <Link>Suratlar</Link>
                    <Link>Koʻruvlar</Link>
                    <Link>Eshituvlar</Link>
                  </li>
                </ul>
              </div>

              <Link>Biz haqimizda</Link>

              <button className={style.search_btn} onClick={SearchBtn}>
                <FaSearch />
              </button>

              <div className={style.link}>
                <button onClick={ToggleLanguage}>
                  <span>Uzb</span>
                  <BsFillCaretDownFill />
                </button>

                <div className={toggle ? style.open : style.hidden}>
                  <span>O'zbek</span>

                  <span>Ўзбек</span>

                  <span>English</span>
                </div>
              </div>
            </nav>
          </div>
        </header>
      ) : (
        <div className={style.global_search}>
          <input type="search" placeholder="Qidiruv ..." />
          <button>qidiruv</button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
