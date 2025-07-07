import style from "./sourcesHome.module.scss";
import { MdOutlineFileDownload } from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";
import axios from "axios";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";

function SourcesHome() {
  const [datas, setDatas] = useState([]);
  const [datas2, setDatas2] = useState([]);
  const [avtiveTab, setActiveTab] = useState(1);

  const getData = async () => {
    try {
      const respons = await axios.get("arxiv_random/");
      const respons2 = await axios.get("maqolalar_random_matbuot_iqtisod/");

      setDatas(respons?.data);

      setDatas2(respons2?.data);
    } catch (error) {
      console.log("errpr", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.hero_slider}>
        <h1 className={style.home_name}>Manbalar</h1>

        <div className={style.active_link}>
          <button
            style={avtiveTab === 1 ? { color: "#203867" } : {}}
            className={`${avtiveTab === 1 ? style.active : ""}`}
            onClick={() => setActiveTab(1)}
          >
            Arxiv hujjatlari
          </button>

          <button
            style={avtiveTab === 2 ? { color: "#203867" } : {}}
            className={`${avtiveTab === 2 ? style.active : ""}`}
            onClick={() => setActiveTab(2)}
          >
            Matbuot
          </button>
        </div>

        <div className={style.line}></div>

        {datas?.length > 0 ? (
          <div className={style.wrapper}>
            {avtiveTab === 1
              ? datas?.map((value, index) => (
                  <div className={style.card} key={index}>
                    <div className={style.link}>
                      <span>
                        <a
                          href={value.file}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MdOutlineFileDownload />
                        </a>
                      </span>

                      <span>
                        <a
                          href="https://t.me/Kamol7602"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <RiShareForwardLine />
                        </a>
                      </span>
                    </div>

                    <Fade cascade damping={0.2} className={style.img}>
                      <img src={value?.image} alt={value?.title} />
                    </Fade>

                    <div className={style.text}>
                      <h4>{value?.title}</h4>
                    </div>
                  </div>
                ))
              : datas2.map((value, index) => (
                  <div className={style.card} key={index}>
                    <div className={style.link}>
                      <span>
                        <a
                          href={value.file}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MdOutlineFileDownload />
                        </a>
                      </span>

                      <span>
                        <a
                          href="https://t.me/Kamol7602"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <RiShareForwardLine />
                        </a>
                      </span>
                    </div>

                    <Fade cascade damping={0.2} className={style.img}>
                      <img src={value?.image} alt={value?.title} />
                    </Fade>

                    <div className={style.text}>
                      <h4>{value?.title}</h4>
                    </div>
                  </div>
                ))}
          </div>
        ) : (
          <div>NO DATA</div>
        )}

        <div className={style.line}></div>
      </div>
    </div>
  );
}

export default SourcesHome;
