import notfound from "../../assets/images/not_found.webp";
import style from "./notFound.module.scss";

function NotFound() {
  return (
    <div className={style.img}>
      <img src={notfound} alt="notfound" />
    </div>
  );
}

export default NotFound;
