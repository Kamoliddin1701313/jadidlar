import { FcSearch } from "react-icons/fc";
import LanguageSpellingListAsarlar from "./details/LanguageSpellingListAsarlar";
import LanguageSpellingListHikmatlar from "./details/LanguageSpellingListHikmatlar";
import LanguageSpellingListMaqolalar from "./details/LanguageSpellingListMaqolalar";
import style from "./languageSpellingList.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";

function LanguageSpellingList() {
  const { type } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const valueRef = useRef();

  const handleClick = (value) => {
    const token = localStorage.getItem("token");
    if (token) {
      window.open(value?.file, "_blank");
    } else {
      navigate("/login");
    }
  };

  const handleClickTelegram = (value) => {
    const token = localStorage.getItem("token");
    if (token) {
      const telegramURL = `https://t.me/share/url?url=${encodeURIComponent(
        value?.file
      )}`;
      window.open(telegramURL, "_blank");
    } else {
      navigate("/login");
    }
  };

  const SearchBtn = () => {
    setSearchValue(valueRef?.current?.value);
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.menu_link}>
          <button onClick={() => navigate("/")}>
            {t("eshituv.bosh_sahifa")}
          </button>
          <span>/</span>

          <button onClick={() => navigate("/")}>{t("navbar.tilvaimlo")}</button>
          <span>/</span>

          <button>
            {type === "asarlar" && t("navbar.asarlar")}
            {type === "maqolalar" && t("navbar.maqolalar")}
            {type === "hikmatlar" && t("navbar.hikmatlar")}
          </button>
        </div>

        <div className={style.search}>
          <input
            type="search"
            autoCapitalize="off"
            ref={valueRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") SearchBtn();
            }}
          />
          <FcSearch onClick={SearchBtn} />
        </div>

        <div className={style.page_tab}>
          <button
            style={type === "asarlar" ? { color: "#203867" } : {}}
            className={`${type === "asarlar" ? style.active : ""}`}
            onClick={() => navigate("/languageSpelling/asarlar")}
          >
            {t("navbar.asarlar")}
          </button>

          <button
            style={type === "maqolalar" ? { color: "#203867" } : {}}
            className={`${type === "maqolalar" ? style.active : ""}`}
            onClick={() => navigate("/languageSpelling/maqolalar")}
          >
            {t("navbar.maqolalar")}
          </button>

          <button
            style={type === "hikmatlar" ? { color: "#203867" } : {}}
            className={`${type === "hikmatlar" ? style.active : ""}`}
            onClick={() => navigate("/languageSpelling/hikmatlar")}
          >
            {t("navbar.hikmatlar")}
          </button>
        </div>

        {type === "asarlar" && (
          <LanguageSpellingListAsarlar
            handleClick={handleClick}
            handleClickTelegram={handleClickTelegram}
            searchValue={searchValue}
          />
        )}

        {type === "maqolalar" && (
          <LanguageSpellingListMaqolalar
            handleClick={handleClick}
            handleClickTelegram={handleClickTelegram}
            searchValue={searchValue}
          />
        )}

        {type === "hikmatlar" && <LanguageSpellingListHikmatlar />}
      </div>
    </div>
  );
}

export default LanguageSpellingList;
