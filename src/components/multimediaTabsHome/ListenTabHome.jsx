import axios from "axios";
import style from "./multimediaTabsHome.module.scss";
import { FaPlay } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";

function ListenTabHome() {
  const { i18n } = useTranslation();
  const [listen, setListen] = useState([]);
  const [selectedAudio, setSelectedAudio] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const langMap = {
          uzl: "uz",
          uzk: "ru",
          eng: "en",
        };
        const lang = langMap[i18n.language] || "uz";

        const res = await axios.get("audiolar/", {
          headers: {
            "Accept-Language": lang,
          },
        });

        setListen(res);
        if (res.data?.results?.length > 0) {
          setSelectedAudio(res.data.results[0]);
        }
      } catch (err) {
        console.error("Audio olishda xatolik:", err);
      }
    };
    getData();
  }, [i18n.language]);

  const results = listen?.data?.results || [];

  const audioId = (item) => {
    setSelectedAudio(item);
  };

  return (
    <div className={style.listen_container}>
      {selectedAudio && (
        <div className={style.select_id} key={selectedAudio.id}>
          <Fade cascade damping={0.2} className={style.select_img}>
            <img
              src={selectedAudio.image}
              alt={selectedAudio.title}
              loading="eager"
            />
          </Fade>
          <audio controls className={style.select_audio}>
            <source src={selectedAudio.audio} type="audio/mpeg" />
          </audio>
        </div>
      )}

      <div className={style.audios_box}>
        {results.map((value, index) => (
          <div key={value.id || index}>
            <button
              onClick={() => audioId(value)}
              className={style.select_audio}
            >
              <div className={style.icon}>
                <FaPlay />
              </div>
              <span>{value.title}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListenTabHome;
