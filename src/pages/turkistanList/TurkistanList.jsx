import { useNavigate, useParams } from "react-router-dom";
import style from "./turkistanList.module.scss";
import { FcSearch } from "react-icons/fc";
import TurkistanListSherlar from "./details/TurkistanListSherlar";
import TurkistanListEsdaliklar from "./details/TurkistanListEsdaliklar";
import TurkistanListMaqolalar from "./details/TurkistanListMaqolalar";
import TurkistanListAsarlar from "./details/TurkistanListAsarlar";

function TurkistanList() {
  const { type } = useParams();
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.menu_link}>
          <button onClick={() => navigate("/")}>Bosh sahifa</button>
          <span>/</span>

          <button onClick={() => navigate("/")}>Turkiston muxtoriyati</button>
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
            onClick={() => navigate("/turkistan/asarlar")}
          >
            Asarlar
          </button>

          <button
            style={type === "maqolalar" ? { color: "#203867" } : {}}
            className={`${type === "maqolalar" ? style.active : ""}`}
            onClick={() => navigate("/turkistan/maqolalar")}
          >
            Maqolalar
          </button>

          <button
            style={type === "sherlar" ? { color: "#203867" } : {}}
            className={`${type === "sherlar" ? style.active : ""}`}
            onClick={() => navigate("/turkistan/sherlar")}
          >
            Sherlar
          </button>

          <button
            style={type === "esdaliklar" ? { color: "#203867" } : {}}
            className={`${type === "esdaliklar" ? style.active : ""}`}
            onClick={() => navigate("/turkistan/esdaliklar")}
          >
            Esdaliklar
          </button>
        </div>

        {type === "asarlar" && <TurkistanListAsarlar />}

        {type === "maqolalar" && <TurkistanListMaqolalar />}

        {type === "sherlar" && <TurkistanListSherlar />}

        {type === "esdaliklar" && <TurkistanListEsdaliklar />}
      </div>
    </div>
  );
}

export default TurkistanList;
