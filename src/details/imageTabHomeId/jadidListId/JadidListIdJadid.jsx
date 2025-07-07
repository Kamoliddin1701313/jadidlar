import React from "react";
import style from "./jadidListId.module.scss";
import { Fade } from "react-awesome-reveal";

function JadidListIdJadid({ data }) {
  return (
    <div className={style.jadidlar_container}>
      <Fade cascade damping={0.2} className={style.select_id_img}>
        <img
          loading="lazy"
          decoding="async"
          src={data.image}
          alt={data.fullname}
        />
      </Fade>

      <div className={style.jadid_info}>
        <h1>{data.fullname}</h1>
        <div className={style.jadid_data}>
          <span>
            {"("}
            {data?.birthday?.slice(0, 4)}
          </span>

          <span>-</span>

          <span>
            {data?.die_day?.slice(0, 4)}
            {")"}
          </span>
        </div>

        <div
          className={style.content_text}
          dangerouslySetInnerHTML={{ __html: data.bio }}
        ></div>
      </div>
    </div>
  );
}

export default React.memo(JadidListIdJadid);
