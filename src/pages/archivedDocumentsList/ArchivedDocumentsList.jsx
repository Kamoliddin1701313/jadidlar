import { useLocation, useNavigate, useParams } from "react-router-dom";
import style from "./archivedDocumentsList.module.scss";
import { FcSearch } from "react-icons/fc";
import ArchivedDocumentsListRoyxat from "./details/ArchivedDocumentsListRoyxat";
import ArchivedDocumentsListSkaner from "./details/ArchivedDocumentsListSkaner";

function ArchivedDocumentsList() {
  const { pathname } = useLocation();
  const { type } = useParams();
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.menu_link}>
          <button onClick={() => navigate("/")}>Bosh sahifa</button>
          <span>/</span>

          <button onClick={() => navigate("/")}>Manbalar</button>
          <span>/</span>

          <button>{type}</button>
        </div>

        <div className={style.search}>
          <input type="search" autoCapitalize="off" />
          <FcSearch />
        </div>

        <div className={style.page_tab}>
          <button
            style={type === "royxat" ? { color: "#203867" } : {}}
            className={`${type === "royxat" ? style.active : ""}`}
            onClick={() => navigate("/archivedDocuments/royxat")}
          >
            Ro'yxat
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
            Skaner
          </button>
        </div>

        {type === "royxat" && <ArchivedDocumentsListRoyxat />}

        {pathname === "/archivedDocuments/skaner" && (
          <ArchivedDocumentsListSkaner />
        )}
      </div>
    </div>
  );
}

export default ArchivedDocumentsList;
