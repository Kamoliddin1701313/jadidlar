import style from "./research.module.scss";
import { useState } from "react";
import WorksTabsHome from "./WorksTabsHome";
import PublicationsTabsHome from "./PublicationsTabsHome";
import ContentTabsHome from "./ContentTabsHome";
import MemoirsTabHome from "./MemoirsTabHome";
import { useNavigate } from "react-router-dom";

function Research() {
  const [activeTab, setActiveTab] = useState(1);
  const navigate = useNavigate();

  const handleClick = (value) => {
    const token = localStorage.getItem("token");
    if (token) {
      window.open(value?.file, "_blank");
    } else {
      navigate("/login");
    }
  };

  const handleClickTelegram = (value) => {
    const token = localStorage.getItem("token");
    if (token) {
      const telegramURL = `https://t.me/share/url?url=${encodeURIComponent(
        value?.file
      )}`;
      window.open(telegramURL, "_blank");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <h1>Izlanishlar</h1>

        <div className={style.page_tab}>
          <button
            style={activeTab === 1 ? { color: "#203867" } : {}}
            className={`${activeTab === 1 ? style.active : ""}`}
            onClick={() => setActiveTab(1)}
          >
            Asarlar
          </button>

          <button
            style={activeTab === 2 ? { color: "#203867" } : {}}
            className={`${activeTab === 2 ? style.active : ""}`}
            onClick={() => setActiveTab(2)}
          >
            Maqolalar
          </button>

          <button
            style={activeTab === 3 ? { color: "#203867" } : {}}
            className={`${activeTab === 3 ? style.active : ""}`}
            onClick={() => setActiveTab(3)}
          >
            Dissertatsiyalar
          </button>

          <button
            style={activeTab === 4 ? { color: "#203867" } : {}}
            className={`${activeTab === 4 ? style.active : ""}`}
            onClick={() => setActiveTab(4)}
          >
            Esdaliklar
          </button>
        </div>

        <div className={style.page_container}>
          {activeTab === 1 && (
            <WorksTabsHome
              handleClick={handleClick}
              handleClickTelegram={handleClickTelegram}
            />
          )}
          {activeTab === 2 && (
            <PublicationsTabsHome
              handleClick={handleClick}
              handleClickTelegram={handleClickTelegram}
            />
          )}
          {activeTab === 3 && (
            <ContentTabsHome
              handleClick={handleClick}
              handleClickTelegram={handleClickTelegram}
            />
          )}
          {activeTab === 4 && (
            <MemoirsTabHome
              handleClick={handleClick}
              handleClickTelegram={handleClickTelegram}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Research;
