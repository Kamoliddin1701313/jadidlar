import style from "./home.module.scss";
import HeroSliderHome from "../../components/heroSliderHome/HeroSliderHome";
import JadidlarHome from "../../components/jadidlarHome/JadidlarHome";
import NewsHome from "../../components/newsHome/NewsHome";
import SourcesHome from "../../components/sourcesHome/SourcesHome";
import Research from "../../components/research/Research";
import LanguageGrammarTabHome from "../../components/languageGrammarTabHome/LanguageGrammarTabHome";
import TurkestanAutonomyHome from "../../components/turkestanAutonomyHome/TurkestanAutonomyHome";
import MultimediaTabsHome from "../../components/multimediaTabsHome/MultimediaTabsHome";
import QuickLinksHome from "../../components/quickLinksHome/QuickLinksHome";

// balloonrterdsbbadrueteuilloonbkkferl


function Home() {
  return (
    <div>
      <HeroSliderHome />
      <NewsHome />
      <JadidlarHome />
      <SourcesHome />
      <Research />
      <LanguageGrammarTabHome />
      <TurkestanAutonomyHome />
      <MultimediaTabsHome />
      <QuickLinksHome />
    </div>
  );
}

export default Home;
