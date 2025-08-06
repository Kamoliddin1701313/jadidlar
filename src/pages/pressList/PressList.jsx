import { useLocation, useNavigate, useParams } from "react-router-dom";
import style from "./pressList.module.scss";
import { FcSearch } from "react-icons/fc";
import HistorySection from "./details/HistorySection";
import PoliticsSection from "./details/PoliticsSection";
import EconomySection from "./details/EconomySection";
import CultureAndArtSection from "./details/CultureAndArtSection";
import SocialAndReligionSection from "./details/SocialAndReligionSection";
import LiteratureSection from "./details/LiteratureSection";
import EducationAndUpbringingSection from "./details/EducationAndUpbringingSection";
import OtherTopicsSection from "./details/OtherTopicsSection";
import BibliographicIndexSection from "./details/BibliographicIndexSection";
import { useTranslation } from "react-i18next";
import { useCallback, useRef, useState } from "react";

function PressList() {
  const { pathname } = useLocation();
  const { type } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const valueRef = useRef();

  const handleClick = useCallback((value) => {
    const token = localStorage.getItem("token");
    if (token) {
      window.open(value?.file, "_blank");
    } else {
      navigate("/login");
    }
  }, []);

  const handleClickTelegram = useCallback((value) => {
    const token = localStorage.getItem("token");
    if (token) {
      const telegramURL = `https://t.me/share/url?url=${encodeURIComponent(
        value?.file
      )}`;
      window.open(telegramURL, "_blank");
    } else {
      navigate("/login");
    }
  }, []);

  const SearchBtn = useCallback(() => {
    setSearchValue(valueRef?.current?.value);
  }, []);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.menu_link}>
          <button onClick={() => navigate("/")}>
            {t("eshituv.bosh_sahifa")}
          </button>

          <span>/</span>

          <button onClick={() => navigate("/")}>{t("navbar.matbuot")}</button>
          <span>/</span>

          <button>
            {type === "tarix" && t("eshituv.tarix")}

            {pathname === "/press/siyosat" && t("eshituv.siyosat")}

            {pathname === "/press/iqtisod" && t("eshituv.iqtisod")}

            {pathname === "/press/madaniyat_va_sa'nat" &&
              t("eshituv.madaniyat_va_sanat")}

            {pathname === "/press/ijtimoiy_masalalar_va_din" &&
              t("eshituv.ijtimoiy_masalalar")}

            {pathname === "/press/adabiyot" && t("eshituv.adabiyot")}

            {pathname === "/press/ta'lim_tarbiya" && t("eshituv.talim_tarbiya")}

            {pathname === "/press/boshqa_masalalar" &&
              t("eshituv.boshqa_masalalar")}

            {pathname === "/press/bibliografik_ko'rsatkich" &&
              t("eshituv.bibliografik_korsatkich")}
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
            style={type === "tarix" ? { color: "#203867" } : {}}
            className={`${type === "tarix" ? style.active : ""}`}
            onClick={() => navigate("/press/tarix")}
          >
            {t("eshituv.tarix")}
          </button>

          <button
            style={pathname === "/press/siyosat" ? { color: "#203867" } : {}}
            className={`${pathname === "/press/siyosat" ? style.active : ""}`}
            onClick={() => navigate("/press/siyosat")}
          >
            {t("eshituv.siyosat")}
          </button>

          {/* 1 */}
          <button
            style={pathname === "/press/iqtisod" ? { color: "#203867" } : {}}
            className={`${pathname === "/press/iqtisod" ? style.active : ""}`}
            onClick={() => navigate("/press/iqtisod")}
          >
            {t("eshituv.iqtisod")}
          </button>

          {/* 2 */}
          <button
            style={
              pathname === "/press/madaniyat_va_sa'nat"
                ? { color: "#203867" }
                : {}
            }
            className={`${
              pathname === "/press/madaniyat_va_sa'nat" ? style.active : ""
            }`}
            onClick={() => navigate("/press/madaniyat_va_sa'nat")}
          >
            {t("eshituv.madaniyat_va_sanat")}
          </button>

          {/* 3 */}
          <button
            style={
              pathname === "/press/ijtimoiy_masalalar_va_din"
                ? { color: "#203867" }
                : {}
            }
            className={`${
              pathname === "/press/ijtimoiy_masalalar_va_din"
                ? style.active
                : ""
            }`}
            onClick={() => navigate("/press/ijtimoiy_masalalar_va_din")}
          >
            {t("eshituv.ijtimoiy_masalalar")}
          </button>

          {/* 4 */}
          <button
            style={pathname === "/press/adabiyot" ? { color: "#203867" } : {}}
            className={`${pathname === "/press/adabiyot" ? style.active : ""}`}
            onClick={() => navigate("/press/adabiyot")}
          >
            {t("eshituv.adabiyot")}
          </button>

          {/* 5 */}
          <button
            style={
              pathname === "/press/ta'lim_tarbiya" ? { color: "#203867" } : {}
            }
            className={`${
              pathname === "/press/ta'lim_tarbiya" ? style.active : ""
            }`}
            onClick={() => navigate("/press/ta'lim_tarbiya")}
          >
            {t("eshituv.talim_tarbiya")}
          </button>

          {/* 6 */}
          <button
            style={
              pathname === "/press/boshqa_masalalar" ? { color: "#203867" } : {}
            }
            className={`${
              pathname === "/press/boshqa_masalalar" ? style.active : ""
            }`}
            onClick={() => navigate("/press/boshqa_masalalar")}
          >
            {t("eshituv.boshqa_masalalar")}
          </button>

          {/* 7 */}
          <button
            style={
              pathname === "/press/bibliografik_ko'rsatkich"
                ? { color: "#203867" }
                : {}
            }
            className={`${
              pathname === "/press/bibliografik_ko'rsatkich" ? style.active : ""
            }`}
            onClick={() => navigate("/press/bibliografik_ko'rsatkich")}
          >
            {t("eshituv.bibliografik_korsatkich")}
          </button>
        </div>

        {type === "tarix" && (
          <HistorySection
            handleClick={handleClick}
            handleClickTelegram={handleClickTelegram}
            searchValue={searchValue}
          />
        )}

        {pathname === "/press/siyosat" && (
          <PoliticsSection
            handleClick={handleClick}
            handleClickTelegram={handleClickTelegram}
            searchValue={searchValue}
          />
        )}

        {pathname === "/press/iqtisod" && (
          <EconomySection
            handleClick={handleClick}
            handleClickTelegram={handleClickTelegram}
            searchValue={searchValue}
          />
        )}

        {pathname === "/press/madaniyat_va_sa'nat" && (
          <CultureAndArtSection
            handleClick={handleClick}
            handleClickTelegram={handleClickTelegram}
            searchValue={searchValue}
          />
        )}

        {pathname === "/press/ijtimoiy_masalalar_va_din" && (
          <SocialAndReligionSection
            handleClick={handleClick}
            handleClickTelegram={handleClickTelegram}
            searchValue={searchValue}
          />
        )}

        {pathname === "/press/adabiyot" && (
          <LiteratureSection
            handleClick={handleClick}
            handleClickTelegram={handleClickTelegram}
            searchValue={searchValue}
          />
        )}

        {pathname === "/press/ta'lim_tarbiya" && (
          <EducationAndUpbringingSection
            handleClick={handleClick}
            handleClickTelegram={handleClickTelegram}
            searchValue={searchValue}
          />
        )}

        {pathname === "/press/boshqa_masalalar" && (
          <OtherTopicsSection
            handleClick={handleClick}
            handleClickTelegram={handleClickTelegram}
            searchValue={searchValue}
          />
        )}

        {pathname === "/press/bibliografik_ko'rsatkich" && (
          <BibliographicIndexSection
            handleClick={handleClick}
            handleClickTelegram={handleClickTelegram}
            searchValue={searchValue}
          />
        )}
      </div>
    </div>
  );
}

export default PressList;
