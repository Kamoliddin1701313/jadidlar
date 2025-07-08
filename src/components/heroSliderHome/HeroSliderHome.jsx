import axios from "axios";
import style from "./heroSliderHome.module.scss";
import { useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { Fade } from "react-awesome-reveal";

function HeroSliderHome() {
  const [datas, setDatas] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  let sliderRef = useRef(null);

  const getData = async () => {
    try {
      const respons = await axios.get("slayder/");

      setDatas(respons?.data);
    } catch (error) {
      console.log("errpr", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  const settings = {
    fade: true,
    // infinite: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    arrows: false,
    afterChange: (current) => setCurrentSlide(current),

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
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
                  <div key={index} className={style.card}>
                    <div className={style.description}>
                      <h1>{value.title}</h1>
                      <h4>{value.text}</h4>

                      <button>
                        <a
                          href={value?.citations}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          To'liq
                        </a>
                      </button>  
                    </div>

                    <Fade cascade damping={0.2} className={style.image}>
                      <img src={value?.image} alt={value?.title} />
                    </Fade>
                  </div>
                ))}
              </Slider>

              <button
                className={`${style.prev} ${
                  currentSlide === 0 ? style.disabled : ""
                }`}
                onClick={previous}
              >
                <GrFormPrevious />
              </button>

              <button
                className={`${style.next} ${
                  currentSlide === datas?.results?.length - 1
                    ? style.disabled
                    : ""
                }`}
                onClick={next}
              >
                <MdOutlineNavigateNext />
              </button>
            </div>
          ) : (
            <div>NO DATA</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeroSliderHome;
