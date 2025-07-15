import { useParams } from "react-router-dom";
import style from "./eventsList.module.scss";
import News from "./details/News";
import Meeting from "./details/Meeting";
import Seminars from "./details/Seminars";
import { useTranslation } from "react-i18next";

function EventsList() {
  const { type } = useParams();
  const { t } = useTranslation();

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.menu_link}>
          <button onClick={() => navigate("/")}>
            {t("eshituv.bosh_sahifa")}
          </button>
          <span>/</span>

          <button onClick={() => navigate("/")}>
            {type === "yangiliklar" && t("navbar.yangiliklar")}
            {type === "yiginlar" && t("navbar.yiginlar")}
            {type === "seminarlar" && t("navbar.seminarlar")}
          </button>
          <span>/</span>
        </div>

        <h1>
          {type === "yangiliklar" && t("navbar.yangiliklar")}
          {type === "yiginlar" && t("navbar.yiginlar")}
          {type === "seminarlar" && t("navbar.seminarlar")}
        </h1>

        {type === "yangiliklar" && <News />}
        {type === "yiginlar" && <Meeting />}
        {type === "seminarlar" && <Seminars />}
      </div>
    </div>
  );
}

export default EventsList;
