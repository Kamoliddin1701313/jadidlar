import style from "./multimediaTabsHome.module.scss";
import { FaRegCirclePlay } from "react-icons/fa6";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

function ImageTabHome() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const respons = await axios.get("rasmlar/");
      setData(respons?.data?.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 800,
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

  console.log(data, "data data");

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
                <div key={index} className={style.img}>
                  <img src={value?.image} alt={value?.title} />
                </div>
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
