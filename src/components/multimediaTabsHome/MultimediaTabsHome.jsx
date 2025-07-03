import style from "./multimediaTabsHome.module.scss";
import { useState } from "react";
import WatchTabHome from "./WatchTabHome";
import ImageTabHome from "./ImageTabHome";
import ListenTabHome from "./ListenTabHome";

function MultimediaTabsHome() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <h1>Ko‘r-eshit-o‘qi</h1>

        <div className={style.page_tab}>
          <button
            style={activeTab === 1 ? { color: "#203867" } : {}}
            className={`${activeTab === 1 ? style.active : ""}`}
            onClick={() => setActiveTab(1)}
          >
            Koʻruvlar
          </button>

          <button
            style={activeTab === 2 ? { color: "#203867" } : {}}
            className={`${activeTab === 2 ? style.active : ""}`}
            onClick={() => setActiveTab(2)}
          >
            Suratlar
          </button>

          <button
            style={activeTab === 3 ? { color: "#203867" } : {}}
            className={`${activeTab === 3 ? style.active : ""}`}
            onClick={() => setActiveTab(3)}
          >
            Eshituvlar
          </button>
        </div>

        <div className={style.page_container}>
          {activeTab === 1 && <WatchTabHome />}
          {activeTab === 2 && <ImageTabHome />}
          {activeTab === 3 && <ListenTabHome />}
        </div>
      </div>
    </div>
  );
}

export default MultimediaTabsHome;
