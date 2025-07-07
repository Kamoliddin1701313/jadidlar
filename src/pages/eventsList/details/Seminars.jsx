import axios from "axios";
import style from "../eventsList.module.scss";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

function Seminars() {
  const [users, setUsers] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1; // URL ga saqlash

  const getData = async (page = 1) => {
    try {
      const respons = await axios.get(`seminarlar/?page=${page}&limit=15`);
      setUsers(respons);
      setPageCount(Math.ceil(respons.data.pagination.total / 15));
    } catch (error) {
      console.log(error, "NEWS DAN XATOLIK KELAYABDI");
    }
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setSearchParams({ page: selectedPage }); // URL ga saqlash
  };

  console.log(users, "users");

  return (
    <div className={style.card_container}>
      <div className={style.card}>
        {users?.data?.results?.map((value, index) => (
          <div key={index} className={style.user_box}>
            <Fade cascade damping={0.2} className={style.img}>
              <img src={value?.image} alt={value?.title} />
            </Fade>

            <div className={style.description}>
              <h3>{value?.title}</h3>

              <div className={style.video_link}>
                <span>
                  {new Date(value?.updated_at).toLocaleDateString("ru-RU")}
                </span>

                <a href={value?.link} target="_blank">
                  To'liq
                </a>
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
  );
}

export default Seminars;
