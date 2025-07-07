import style from "../pressList.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { Fade } from "react-awesome-reveal";
import { RiShareForwardLine } from "react-icons/ri";
import { MdOutlineFileDownload } from "react-icons/md";

function HistorySection() {
  const [list, setList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1; // URL ga saqlash
  const navigate = useNavigate();

  const getData = async (page = 1) => {
    try {
      const respons = await axios.get(`maqolalar/?page=${page}&limit=15`);
      setList(respons?.data);
      setPageCount(Math.ceil(respons.data.pagination.total / 15));
    } catch (error) {
      console.log(error, "JADIDLAR LIST PAGE DAN KELAYABDI XATO");
    }
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

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
              <span>
                <a href={lists.file} target="_blank" rel="noopener noreferrer">
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
              <img src={lists?.image} alt={lists?.title} />
            </Fade>

            <div className={style.text}>
              <h4>{lists?.title}</h4>
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

export default HistorySection;
