import axios from "axios";
import { Fade } from "react-awesome-reveal";
import style from "./newsHome.module.scss";
import { useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { useTranslation } from "react-i18next";

function NewsHome() {
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

      const respons = await axios.get("yangiliklar/", {
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
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplaySpeed: 4000,
    autoplay: true,
    initialSlide: 0,
    pauseOnHover: true,

    appendDots: (dots) => <ul>{dots.slice(0, 8)}</ul>,

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
          {datas?.results?.length > 0 ? (
            <div className={style.carusel}>
              <Slider
                ref={(slider) => {
                  sliderRef = slider;
                }}
                {...settings}
              >
                {datas?.results?.map((value, index) => (
                  <Fade
                    cascade
                    damping={0.2}
                    key={index}
                    className={style.card}
                  >
                    <div className={style.card_box}>
                      <div className={style.description}>
                        <h2>{value?.title}</h2>

                        <div className={style.box}>
                          <div className={style.title}>
                            <span>{t("navbar.yangiliklar")}</span>
                            <span>{value?.updated_at.slice(0, 10)}</span>
                          </div>

                          <a href={value?.link}>{t("homepage.toliq")}</a>
                        </div>
                      </div>

                      <div className={style.image}>
                        <img src={value?.image} alt={value?.title} />
                      </div>
                    </div>
                  </Fade>
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
      </div>
      {/* <div className={style.line}></div> */}
    </div>
  );
}

export default NewsHome;
