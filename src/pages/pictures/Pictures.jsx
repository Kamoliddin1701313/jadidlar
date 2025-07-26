import axios from "axios";
import style from "./pictures.module.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Pictures() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const getData = async () => {
    try {
      const langMap = {
        uzl: "uz",
        uzk: "ru",
        eng: "en",
      };
      const lang = langMap[i18n.language] || "uz";

      const respons = await axios.get("rasmlar/", {
        headers: {
          "Accept-Language": lang,
        },
      });

      setData(respons);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    getData();
  }, [i18n.language]);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.menu_link}>
          <button onClick={() => navigate("/")}>
            {t("eshituv.bosh_sahifa")}
          </button>
          <span>/</span>

          <button onClick={() => navigate("/")}>{t("eshituv.suratlar")}</button>
          <span>/</span>

          <button></button>
        </div>

        <div className={style.img_container}>
          {data?.data?.results?.map((value, index) => (
            <div
              key={index}
              className={style.card}
              onClick={() => navigate(`/images/${value.id}`)}
            >
              <span>{new Date(value.update).toLocaleDateString("ru-RU")}</span>
              <div className={style.img}>
                <img src={value?.image} alt={value?.title} />
              </div>

              <div className={style.text}>
                <p>{value?.title}</p>
                <p>Suratlar jamg'armasi</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pictures;
