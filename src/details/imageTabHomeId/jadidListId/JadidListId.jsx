import { useNavigate, useParams } from "react-router-dom";
import style from "./jadidListId.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import JadidListIdJadid from "./JadidListIdJadid";
import JadidListIdAsarlar from "./JadidListIdAsarlar";
import JadidListIdMaqola from "./JadidListIdMaqola";
import JadidListIdSherlar from "./JadidListIdSherlar";
import JadidListIdEsdalik from "./JadidListIdEsdalik";
import JadidListIdHikmatli from "./JadidListIdHikmatli";
import { useTranslation } from "react-i18next";

function JadidListId() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const { t } = useTranslation();

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

  const [tab, setTab] = useState("jadid");

  const tab_page = [
    { id: 1, name: t("navbar.jadidlarhaqida"), active_tab: "jadid" },
    { id: 2, name: t("navbar.asarlar"), active_tab: "asarlar" },
    { id: 3, name: t("navbar.maqolalar"), active_tab: "maqolalar" },
    { id: 4, name: t("navbar.sherlar"), active_tab: "sherlar" },
    { id: 5, name: t("navbar.esdaliklar"), active_tab: "esdalik" },
    { id: 6, name: t("navbar.hikmatlarsozlar"), active_tab: "hikimatli" },
  ];

  const getData = async () => {
    const respons = await axios.get(`jadidlar/${id}`);
    setData(respons?.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.menu_link}>
          <button onClick={() => navigate("/")}>
            {t("eshituv.bosh_sahifa")}
          </button>
          <span>/</span>

          <button onClick={() => navigate(-1)}>{t("navbar.jadidlar")}</button>
          <span>/</span>
        </div>

        <div className={style.tab_page}>
          {tab_page.map((value, index) => (
            <button
              key={index}
              onClick={() => setTab(value.active_tab)}
              className={`${tab == value.active_tab ? style.active : ""}`}
            >
              {value.name}
            </button>
          ))}
        </div>

        {tab == "jadid" && <JadidListIdJadid data={data} />}

        {tab == "asarlar" && (
          <JadidListIdAsarlar
            data={data}
            handleClick={handleClick}
            handleClickTelegram={handleClickTelegram}
          />
        )}

        {tab == "maqolalar" && (
          <JadidListIdMaqola
            data={data}
            handleClick={handleClick}
            handleClickTelegram={handleClickTelegram}
          />
        )}

        {tab == "sherlar" && (
          <JadidListIdSherlar
            data={data}
            handleClick={handleClick}
            handleClickTelegram={handleClickTelegram}
          />
        )}

        {tab == "esdalik" && (
          <JadidListIdEsdalik
            data={data}
            handleClick={handleClick}
            handleClickTelegram={handleClickTelegram}
          />
        )}

        {tab == "hikimatli" && <JadidListIdHikmatli data={data} />}
      </div>
    </div>
  );
}

export default JadidListId;
