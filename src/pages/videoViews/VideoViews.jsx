import { useEffect, useState } from "react";
import style from "./videoViews.module.scss";
import axios from "axios";

function VideoViews() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const respons = await axios.get("videolar/");
      setData(respons?.data?.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data, "video");

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.menu_link}>
          <button onClick={() => navigate("/")}>Bosh sahifa</button>
          <span>/</span>

          <button onClick={() => navigate("/")}>Koʻruvlar</button>
          <span>/</span>

          <button></button>
        </div>
      </div>
    </div>
  );
}

export default VideoViews;
