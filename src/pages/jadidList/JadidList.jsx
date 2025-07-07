import style from "./jadidList.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FcSearch } from "react-icons/fc";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { Fade } from "react-awesome-reveal";

function JadidList() {
  const [list, setList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1; // URL ga saqlash
  const navigate = useNavigate();

  const getData = async (page = 1) => {
    try {
      const respons = await axios.get(`jadidlar/?page=${page}&limit=15`);
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
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.menu_link}>
          <button onClick={() => navigate("/")}>Bosh sahifa</button>
          <span>/</span>

          <button onClick={() => navigate("/")}>Jadidlar</button>
          <span>/</span>
        </div>

        <div className={style.search}>
          <input type="search" />
          <FcSearch />
        </div>

        <div className={style.jadidlar_list}>
          {list?.results?.map((lists, index) => (
            <div
              key={index}
              className={style.card}
              onClick={() => navigate(`${lists.id}`)}
            >
              <Fade cascade damping={0.2}>
                <img src={lists.image} alt={lists.fullname} />
              </Fade>
              <div className={style.content}>
                <span>{lists.fullname}</span>
                <div>
                  {"("}
                  <span>{lists.birthday?.slice(0, 4)}</span>
                  <span>-</span>
                  <span>{lists.die_day?.slice(0, 4)}</span>
                  {")"}
                </div>
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
    </div>
  );
}

export default JadidList;
