import axios from "axios";
import style from "./quickLinksHome.module.scss";
import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";

function QuickLinksHome() {
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();

  const getData = async () => {
    try {
      const langMap = {
        uzl: "uz",
        uzk: "ru",
        eng: "en",
      };
      const lang = langMap[i18n.language] || "uz";

      const respons = await axios.get("foydali_havolalar/", {
        headers: {
          "Accept-Language": lang,
        },
      });

      setData(respons);
    } catch (error) {
      console.log(error, "error QuickLinksHome dan kelayabdi");
    }
  };

  useEffect(() => {
    getData();
  }, [i18n.language]);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <h1>{t("navbar.foydalihavola")}</h1>

        <div className={style.slider_container}>
          <Marquee pauseOnHover={true}>
            {data?.data?.results?.map((value, index) => (
              <a href={value.link}>
                <Fade
                  cascade
                  damping={0.2}
                  key={index}
                  className={style.slider_img}
                >
                  <img
                    loading="lazy"
                    src={value.logo_image}
                    alt={value.title}
                  />
                </Fade>
              </a>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
}

export default QuickLinksHome;
