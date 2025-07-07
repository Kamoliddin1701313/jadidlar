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

function PressList() {
  const { pathname } = useLocation();
  const { type } = useParams();
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.menu_link}>
          <button onClick={() => navigate("/")}>Bosh sahifa</button>
          <span>/</span>

          <button onClick={() => navigate("/")}>Matbuot</button>
          <span>/</span>

          <button>{type.replace(/_/g, " ")}</button>
        </div>

        <div className={style.search}>
          <input type="search" autoCapitalize="off" />
          <FcSearch />
        </div>

        <div className={style.page_tab}>
          <button
            style={type === "tarix" ? { color: "#203867" } : {}}
            className={`${type === "tarix" ? style.active : ""}`}
            onClick={() => navigate("/press/tarix")}
          >
            Tarix
          </button>

          <button
            style={pathname === "/press/siyosat" ? { color: "#203867" } : {}}
            className={`${pathname === "/press/siyosat" ? style.active : ""}`}
            onClick={() => navigate("/press/siyosat")}
          >
            Siyosat
          </button>

          {/* 1 */}
          <button
            style={pathname === "/press/iqtisod" ? { color: "#203867" } : {}}
            className={`${pathname === "/press/iqtisod" ? style.active : ""}`}
            onClick={() => navigate("/press/iqtisod")}
          >
            Iqtisod
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
            Madaniyat va sa'nat
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
            Ijtimoiy masalalar va din
          </button>

          {/* 4 */}
          <button
            style={pathname === "/press/adabiyot" ? { color: "#203867" } : {}}
            className={`${pathname === "/press/adabiyot" ? style.active : ""}`}
            onClick={() => navigate("/press/adabiyot")}
          >
            Adabiyot
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
            Ta’lim-tarbiya
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
            Boshqa masalalar
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
            Bibliografik ko’rsatkich
          </button>
        </div>

        {type === "tarix" && <HistorySection />}

        {pathname === "/press/siyosat" && <PoliticsSection />}

        {pathname === "/press/iqtisod" && <EconomySection />}

        {pathname === "/press/madaniyat_va_sa'nat" && <CultureAndArtSection />}

        {pathname === "/press/ijtimoiy_masalalar_va_din" && (
          <SocialAndReligionSection />
        )}

        {pathname === "/press/adabiyot" && <LiteratureSection />}

        {pathname === "/press/ta'lim_tarbiya" && (
          <EducationAndUpbringingSection />
        )}

        {pathname === "/press/boshqa_masalalar" && <OtherTopicsSection />}

        {pathname === "/press/bibliografik_ko'rsatkich" && (
          <BibliographicIndexSection />
        )}
      </div>
    </div>
  );
}

export default PressList;
