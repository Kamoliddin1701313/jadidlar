import style from "./researchList.module.scss";
import { FcSearch } from "react-icons/fc";
import { useNavigate, useParams } from "react-router-dom";
import ResearchListAsarlar from "./details/ResearchListAsarlar";
import ResearchListMaqolalar from "./details/ResearchListMaqolalar";
import ResearchListDissertatsiya from "./details/ResearchListDissertatsiya";
import ResearchListEsdaliklar from "./details/ResearchListEsdaliklar";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

function ResearchList() {
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

  useEffect(() => {
    setSearchValue("");
    if (valueRef.current) {
      valueRef.current.value = "";
    }
  }, [type]);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.menu_link}>
          <button onClick={() => navigate("/")}>
            {t("eshituv.bosh_sahifa")}
          </button>
          <span>/</span>

          <button onClick={() => navigate("/")}>
            {t("navbar.izlanishlar")}
          </button>
          <span>/</span>

          <button>
            {type === "asarlar" && t("navbar.asarlar")}
            {type === "maqolalar" && t("navbar.maqolalar")}
            {type === "dissertatsiyalar" && t("navbar.dissertatsiyalar")}
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
            onClick={() => navigate("/research/asarlar")}
          >
            {t("navbar.asarlar")}
          </button>

          <button
            style={type === "maqolalar" ? { color: "#203867" } : {}}
            className={`${type === "maqolalar" ? style.active : ""}`}
            onClick={() => navigate("/research/maqolalar")}
          >
            {t("navbar.maqolalar")}
          </button>

          <button
            style={type === "dissertatsiyalar" ? { color: "#203867" } : {}}
            className={`${type === "dissertatsiyalar" ? style.active : ""}`}
            onClick={() => navigate("/research/dissertatsiyalar")}
          >
            {t("navbar.dissertatsiyalar")}
          </button>

          <button
            style={type === "esdaliklar" ? { color: "#203867" } : {}}
            className={`${type === "esdaliklar" ? style.active : ""}`}
            onClick={() => navigate("/research/esdaliklar")}
          >
            {t("navbar.esdaliklar")}
          </button>
        </div>

        {type === "asarlar" && (
          <ResearchListAsarlar
            handleClick={handleClick}
            handleClickTelegram={handleClickTelegram}
            searchValue={searchValue}
          />
        )}

        {type === "maqolalar" && (
          <ResearchListMaqolalar
            handleClick={handleClick}
            handleClickTelegram={handleClickTelegram}
            searchValue={searchValue}
          />
        )}

        {type === "dissertatsiyalar" && (
          <ResearchListDissertatsiya
            handleClick={handleClick}
            handleClickTelegram={handleClickTelegram}
            searchValue={searchValue}
          />
        )}

        {type === "esdaliklar" && (
          <ResearchListEsdaliklar
            handleClick={handleClick}
            handleClickTelegram={handleClickTelegram}
            searchValue={searchValue}
          />
        )}
      </div>
    </div>
  );
}

export default ResearchList;
