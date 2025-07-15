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

function JadidListId() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();

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
    { id: 1, name: "Jadid haqida", active_tab: "jadid" },
    { id: 2, name: "Asarlar ", active_tab: "asarlar" },
    { id: 3, name: "Maqolalar", active_tab: "maqolalar" },
    { id: 4, name: "She'rlar", active_tab: "sherlar" },
    { id: 5, name: "Esdaliklar", active_tab: "esdalik" },
    { id: 6, name: "Hikimatli so'zlar", active_tab: "hikimatli" },
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
          <button onClick={() => navigate("/")}>Bosh sahifa</button>
          <span>/</span>

          <button onClick={() => navigate(-1)}>Jadidlar</button>
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
