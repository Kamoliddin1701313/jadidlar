import { MdOutlineFileDownload } from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";
import style from "./jadidListId.module.scss";
import { Fade } from "react-awesome-reveal";

function JadidListIdMaqola({ data }) {
  return (
    <div className={style.maqolalar_container}>
      {data?.maqolalar?.map((value, index) => (
        <div className={style.card} key={index}>
          <div className={style.link}>
            <span>
              <a href={value.file} target="_blank" rel="noopener noreferrer">
                <MdOutlineFileDownload />
              </a>
            </span>

            <span>
              <a
                href="https://t.me/Kamol7602"
                target="_blank"
                rel="noopener noreferrer"
              >
                <RiShareForwardLine />
              </a>
            </span>
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
            <h4>{value?.jadid_fullname}</h4>
            <h4>{value?.title}</h4>
          </div>
        </div>
      ))}
    </div>
  );
}

export default JadidListIdMaqola;
