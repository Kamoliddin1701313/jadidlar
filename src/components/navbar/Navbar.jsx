import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { BsFillCaretDownFill } from "react-icons/bs";
import { GrFormNextLink } from "react-icons/gr";
import style from "./navbar.module.scss";
import jadidlar_logo from "../../assets/icons/jadidlar_logo.svg";
import { useEffect, useMemo, useState } from "react";
import { IoMdLogOut } from "react-icons/io";
import { TbMenu2 } from "react-icons/tb";
import { AiOutlineClose } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { Fade, Zoom } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { getPageLink } from "../../mockdata/data";
import { useContext } from "react";
import { UseContext } from "../../layouts/MainLayout";

function Navbar() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const { globalSearch, setGlobalSearch } = useContext(UseContext);

  const pagelink = useMemo(() => getPageLink(t), [i18n.language]);

  const languages = [
    { code: "uzl", label: "O'zb" },
    { code: "uzk", label: "Ўзб" },
    { code: "eng", label: "Eng" },
  ];

  // const [globalSearch, setGlobalSearch] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [openicon, setOpenicon] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

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

  const OpenIconBtn = () => {
    setOpenicon((prev) => !prev);
  };

  const ToggleLanguage = () => {
    setToggle(!toggle);
  };

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode).then(() => {
      setToggle(false);
    });
  };

  const pagelinksearch = pagelink.filter((text) =>
    text.searchname.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  const GlobalSearchInput = (e) => {
    setSearch(e.target.value);
  };

  const SearchBtn = () => {
    setSearch("");
    setGlobalSearch(!globalSearch);
  };

  const NavigateLink = (value) => {
    setOpenicon((prev) => !prev);
    navigate(value);
    setSearch("");
  };

  const Logout = () => {
    setIsModalOpen(false);
    localStorage.removeItem("token");
  };

  const bgClass =
    pathname === "/" ? style.backgroundBlack : style.backgroundBlue;

  return (
    <div
      className={`${style.container} ${bgClass}`}
      style={
        isScrolled
          ? {
              backgroundColor: "#0e2a63",
              boxShadow: "0px 0px 20px #0000ffa6",
            }
          : {}
      }
    >
      {isModalOpen && (
        <Fade cascade damping={0.2} className={style.modal}>
          <div className={style.modal_box}>
            <GrClose onClick={() => setIsModalOpen(false)} />
            <div className={style.modal_card}>
              <p>{t("navbar.chiqish")}</p>
              <button onClick={Logout}>{t("navbar.chiqish_btn")}</button>
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

          <div className={style.desktop_navbar}>
            <nav className={style.navbar_link}>
              <Link to="/jadids">{t("navbar.jadidlar")}</Link>

              <div className={style.link}>
                <button>
                  <span>{t("navbar.manbalar")}</span> <FaChevronDown />
                </button>

                <ul>
                  <li>
                    <Link to="/archivedDocuments/royxat">
                      {t("navbar.arxivhujjatlari")}
                    </Link>
                    <Link to="/press/tarix">{t("navbar.matbuot")}</Link>
                  </li>
                </ul>
              </div>

              <div className={style.link}>
                <button>
                  <span>{t("navbar.izlanishlar")}</span>
                  <FaChevronDown />
                </button>

                <ul>
                  <li>
                    <Link to="/research/asarlar">{t("navbar.asarlar")}</Link>

                    <Link to="/research/maqolalar">
                      {t("navbar.maqolalar")}
                    </Link>

                    <Link to="/research/dissertatsiyalar">
                      {t("navbar.dissertatsiyalar")}
                    </Link>

                    <Link to="/research/esdaliklar">
                      {t("navbar.esdaliklar")}
                    </Link>
                  </li>
                </ul>
              </div>

              <div className={style.link}>
                <button>
                  <span>{t("navbar.tilvaimlo")}</span>
                  <FaChevronDown />
                </button>

                <ul>
                  <li>
                    <Link to="/languageSpelling/asarlar">
                      {t("navbar.asarlar")}
                    </Link>
                    <Link to="/languageSpelling/maqolalar">
                      {t("navbar.maqolalar")}
                    </Link>
                    <Link to="/languageSpelling/hikmatlar">
                      {t("navbar.hikmatlar")}
                    </Link>
                  </li>
                </ul>
              </div>

              <div className={style.link}>
                <button>
                  <span>{t("navbar.turkistonmuxtoriyati")}</span>
                  <FaChevronDown />
                </button>

                <ul>
                  <li>
                    <Link to="/turkistan/asarlar">{t("navbar.asarlar")}</Link>
                    <Link to="/turkistan/maqolalar">
                      {t("navbar.maqolalar")}
                    </Link>
                    <Link to="/turkistan/sherlar">{t("navbar.sherlar")}</Link>
                    <Link to="/turkistan/esdaliklar">
                      {t("navbar.esdaliklar")}
                    </Link>
                  </li>
                </ul>
              </div>

              <div className={style.link}>
                <button>
                  <span>{t("navbar.voqealar")}</span>
                  <FaChevronDown />
                </button>
                <ul>
                  <li>
                    <Link to="/eventsList/yangiliklar">
                      {t("navbar.yangiliklar")}
                    </Link>
                    <Link to="/eventsList/yiginlar">
                      {t("navbar.yiginlar")}
                    </Link>
                    <Link to="/eventsList/seminarlar">
                      {t("navbar.seminarlar")}
                    </Link>
                  </li>
                </ul>
              </div>

              <div className={style.link}>
                <button>
                  <span>{t("navbar.ko'reshito'qi")}</span>
                  <FaChevronDown />
                </button>

                <ul>
                  <li>
                    <Link to="/suratlar">{t("navbar.suratlar")}</Link>
                    <Link to="/koruvlar/id">{t("navbar.koruvlar")}</Link>
                    <Link to="/eshituvlar">{t("navbar.eshituvlar")}</Link>
                  </li>
                </ul>
              </div>

              <Link to="/about">{t("navbar.bizhaqimizda")}</Link>

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
                  <span>
                    {languages.find((l) => i18n.language.startsWith(l.code))
                      ?.label || "Uzb"}
                  </span>
                  <BsFillCaretDownFill
                    style={{
                      transform: toggle ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s",
                    }}
                  />
                </button>

                <div className={toggle ? style.open : style.hidden}>
                  <Zoom
                    direction="up"
                    cascade
                    damping={0.8}
                    duration={300}
                    triggerOnce
                  >
                    {languages?.map((lang) => (
                      <span
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                      >
                        {lang?.label}
                      </span>
                    ))}
                  </Zoom>
                </div>
              </div>
            </nav>
          </div>

          <div
            style={openicon ? { left: "0" } : { left: "100%", opacity: "0" }}
            className={style.mobile_navbar}
          >
            <nav className={style.navbar_link}>
              <div className={style.navbar_toggle}>
                <button className={style.search_btn}>
                  <input
                    type="search"
                    placeholder={t("navbar.qidiruv")}
                    onChange={GlobalSearchInput}
                  />
                  <FaSearch />
                </button>

                <button className={style.open_btn} onClick={OpenIconBtn}>
                  <AiOutlineClose />
                </button>
              </div>

              {search.length > 0 && pagelinksearch.length > 0 && (
                <div className={style.mobile_search_container}>
                  <div className={style.mobile_search_wrapper}>
                    <div className={style.mobile_text_number}>
                      <span>
                        {pagelinksearch.length} {t("dataname.natija")}
                      </span>
                    </div>

                    <div className={style.mobile_search_card}>
                      {pagelinksearch?.map((value, index) => (
                        <button
                          onClick={() => NavigateLink(`/${value.link}`)}
                          className={style.mobile_search_link}
                        >
                          <span>"{value?.name}"</span>
                          <div className={style.mobile_icon_btn}>
                            <span>{value?.searchname}</span>
                            <GrFormNextLink />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className={style.link}>
                <button onClick={ToggleLanguage}>
                  <span>
                    {languages.find((l) => i18n.language.startsWith(l.code))
                      ?.label || "Uzb"}
                  </span>
                  <BsFillCaretDownFill
                    style={{
                      transform: toggle ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s",
                    }}
                  />
                </button>

                <div className={toggle ? style.open : style.hidden}>
                  <Zoom
                    direction="left"
                    cascade
                    damping={0.8}
                    duration={300}
                    triggerOnce
                  >
                    {languages?.map((lang) => (
                      <span
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                      >
                        {lang?.label}
                      </span>
                    ))}
                  </Zoom>
                </div>
              </div>

              <Link to="/jadids" onClick={OpenIconBtn}>
                {t("navbar.jadidlar")}
              </Link>

              <div className={style.link}>
                <button>
                  <span>{t("navbar.manbalar")}</span> <FaChevronDown />
                </button>

                <ul>
                  <li onClick={OpenIconBtn}>
                    <Link to="/archivedDocuments/royxat">
                      {t("navbar.arxivhujjatlari")}
                    </Link>
                    <Link to="/press/tarix">{t("navbar.matbuot")}</Link>
                  </li>
                </ul>
              </div>
              <div className={style.link}>
                <button>
                  <span>{t("navbar.izlanishlar")}</span>
                  <FaChevronDown />
                </button>

                <ul>
                  <li onClick={OpenIconBtn}>
                    <Link to="/research/asarlar">{t("navbar.asarlar")}</Link>

                    <Link to="/research/maqolalar">
                      {t("navbar.maqolalar")}
                    </Link>

                    <Link to="/research/dissertatsiyalar">
                      {t("navbar.dissertatsiyalar")}
                    </Link>

                    <Link to="/research/esdaliklar">
                      {t("navbar.esdaliklar")}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className={style.link}>
                <button>
                  <span>{t("navbar.tilvaimlo")}</span>
                  <FaChevronDown />
                </button>

                <ul>
                  <li onClick={OpenIconBtn}>
                    <Link to="/languageSpelling/asarlar">
                      {t("navbar.asarlar")}
                    </Link>
                    <Link to="/languageSpelling/maqolalar">
                      {t("navbar.maqolalar")}
                    </Link>
                    <Link to="/languageSpelling/hikmatlar">
                      {t("navbar.hikmatlar")}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className={style.link}>
                <button>
                  <span>{t("navbar.turkistonmuxtoriyati")}</span>
                  <FaChevronDown />
                </button>

                <ul>
                  <li onClick={OpenIconBtn}>
                    <Link to="/turkistan/asarlar">{t("navbar.asarlar")}</Link>
                    <Link to="/turkistan/maqolalar">
                      {t("navbar.maqolalar")}
                    </Link>
                    <Link to="/turkistan/sherlar">{t("navbar.sherlar")}</Link>
                    <Link to="/turkistan/esdaliklar">
                      {t("navbar.esdaliklar")}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className={style.link}>
                <button>
                  <span>{t("navbar.voqealar")}</span>
                  <FaChevronDown />
                </button>
                <ul>
                  <li onClick={OpenIconBtn}>
                    <Link to="/eventsList/yangiliklar">
                      {t("navbar.yangiliklar")}
                    </Link>
                    <Link to="/eventsList/yiginlar">
                      {t("navbar.yiginlar")}
                    </Link>
                    <Link to="/eventsList/seminarlar">
                      {t("navbar.seminarlar")}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className={style.link}>
                <button>
                  <span>{t("navbar.ko'reshito'qi")}</span>
                  <FaChevronDown />
                </button>

                <ul>
                  <li onClick={OpenIconBtn}>
                    <Link to="/suratlar">{t("navbar.suratlar")}</Link>
                    <Link to="/koruvlar/id">{t("navbar.koruvlar")}</Link>
                    <Link to="/eshituvlar">{t("navbar.eshituvlar")}</Link>
                  </li>
                </ul>
              </div>
              <Link onClick={OpenIconBtn} to="/about">
                {t("navbar.bizhaqimizda")}
              </Link>
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
            </nav>
          </div>

          <button onClick={OpenIconBtn} className={style.toggle_btn}>
            {!openicon && <TbMenu2 />}
          </button>
        </header>
      ) : (
        <Fade cascade damping={0.2}>
          <div className={style.global_search}>
            <input
              type="search"
              placeholder={t("navbar.qidiruv")}
              onChange={GlobalSearchInput}
            />
            <button onClick={SearchBtn}>{t("navbar.yopish")}</button>
          </div>

          {search.length && pagelinksearch.length > 0 && (
            <div className={style.search_container}>
              <div className={style.search_wrapper}>
                <div className={style.text_number}>
                  <span>
                    {pagelinksearch.length} {t("dataname.natija")}
                  </span>
                </div>

                <div className={style.search_card}>
                  {pagelinksearch?.map((value, index) => (
                    <button
                      onClick={() => NavigateLink(`/${value.link}`)}
                      className={style.search_link}
                    >
                      <span>"{value?.name}"</span>
                      <div className={style.icon_btn}>
                        <span>{value?.searchname}</span>
                        <GrFormNextLink />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Fade>
      )}
    </div>
  );
}

export default Navbar;
