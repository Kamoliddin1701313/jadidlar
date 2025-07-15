import style from "./jadidlarHome.module.scss";
import { Fade } from "react-awesome-reveal";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { useTranslation } from "react-i18next";

function JadidlarHome() {
  const [datas, setDatas] = useState([]);
  const { t, i18n } = useTranslation();
  let sliderRef = useRef(null);

  const getData = async () => {
    try {
      const langMap = {
        uzl: "uz",
        uzk: "ru",
        eng: "en",
      };
      const lang = langMap[i18n.language] || "uz";

      const respons = await axios.get("jadidlar_random/", {
        headers: {
          "Accept-Language": lang,
        },
      });

      setDatas(respons?.data);
    } catch (error) {
      console.log("errpr", error);
    }
  };

  useEffect(() => {
    getData();
  }, [i18n.language]);

  const next = () => {
    sliderRef.slickNext();
  };

  const previous = () => {
    sliderRef.slickPrev();
  };

  var settings = {
    // dots: true,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplaySpeed: 4000,
    autoplay: true,
    initialSlide: 0,
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1220,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={style.container}>
      <div className={style.hero_slider}>
        <div className="slider-container">
          <h1 className={style.home_name}>{t("navbar.jadidlar")}</h1>
          {datas?.length > 0 ? (
            <div className={style.carusel}>
              <Slider
                ref={(slider) => {
                  sliderRef = slider;
                }}
                {...settings}
              >
                {datas?.map((value, index) => (
                  <div key={index} className={style.card}>
                    <div className={style.card_box}>
                      <Fade cascade damping={0.2} className={style.image}>
                        <img src={value?.image} alt={value?.title} />
                      </Fade>

                      <div className={style.description}>
                        <span className={style.name}>{value?.fullname}</span>

                        <div className={style.data}>
                          <span>
                            {"("}
                            {value.birthday.slice(0, 4)}
                          </span>
                          <span>-</span>
                          <span>
                            {value.die_day.slice(0, 4)} {")"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>

              <button className={style.prev} onClick={previous}>
                <GrFormPrevious />
              </button>

              <button className={style.next} onClick={next}>
                <MdOutlineNavigateNext />
              </button>
            </div>
          ) : (
            <div>NO DATA</div>
          )}
        </div>
        {/* <div className={style.line}></div> */}
      </div>
    </div>
  );
}

export default JadidlarHome;
