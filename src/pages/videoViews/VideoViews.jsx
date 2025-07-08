import { useEffect, useState } from "react";
import style from "./videoViews.module.scss";
import axios from "axios";
import { Fade } from "react-awesome-reveal";

function VideoViews() {
  const [data, setData] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);

  const getData = async () => {
    try {
      const respons = await axios.get("videolar/");
      setData(respons?.data?.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const ActiveVideoBtn = (id) => {
    setActiveVideo(id);
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.menu_link}>
          <button onClick={() => navigate("/")}>Bosh sahifa</button>
          <span>/</span>

          <button onClick={() => navigate("/")}>Koʻruvlar</button>
          <span>/</span>

          <button>
            {activeVideo == null ? data[0]?.title : activeVideo?.title}
          </button>
        </div>

        <div className={style.video_container}>
          <Fade cascade damping={0.2} className={style.video}>
            <iframe
              src={activeVideo == null ? data[0]?.link : activeVideo?.link}
            ></iframe>
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
