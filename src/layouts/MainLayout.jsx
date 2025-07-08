import { Outlet, useLocation } from "react-router-dom";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import style from "./mainLayout.module.scss";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { useCallback, useEffect, useState } from "react";

function MainLayout() {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // scroll bo'lganida tepaga degan button chiqishi uchun yaratilgan code
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const scrollToTop = useCallback((duration = 500) => {
    const start = window.pageYOffset;
    const startTime = performance.now();
    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start * (1 - progress));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };
    requestAnimationFrame(animateScroll);
  }, []);
  // scroll bo'lganida tepaga degan button chiqishi uchun yaratilgan code

  return (
    <div className={style.container}>
      <Navbar />

      <div className={style.wrapper}>
        <Outlet />

        <button
          onClick={() => scrollToTop(500)}
          className={`${style.arrow_btn} ${
            isScrolled ? style.block : style.hidden
          }`}
        >
          <MdKeyboardDoubleArrowUp />
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default MainLayout;
