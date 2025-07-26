import style from "./jadidList.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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
  const valueRef = useRef();

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

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setSearchParams({ page: selectedPage }); // URL ga saqlash
  };

  // title bo'yicha qidirish codelari
  const SearchInput = (e) => {
    setTitle(e.target.value);
  };

  const SearchBtn = async () => {
    const searchText = valueRef.current?.value || "";
    if (!searchText.trim()) {
      // 🔁 Bo‘sh bo‘lsa: tozalaymiz
      setFullSearchResults(null);

      // ✅ TO‘G‘RILANGAN QATOR: umumiy element soni asosida sahifani qayta hisoblash
      setPageCount(Math.ceil((list?.pagination?.total || 0) / itemsPerPage));

      setSearchParams({ page: 1 });
      return;
    }

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
          headers: { "Accept-Language": lang },
        });

        allResults.push(...response.data.results);
        totalPages = Math.ceil(response.data.pagination.total / 15);
        page++;
      } while (page <= totalPages);

      const filtered = allResults.filter((item) =>
        item.fullname.toLowerCase().includes(searchText.toLowerCase())
      );

      setFullSearchResults(filtered);
      setPageCount(Math.ceil(filtered.length / itemsPerPage));
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

  useEffect(() => {
    getData(currentPage);
  }, [currentPage, i18n.language]);

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
            autoCapitalize="off"
            ref={valueRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") SearchBtn();
            }}
            onInput={(e) => {
              if (e.target.value === "") {
                SearchBtn();
              }
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
