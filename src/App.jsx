import axios from "axios";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import JadidList from "./components/jadidList/JadidList";
import About from "./components/About/About";
import Home from "./pages/Home/Home";
import ImageTabHomeId from "./details/imageTabHome/ImageTabHomeId";

axios.defaults.baseURL = "https://backend.jadidlar.uz/api/";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/jadids" element={<JadidList />} />
          <Route path="/about" element={<About />} />
          {/* DETAILS */}

          <Route path="/images/:id" element={<ImageTabHomeId />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
