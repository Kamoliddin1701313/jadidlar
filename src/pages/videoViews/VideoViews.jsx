import { useEffect, useState } from "react";
import style from "./videoViews.module.scss";
import axios from "axios";
import { Fade } from "react-awesome-reveal";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function VideoViews() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  console.log(pathname, "ww");

  // https://backend.jadidlar.uz/api/videolar/104
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
    navigate(`/koruvlar/id`);
  };

  const videoItem = data.find((item) => item.id.toString() === id);
  console.log(videoItem, "videoItem");

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
          {/* {pathname == `/koruvlar/${id}` ? (
            <Fade cascade damping={0.2} className={style.video}>
              <iframe src={videoItem?.link}></iframe>
            </Fade>
          ) : (
            <Fade cascade damping={0.2} className={style.video}>
              <iframe
                src={activeVideo == null ? data[0]?.link : activeVideo?.link}
              ></iframe>
            </Fade>
          )} */}

          {pathname == `/koruvlar/id` ? (
            <Fade cascade damping={0.2} className={style.video}>
              <iframe
                src={activeVideo == null ? data[0]?.link : activeVideo?.link}
              ></iframe>
            </Fade>
          ) : (
            <Fade cascade damping={0.2} className={style.video}>
              <iframe src={videoItem?.link}></iframe>
            </Fade>
          )}

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
