import style from "./multimediaTabsHome.module.scss";
import { FaRegCirclePlay } from "react-icons/fa6";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";

function ImageTabHome() {
  const [data, setData] = useState([]);
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const langMap = {
        uzl: "uz",
        uzk: "ru",
        eng: "en",
      };
      const lang = langMap[i18n.language] || "uz";

      const respons = await axios.get("rasmlar/", {
        headers: {
          "Accept-Language": lang,
        },
      });

      setData(respons?.data?.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getData();
  }, [i18n.language]);

  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
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
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 990,
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

  const ImagesHome = (id) => {
    navigate(id);
  };

  return (
    <div className="slider-container">
      {data?.length > 0 ? (
        <div className={style.carusel_images}>
          <Slider {...settings}>
            {data.map((value, index) => (
              <div
                onClick={() => ImagesHome(`/images/${value.id}`)}
                className={style.card_img}
              >
                <Fade cascade damping={0.2} key={index} className={style.img}>
                  <img src={value?.image} alt={value?.title} />
                </Fade>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div>NO DATA</div>
      )}
    </div>
  );
}

export default ImageTabHome;
