import { useLocation, useNavigate, useParams } from "react-router-dom";
import style from "./archivedDocumentsList.module.scss";
import { FcSearch } from "react-icons/fc";
import ArchivedDocumentsListRoyxat from "./details/ArchivedDocumentsListRoyxat";
import ArchivedDocumentsListSkaner from "./details/ArchivedDocumentsListSkaner";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

function ArchivedDocumentsList() {
  const { pathname } = useLocation();
  const { type } = useParams();
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const valueRef = useRef();
  const navigate = useNavigate();

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

          <button onClick={() => navigate("/")}>{t("navbar.manbalar")}</button>
          <span>/</span>

          <button>
            {type === "royxat" && t("navbar.royxat")}
            {pathname === "/archivedDocuments/skaner" && t("navbar.skaner")}
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
            onInput={(e) => {
              if (e.target.value === "") {
                SearchBtn();
              }
            }}
          />

          <FcSearch onClick={SearchBtn} />
        </div>

        <div className={style.page_tab}>
          <button
            style={type === "royxat" ? { color: "#203867" } : {}}
            className={`${type === "royxat" ? style.active : ""}`}
            onClick={() => navigate("/archivedDocuments/royxat")}
          >
            {t("navbar.royxat")}
          </button>

          <button
            style={
              pathname === "/archivedDocuments/skaner"
                ? { color: "#203867" }
                : {}
            }
            className={`${
              pathname === "/archivedDocuments/skaner" ? style.active : ""
            }`}
            onClick={() => navigate("/archivedDocuments/skaner")}
          >
            {t("navbar.skaner")}
          </button>
        </div>

        {type === "royxat" && (
          <ArchivedDocumentsListRoyxat
            handleClick={handleClick}
            handleClickTelegram={handleClickTelegram}
            searchValue={searchValue}
          />
        )}

        {pathname === "/archivedDocuments/skaner" && (
          <ArchivedDocumentsListSkaner
            handleClick={handleClick}
            handleClickTelegram={handleClickTelegram}
            searchValue={searchValue}
          />
        )}
      </div>
    </div>
  );
}

export default ArchivedDocumentsList;
