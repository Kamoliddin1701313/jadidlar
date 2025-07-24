import style from "./notFound.module.scss";
import search_img from "../../assets/images/not_found_search.webp";
import { Zoom } from "react-awesome-reveal";

function NotFoundSearch() {
  return (
    <Zoom cascade triggerOnce className={style.search_img}>
      <img src={search_img} alt="search_img" />
      <h3>Ma'lumot yo'q</h3>
    </Zoom>
  );
}

export default NotFoundSearch;
