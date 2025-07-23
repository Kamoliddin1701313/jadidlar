import axios from "axios";
import style from "./eventsListDetails.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PiTelegramLogoBold } from "react-icons/pi";
import { useTranslation } from "react-i18next";

function EventsListDetails() {
  const { type, id } = useParams();
  const [data, setData] = useState({});
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
      const respons = await axios.get(`kanferensiyalar/${id}`, {
        headers: {
          "Accept-Language": lang,
        },
      });
      setData(respons?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [i18n.language]);

  console.log(data, "MEN SHO'TAMAN");

  return (
    <div className={style.container}>
      <div className={style.prev_btn}>
        <button onClick={() => navigate("/")}>
          {t("eshituv.bosh_sahifa")}
        </button>
        <button className={style.slesh_line}>/</button>
        <button onClick={() => navigate(-1)}>
          {type === "yiginlar"
            ? t("dataname.yiginlar")
            : t("dataname.seminarlar")}
        </button>
        <button className={style.slesh_line}>/</button>
        <span>{data?.title}</span>
      </div>

      <div className={style.wrapper}>
        <h2>{data?.title}</h2>

        <div
          className={style.text}
          dangerouslySetInnerHTML={{ __html: data?.text }}
        ></div>

        <div className={style.share_card}>
          <div className={style.share_btn}>
            <h3>{t("dataname.ulashish")}</h3>

            <a
              href={`https://t.me/share/url?url=https://jadidlarimiz.uz/${type}/${id}&text=Siz uchun qiziqarli maqola`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PiTelegramLogoBold />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsListDetails;
