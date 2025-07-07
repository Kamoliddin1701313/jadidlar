import style from "./languageGrammarTabHome.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { MdOutlineFileDownload } from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";

function ArticlesTabHome() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const respons = await axios.get("maqolalar_random_tilimlo/");
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
              <a href={value.file} target="_blank" rel="noopener noreferrer">
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
  );
}

export default ArticlesTabHome;
