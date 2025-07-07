import style from "./researchList.module.scss";
import { FcSearch } from "react-icons/fc";
import { useNavigate, useParams } from "react-router-dom";
import ResearchListAsarlar from "./details/ResearchListAsarlar";
import ResearchListMaqolalar from "./details/ResearchListMaqolalar";
import ResearchListDissertatsiya from "./details/ResearchListDissertatsiya";
import ResearchListEsdaliklar from "./details/ResearchListEsdaliklar";

function ResearchList() {
  const { type } = useParams();
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.menu_link}>
          <button onClick={() => navigate("/")}>Bosh sahifa</button>
          <span>/</span>

          <button onClick={() => navigate("/")}>Izlanishlar</button>
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
            onClick={() => navigate("/research/asarlar")}
          >
            Asarlar
          </button>

          <button
            style={type === "maqolalar" ? { color: "#203867" } : {}}
            className={`${type === "maqolalar" ? style.active : ""}`}
            onClick={() => navigate("/research/maqolalar")}
          >
            Maqolalar
          </button>

          <button
            style={type === "dissertatsiyalar" ? { color: "#203867" } : {}}
            className={`${type === "dissertatsiyalar" ? style.active : ""}`}
            onClick={() => navigate("/research/dissertatsiyalar")}
          >
            Dissertatsiyalar
          </button>

          <button
            style={type === "esdaliklar" ? { color: "#203867" } : {}}
            className={`${type === "esdaliklar" ? style.active : ""}`}
            onClick={() => navigate("/research/esdaliklar")}
          >
            Esdaliklar
          </button>
        </div>

        {type === "asarlar" && <ResearchListAsarlar />}

        {type === "maqolalar" && <ResearchListMaqolalar />}

        {type === "dissertatsiyalar" && <ResearchListDissertatsiya />}

        {type === "esdaliklar" && <ResearchListEsdaliklar />}
      </div>
    </div>
  );
}

export default ResearchList;
