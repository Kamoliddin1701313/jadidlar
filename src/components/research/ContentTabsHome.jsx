import axios from "axios";
import style from "./research.module.scss";
import { useEffect, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";
import { Fade } from "react-awesome-reveal";

function ContentTabsHome() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const respons = await axios.get("dissertatsiya_random/");
      setData(respons?.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={style.tab_container}>
      {data.map((value, index) => (
        <div className={style.card} key={index}>
          <div className={style.link}>
            <span>
              <button onClick={() => handleClick(value)}>
                <MdOutlineFileDownload />
              </button>
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
            <button onClick={() => handleClick(value)}>{value?.title}</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContentTabsHome;
