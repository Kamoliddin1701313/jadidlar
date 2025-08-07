import { Link, useNavigate, useParams } from "react-router-dom";
import style from "./imageTabHomeId.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";

function ImageTabHomeId() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataId, setDataId] = useState([]);

  const getDataId = async () => {
    try {
      const langMap = {
        uzl: "uz",
        uzk: "ru",
        eng: "en",
      };
      const lang = langMap[i18n.language] || "uz";

      const respons = await axios.get(`rasmlar/${id}`, {
        headers: { "Accept-Language": lang },
      });
      setDataId(respons);
    } catch (error) {
      console.log(error, "ERROR BERAYABDI ImageTabHomeId");
    }
  };

  useEffect(() => {
    getDataId();
  }, [i18n.language]);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.initialPages}>
          <button onClick={() => navigate("/")}>
            {t("eshituv.bosh_sahifa")}{" "}
            <span style={{ marginLeft: "4px" }}>/</span>
          </button>
          <button onClick={() => navigate("/suratlar")}>
            {t("eshituv.suratlar")} <span style={{ marginLeft: "4px" }}>/</span>
          </button>

          <p>{dataId?.data?.title}</p>
        </div>

        <div
          className={`${style.detail_images} ${
            dataId?.data?.images?.length === 1
              ? style["columns-2"]
              : dataId?.data?.images?.length === 2
              ? style["columns-2"]
              : dataId?.data?.images?.length === 3
              ? style["columns-3"]
              : style["columns-4"]
          }`}
        >
          {dataId?.data?.images?.map((valueId, indexId) => (
            <Fade
              cascade
              damping={0.2}
              key={indexId}
              className={style.img_card}
            >
              <img src={valueId.image} alt="img" />
            </Fade>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageTabHomeId;
