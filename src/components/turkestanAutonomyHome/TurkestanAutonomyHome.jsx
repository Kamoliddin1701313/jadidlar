import style from "./turkestanAutonomyHome.module.scss";
import { useState } from "react";
import WorksTabHome from "./WorksTabHome";
import ArticlesTabHome from "./ArticlesTabHome";
import PoemsTabHome from "./PoemsTabHome";
import MemoirsTabHome from "./MemoirsTabHome";

function TurkestanAutonomyHome() {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <h1>Turkiston muxtoriyati</h1>

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
            Sheʼrlar
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
          {activeTab === 1 && <WorksTabHome />}
          {activeTab === 2 && <ArticlesTabHome />}
          {activeTab === 3 && <PoemsTabHome />}
          {activeTab === 4 && <MemoirsTabHome />}
        </div>
      </div>
    </div>
  );
}

export default TurkestanAutonomyHome;
