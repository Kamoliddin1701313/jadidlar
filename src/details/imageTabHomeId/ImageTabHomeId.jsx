import { Link, useNavigate, useParams } from "react-router-dom";
import style from "./imageTabHomeId.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";

function ImageTabHomeId() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataId, setDataId] = useState([]);

  const getDataId = async () => {
    try {
      const respons = await axios.get(`rasmlar/${id}`);
      setDataId(respons);
    } catch (error) {
      console.log(error, "ERROR BERAYABDI ImageTabHomeId");
    }
  };

  useEffect(() => {
    getDataId();
  }, []);

  console.log(dataId, "dataId");

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.initialPages}>
          <button onClick={() => navigate("/")}>Bosh sahifa</button>
          <span>/</span>
          <button onClick={() => navigate("/suratlar")}>Suratlar</button>
          <span>/</span>
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
