import { MdOutlineFileDownload } from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";
import style from "./jadidListId.module.scss";
import { Fade } from "react-awesome-reveal";

function JadidListIdAsarlar({ data, handleClick, handleClickTelegram }) {
  return (
    <div className={style.asarlar_container}>
      {data?.asarlar?.map((value, index) => (
        <div className={style.card} key={index}>
          <div className={style.link}>
            <button onClick={() => handleClick(value)}>
              <MdOutlineFileDownload />
            </button>

            <a onClick={() => handleClickTelegram(value)}>
              <RiShareForwardLine />
            </a>
          </div>

          <Fade cascade damping={0.2} className={style.img}>
            <img
              loading="lazy"
              decoding="async"
              src={value?.image}
              alt={value?.title}
            />
          </Fade>

          <div className={style.text}>
            <button onClick={() => handleClick(value)}>
              <h4>{value?.jadid_fullname}</h4>
              <h4>{value?.title}</h4>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default JadidListIdAsarlar;
