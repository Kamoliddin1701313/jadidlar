import { useNavigate, useParams } from "react-router-dom";
import style from "./imageTabHomeId.module.scss";

function ImageTabHomeId() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.initialPages}>
          <button>Bosh sahifa</button>
          <span>/</span>
          <button>Suratlar</button>
          <span>/</span>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default ImageTabHomeId;
