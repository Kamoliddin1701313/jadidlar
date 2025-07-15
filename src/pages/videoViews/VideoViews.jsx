import { useEffect, useState } from "react";
import style from "./videoViews.module.scss";
import axios from "axios";
import { Fade } from "react-awesome-reveal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function VideoViews() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const { pathname } = useLocation();
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

      const respons = await axios.get("videolar/", {
        headers: {
          "Accept-Language": lang,
        },
      });

      setData(respons?.data?.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getData();
  }, [i18n.language]);

  const ActiveVideoBtn = (video) => {
    setActiveVideo(video);
    navigate(`/koruvlar/${video.id}`);
  };

  const videoItem = data.find((item) => item.id.toString() === id);

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    return url;
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.menu_link}>
          <button onClick={() => navigate("/")}>
            {t("eshituv.bosh_sahifa")}
          </button>
          <span>/</span>

          <button onClick={() => navigate("/")}>{t("eshituv.koruvlar")}</button>
          <span>/</span>

          <button>
            {activeVideo == null ? data[0]?.title : activeVideo?.title}
          </button>
        </div>

        <div className={style.video_container}>
          {/* <Fade cascade damping={0.2} className={style.video}>
            {pathname === `/koruvlar/${id}` ? (
              videoItem?.link ? (
                <iframe
                  src={getEmbedUrl(videoItem.link)}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  width="100%"
                  height="500"
                  frameBorder="0"
                ></iframe>
              ) : videoItem?.video == null ? (
                <video
                  src={`https://your-backend.com/${activeVideo?.video}`}
                  controls
                  width="100%"
                  height="500"
                  style={{ borderRadius: "12px" }}
                />
              ) : null
            ) : activeVideo?.link == null ? (
              <iframe
                src={getEmbedUrl(activeVideo?.link)}
                allow="autoplay; encrypted-media"
                allowFullScreen
                width="100%"
                height="500"
                frameBorder="0"
              ></iframe>
            ) : activeVideo?.video == null || data[0]?.video == null ? (
              <video
                src={activeVideo?.video || data[0]?.video}
                controls
                width="100%"
                height="500"
                style={{ borderRadius: "12px" }}
              />
            ) : null}
          </Fade> */}

          <Fade cascade damping={0.2} className={style.video}>
            {(() => {
              const currentVideo = videoItem || activeVideo || data[0];

              if (!currentVideo) return null;

              if (currentVideo.link && currentVideo.link.includes("youtube")) {
                return (
                  <iframe
                    src={getEmbedUrl(currentVideo.link)}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    width="100%"
                    frameBorder="0"
                  ></iframe>
                );
              } else if (currentVideo.video) {
                return (
                  <video
                    src={currentVideo.video}
                    controls
                    width="100%"
                    style={{ borderRadius: "12px" }}
                  />
                );
              } else {
                return <p>Video mavjud emas</p>;
              }
            })()}
          </Fade>

          <div className={style.videos_wrapper}>
            <div className={style.videos_btn}>
              {data?.map((value, index) => (
                <div key={index} className={style.card}>
                  <button onClick={() => ActiveVideoBtn(value)}>
                    <img src={value?.file} alt={value?.title} />
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

export default VideoViews;
