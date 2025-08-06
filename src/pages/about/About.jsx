import { useEffect, useState } from "react";
import style from "./about.module.scss";
import axios from "axios";
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";

function About() {
  const [page, setPage] = useState([]);
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();

  const GetPage = async () => {
    try {
      const langMap = {
        uzl: "uz",
        uzk: "ru",
        eng: "en",
      };
      const lang = langMap[i18n.language] || "uz";

      const respons = await axios.get("sahifalar/", {
        headers: {
          "Accept-Language": lang,
        },
      });

      const respons2 = await axios.get("ishtirokchilar/", {
        headers: {
          "Accept-Language": lang,
        },
      });

      setPage(respons);
      setData(respons2);
    } catch (error) {
      console.log(error, "ABOUT SAXIFASIDAN ERROR CHIQAYABDI");
    }
  };

  useEffect(() => {
    GetPage();
  }, [i18n.language]);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.menu_link}>
          <button onClick={() => navigate("/")}>
            {t("eshituv.bosh_sahifa")}
          </button>
          <span>/</span>

          <button onClick={() => navigate("/")}>
            {t("navbar.bizhaqimizda")}
          </button>
          <span>/</span>
        </div>

        <div className={style.page_wrapper}>
          {page?.data?.results &&
            page?.data?.results?.map((value, index) => (
              <div key={index} className={style.page_card}>
                <h1>{value.title}</h1>

                <div className={style.item_wrapper}>
                  <div className={style.img}>
                    <img loading="lazy" src={value.image} alt={value.title} />
                  </div>

                  <div
                    dangerouslySetInnerHTML={{ __html: value.text }}
                    className={style.text}
                  ></div>
                </div>
              </div>
            ))}
        </div>

        <div className={style.lineX}></div>

        <h1>{t("eshituv.ishtirokchilar")}</h1>

        <div className={style.users}>
          {data?.data?.results?.map((value, index) => (
            <div key={index} className={style.user_about}>
              <Fade
                cascade
                damping={0.2}
                triggerOnce
                className={style.user_img}
              >
                <img loading="lazy" src={value?.image} alt={value?.fullname} />
              </Fade>

              <div className={style.user_description}>
                <p className={style.name}>{value?.fullname}</p>
                <p className={style.position}>
                  {value?.position} {value?.degree}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
