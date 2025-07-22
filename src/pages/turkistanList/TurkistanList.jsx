import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./turkistanList.module.scss";
import { FcSearch } from "react-icons/fc";
import TurkistanListSherlar from "./details/TurkistanListSherlar";
import TurkistanListEsdaliklar from "./details/TurkistanListEsdaliklar";
import TurkistanListMaqolalar from "./details/TurkistanListMaqolalar";
import TurkistanListAsarlar from "./details/TurkistanListAsarlar";
import { useTranslation } from "react-i18next";

function TurkistanList() {
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

          <button onClick={() => navigate("/")}>
            {t("navbar.turkistonmuxtoriyati")}
          </button>
          <span>/</span>

          <button>
            {type === "asarlar" && t("navbar.asarlar")}
            {type === "maqolalar" && t("navbar.maqolalar")}
            {type === "sherlar" && t("navbar.sherlar")}
            {type === "esdaliklar" && t("navbar.esdaliklar")}
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
            onClick={() => navigate("/turkistan/asarlar")}
          >
            {t("navbar.asarlar")}
          </button>

          <button
            style={type === "maqolalar" ? { color: "#203867" } : {}}
            className={`${type === "maqolalar" ? style.active : ""}`}
            onClick={() => navigate("/turkistan/maqolalar")}
          >
            {t("navbar.maqolalar")}
          </button>

          <button
            style={type === "sherlar" ? { color: "#203867" } : {}}
            className={`${type === "sherlar" ? style.active : ""}`}
            onClick={() => navigate("/turkistan/sherlar")}
          >
            {t("navbar.sherlar")}
          </button>

          <button
            style={type === "esdaliklar" ? { color: "#203867" } : {}}
            className={`${type === "esdaliklar" ? style.active : ""}`}
            onClick={() => navigate("/turkistan/esdaliklar")}
          >
            {t("navbar.esdaliklar")}
          </button>
        </div>

        {type === "asarlar" && (
          <TurkistanListAsarlar
            handleClick={handleClick}
            handleClickTelegram={handleClickTelegram}
            searchValue={searchValue}
          />
        )}

        {type === "maqolalar" && (
          <TurkistanListMaqolalar
            handleClick={handleClick}
            handleClickTelegram={handleClickTelegram}
            searchValue={searchValue}
          />
        )}

        {type === "sherlar" && (
          <TurkistanListSherlar
            handleClick={handleClick}
            handleClickTelegram={handleClickTelegram}
            searchValue={searchValue}
          />
        )}

        {type === "esdaliklar" && (
          <TurkistanListEsdaliklar
            handleClick={handleClick}
            handleClickTelegram={handleClickTelegram}
            searchValue={searchValue}
          />
        )}
      </div>
    </div>
  );
}

export default TurkistanList;
