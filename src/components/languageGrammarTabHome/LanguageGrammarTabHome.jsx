import style from "./languageGrammarTabHome.module.scss";
import { useState } from "react";
import WorksTabsHome from "./WorksTabHome";
import ArticlesTabHome from "./ArticlesTabHome";
import QuotesTabHome from "./QuotesTabHome";

function LanguageGrammarTabHome() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <h1>Til va imlo</h1>

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
            Hikmatlar
          </button>
        </div>

        <div className={style.page_container}>
          {activeTab === 1 && <WorksTabsHome />}
          {activeTab === 2 && <ArticlesTabHome />}
          {activeTab === 3 && <QuotesTabHome />}
        </div>
      </div>
    </div>
  );
}

export default LanguageGrammarTabHome;
