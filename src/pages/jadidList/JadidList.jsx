import style from "./jadidList.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FcSearch } from "react-icons/fc";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";
import NotFoundSearch from "../../components/notFound/NotFoundSearch";

function JadidList() {
  const [list, setList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1; // URL ga saqlash
  const navigate = useNavigate();
  const [fullSearchResults, setFullSearchResults] = useState(null);
  const [title, setTitle] = useState("");
  const { t, i18n } = useTranslation();

  const getData = async (page = 1) => {
    try {
      const langMap = {
        uzl: "uz",
        uzk: "ru",
        eng: "en",
      };
      const lang = langMap[i18n.language] || "uz";

      const respons = await axios.get(`jadidlar/?page=${page}&limit=15`, {
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

  // title bo'yicha qidirish codelari
  const SearchInput = (e) => {
    setTitle(e.target.value);
  };

  // const SearchBtn = () => {
  //   const filtered = list?.results?.filter((item) =>
  //     item.fullname.toLowerCase().includes(title.toLowerCase())
  //   );
  //   console.log(filtered, "EYEYEY");

  //   setList({ ...list, results: filtered });
  // };

  // const SearchBtn = async () => {
  //   try {
  //     const langMap = {
  //       uzl: "uz",
  //       uzk: "ru",
  //       eng: "en",
  //     };
  //     const lang = langMap[i18n.language] || "uz";

  //     const allResults = [];
  //     let page = 1;
  //     let totalPages = 1;

  //     do {
  //       const response = await axios.get(`jadidlar/?page=${page}&limit=15`, {
  //         headers: {
  //           "Accept-Language": lang,
  //         },
  //       });

  //       allResults.push(...response.data.results);
  //       totalPages = Math.ceil(response.data.pagination.total / 15);
  //       page++;
  //     } while (page <= totalPages);

  //     const filtered = allResults.filter((item) =>
  //       item.fullname.toLowerCase().includes(title.toLowerCase())
  //     );

  //     const itemsPerPage = 15;
  //     const paginatedResults = filtered.slice(0, itemsPerPage);

  //     setList({ results: paginatedResults });
  //     setPageCount(Math.ceil(filtered.length / itemsPerPage));
  //     setSearchParams({ page: 1 });
  //   } catch (error) {
  //     console.log(error, "FULL SEARCH ERROR");
  //   }
  // };

  const SearchBtn = async () => {
    try {
      const langMap = {
        uzl: "uz",
        uzk: "ru",
        eng: "en",
      };
      const lang = langMap[i18n.language] || "uz";

      const allResults = [];
      let page = 1;
      let totalPages = 1;

      do {
        const response = await axios.get(`jadidlar/?page=${page}&limit=15`, {
          headers: {
            "Accept-Language": lang,
          },
        });

        allResults.push(...response.data.results);
        totalPages = Math.ceil(response.data.pagination.total / 15);
        page++;
      } while (page <= totalPages);

      const filtered = allResults.filter((item) =>
        item.fullname.toLowerCase().includes(title.toLowerCase())
      );

      setFullSearchResults(filtered); // saqlab qo‘yamiz
      setPageCount(Math.ceil(filtered.length / 15));
      setSearchParams({ page: 1 });
    } catch (error) {
      console.log(error, "FULL SEARCH ERROR");
    }
  };

  const itemsPerPage = 15;
  const offset = (currentPage - 1) * itemsPerPage;

  const displayedList = fullSearchResults
    ? fullSearchResults.slice(offset, offset + itemsPerPage)
    : list?.results;

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.menu_link}>
          <button onClick={() => navigate("/")}>
            {t("eshituv.bosh_sahifa")}
          </button>
          <span>/</span>

          <button onClick={() => navigate("/")}>{t("navbar.jadidlar")}</button>
          <span>/</span>
        </div>

        <div className={style.search}>
          <input
            type="search"
            onChange={SearchInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") SearchBtn();
            }}
          />
          <FcSearch onClick={SearchBtn} />
        </div>

        {displayedList?.length > 0 ? (
          <div>
            <div className={style.jadidlar_list}>
              {displayedList?.map((lists, index) => (
                <div
                  key={index}
                  className={style.card}
                  onClick={() => navigate(`${lists.id}`)}
                >
                  <Fade cascade damping={0.2} triggerOnce>
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
        ) : (
          <NotFoundSearch />
        )}
      </div>
    </div>
  );
}

export default JadidList;
