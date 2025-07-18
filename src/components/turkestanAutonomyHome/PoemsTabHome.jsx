import style from "./turkestanAutonomyHome.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";
import { MdOutlineFileDownload } from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";

function PoemsTabHome({ handleClick, handleClickTelegram }) {
  const [data, setData] = useState([]);
  const { i18n } = useTranslation();

  const getData = async () => {
    try {
      const langMap = {
        uzl: "uz",
        uzk: "ru",
        eng: "en",
      };
      const lang = langMap[i18n.language] || "uz";

      const respons = await axios.get("hotiralar_random_turkiston/", {
        headers: {
          "Accept-Language": lang,
        },
      });

      setData(respons?.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    getData();
  }, [i18n.language]);

  return (
    <div className={style.tab_container}>
      {data.map((value, index) => (
        <div className={style.card} key={index}>
          <div className={style.link}>
            <button onClick={() => handleClick(value)}>
              <MdOutlineFileDownload />
            </button>

            <a onClick={() => handleClickTelegram(value)}>
              <RiShareForwardLine />
            </a>
          </div>

          <Fade cascade damping={0.2} className={style.img}>
            <img src={value?.image} loading="eager" alt={value?.title} />
          </Fade>

          <div className={style.text}>
            <button onClick={() => handleClick(value)}>{value?.title}</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PoemsTabHome;
