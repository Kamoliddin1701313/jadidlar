import { Outlet } from "react-router-dom";
import style from "./mainLayout.module.scss"
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

function MainLayout() {
  return (
    <div className={style.container}>
      <Navbar />

      <div className={style.wrapper}>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default MainLayout;
