import axios from "axios";
import style from "./quickLinksHome.module.scss";
import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";

function QuickLinksHome() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const respons = await axios.get("foydali_havolalar/");
      setData(respons);
    } catch (error) {
      console.log(error, "error QuickLinksHome dan kelayabdi");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <h1>Foydali havolalar</h1>

        <div className={style.slider_container}>
          <Marquee pauseOnHover={true}>
            {data?.data?.results?.map((value, index) => (
              <a href={value.link} target="_blank">
                <div key={index} className={style.slider_img}>
                  <img src={value.logo_image} alt={value.title} />
                </div>
              </a>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
}

export default QuickLinksHome;
