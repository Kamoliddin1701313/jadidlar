import { useParams } from "react-router-dom";
import style from "./eventsList.module.scss";
import News from "./details/News";
import Meeting from "./details/Meeting";
import Seminars from "./details/Seminars";

function EventsList() {
  const { type } = useParams();

  console.log(type, "TYPE");

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.menu_link}>
          <button onClick={() => navigate("/")}>Bosh sahifa</button>
          <span>/</span>

          <button onClick={() => navigate("/")}>{type}</button>
          <span>/</span>
        </div>

        <h1>{type}</h1>

        {type === "yangiliklar" && <News />}
        {type === "yiginlar" && <Meeting />}
        {type === "seminarlar" && <Seminars />}
      </div>
    </div>
  );
}

export default EventsList;
