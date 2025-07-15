import style from "../pressList.module.scss";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { Fade } from "react-awesome-reveal";
import { RiShareForwardLine } from "react-icons/ri";
import { MdOutlineFileDownload } from "react-icons/md";
import { useTranslation } from "react-i18next";

function SocialAndReligionSection({ handleClick, handleClickTelegram }) {
  const [list, setList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1; // URL ga saqlash
  const { i18n } = useTranslation();

  const getData = async (page = 1) => {
    try {
      const langMap = {
        uzl: "uz",
        uzk: "ru",
        eng: "en",
      };
      const lang = langMap[i18n.language] || "uz";

      const respons = await axios.get(`asarlar/?page=${page}&limit=15`, {
        headers: {
          "Accept-Language": lang,
        },
      });

      setList(respons?.data);
      setPageCount(Math.ceil(respons.data.pagination.total / 15));
    } catch (error) {
      console.log(error, "JADIDLAR LIST PAGE DAN KELAYABDI XATO");
    }
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage, i18n.language]);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setSearchParams({ page: selectedPage }); // URL ga saqlash
  };

  return (
    <div>
      <div className={style.jadidlar_list}>
        {list?.results?.map((lists, index) => (
          <div className={style.card} key={index}>
            <div className={style.link}>
              <button onClick={() => handleClick(lists)}>
                <MdOutlineFileDownload />
              </button>

              <a onClick={() => handleClickTelegram(value)}>
                <RiShareForwardLine />
              </a>
            </div>

            <Fade cascade damping={0.2} className={style.img}>
              <img src={lists?.image} alt={lists?.title} />
            </Fade>

            <div className={style.text}>
              <button onClick={() => handleClick(lists)}>{lists?.title}</button>
            </div>
          </div>
        ))}
      </div>

      <ReactPaginate
        previousLabel={<FaAngleDoubleLeft />}
        nextLabel={<FaAngleDoubleRight />}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        activeClassName={style.active}
        forcePage={currentPage - 1}
      />
    </div>
  );
}

export default SocialAndReligionSection;
