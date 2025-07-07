import { FcSearch } from "react-icons/fc";
import LanguageSpellingListAsarlar from "./details/LanguageSpellingListAsarlar";
import LanguageSpellingListHikmatlar from "./details/LanguageSpellingListHikmatlar";
import LanguageSpellingListMaqolalar from "./details/LanguageSpellingListMaqolalar";
import style from "./languageSpellingList.module.scss";
import { useNavigate, useParams } from "react-router-dom";

function LanguageSpellingList() {
  const { type } = useParams();
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.menu_link}>
          <button onClick={() => navigate("/")}>Bosh sahifa</button>
          <span>/</span>

          <button onClick={() => navigate("/")}>Til va imlo</button>
          <span>/</span>

          <button>{type}</button>
        </div>

        <div className={style.search}>
          <input type="search" autoCapitalize="off" />
          <FcSearch />
        </div>

        <div className={style.page_tab}>
          <button
            style={type === "asarlar" ? { color: "#203867" } : {}}
            className={`${type === "asarlar" ? style.active : ""}`}
            onClick={() => navigate("/languageSpelling/asarlar")}
          >
            Asarlar
          </button>

          <button
            style={type === "maqolalar" ? { color: "#203867" } : {}}
            className={`${type === "maqolalar" ? style.active : ""}`}
            onClick={() => navigate("/languageSpelling/maqolalar")}
          >
            Maqolalar
          </button>

          <button
            style={type === "hikmatlar" ? { color: "#203867" } : {}}
            className={`${type === "hikmatlar" ? style.active : ""}`}
            onClick={() => navigate("/languageSpelling/hikmatlar")}
          >
            Hikmatlar
          </button>
        </div>

        {type === "asarlar" && <LanguageSpellingListAsarlar />}

        {type === "maqolalar" && <LanguageSpellingListMaqolalar />}

        {type === "hikmatlar" && <LanguageSpellingListHikmatlar />}
      </div>
    </div>
  );
}

export default LanguageSpellingList;
