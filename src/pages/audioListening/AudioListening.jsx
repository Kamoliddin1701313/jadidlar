import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa6";
import style from "./audioListening.module.scss";
import { Fade } from "react-awesome-reveal";
import axios from "axios";
import { useTranslation } from "react-i18next";

function AudioListening() {
  const [data, setData] = useState([]);
  const [clickAudio, setClickAudio] = useState(null);
  const { t, i18n } = useTranslation();

  const getData = async () => {
    try {
      const langMap = {
        uzl: "uz",
        uzk: "ru",
        eng: "en",
      };
      const lang = langMap[i18n.language] || "uz";

      const respons = await axios.get("audiolar/", {
        headers: {
          "Accept-Language": lang,
        },
      });

      setData(respons);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getData();
  }, [i18n.language]);

  const ClickAudio = (id) => {
    setClickAudio(id);
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.menu_link}>
          <button onClick={() => navigate("/")}>
            {t("eshituv.bosh_sahifa")} <span>/</span>
          </button>

          <button onClick={() => navigate("/")}>
            {t("eshituv.eshituvlar")} <span>/</span>
          </button>

          <button>
            {clickAudio == null
              ? data?.data?.results[0]?.title
              : clickAudio.title}
          </button>
        </div>

        <div className={style.audio_container}>
          <div className={style.active_audio}>
            <Fade cascade damping={0.2}>
              <div className={style.img}>
                <img
                  src={
                    clickAudio == null
                      ? data?.data?.results[0]?.image
                      : clickAudio.image
                  }
                  alt={
                    clickAudio == null
                      ? data?.data?.results[0]?.title
                      : clickAudio.title
                  }
                />
              </div>

              {data?.data?.results[0]?.audio && (
                <audio controls className={style.audio}>
                  <source
                    src={data?.data?.results[0]?.audio}
                    type="audio/mpeg"
                  />
                </audio>
              )}
            </Fade>
          </div>

          <div className={style.audio_wrapper}>
            <div className={style.audio_btn}>
              {data?.data?.results?.map((value, index) => (
                <div key={index} className={style.card}>
                  <button onClick={() => ClickAudio(value)}>
                    <FaPlay />
                    <span>{value?.title}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioListening;
