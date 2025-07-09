import axios from "axios";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import ImageTabHomeId from "./details/imageTabHomeId/ImageTabHomeId";
import JadidList from "./pages/jadidList/JadidList";
import JadidListId from "./details/imageTabHomeId/jadidListId/JadidListId";
import ResearchList from "./pages/researchList/ResearchList";
import LanguageSpellingList from "./pages/languageSpellingList/LanguageSpellingList";
import TurkistanList from "./pages/turkistanList/TurkistanList";
import About from "./pages/about/About";
import EventsList from "./pages/eventsList/EventsList";
import ArchivedDocumentsList from "./pages/archivedDocumentsList/ArchivedDocumentsList";
import PressList from "./pages/pressList/PressList";
import Pictures from "./pages/pictures/Pictures";
import VideoViews from "./pages/videoViews/VideoViews";
import AudioListener from "./pages/audioListening/AudioListening";

axios.defaults.baseURL = "https://backend.jadidlar.uz/api/";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/jadids" element={<JadidList />} />
          <Route path="/about" element={<About />} />
          <Route path="/suratlar" element={<Pictures />} />
          <Route path="/koruvlar/:id" element={<VideoViews />} />
          <Route path="/eshituvlar" element={<AudioListener />} />

          {/* DETAILS */}
          <Route path="/images/:id" element={<ImageTabHomeId />} />
          <Route path="/jadids/:id" element={<JadidListId />} />
          <Route path="/research/:type" element={<ResearchList />} />
          <Route
            path="/languageSpelling/:type"
            element={<LanguageSpellingList />}
          />
          <Route path="/turkistan/:type" element={<TurkistanList />} />

          <Route path="/eventsList/:type" element={<EventsList />} />

          <Route
            path="/archivedDocuments/:type"
            element={<ArchivedDocumentsList />}
          />

          <Route path="/press/:type" element={<PressList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
