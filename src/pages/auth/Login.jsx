import style from "./auth.module.scss";
import { InputMask } from "primereact/inputmask";
import { FaHome } from "react-icons/fa";
import { AiTwotoneEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import axios from "axios";
import { useTranslation } from "react-i18next";

function Login() {
  const navigate = useNavigate();
  const [closeParol, setCloseParol] = useState(true);
  const [register, setRegister] = useState(true);
  const [loginFormData, setLoginFormData] = useState({});
  const [loginData, setLoginData] = useState({ phone: "", password: "" });
  const { t } = useTranslation();
  // const token=localStorage.getItem("token")

  const LoginUser = async (e) => {
    e.preventDefault();

    try {
      const respons = await axios.post("token/", loginData);
      console.log(respons);
      if (respons) {
        setLoginFormData(respons);
        localStorage.setItem("token", respons?.data?.access);
        navigate("/");
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  };

  const LoginUserChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const RegistrationPage = () => {
    setRegister((prev) => !prev);
  };

  return (
    <div className={style.container}>
      <div className={style.animation_container}>
        <div className={style.item_1}></div>
        <div className={style.item_2}></div>
        <div className={style.item_3}></div>
      </div>

      <div className={style.wrapper}>
        {register ? (
          <div className={style.login}>
            <form onSubmit={LoginUser}>
              <h1>{t("auth.login")}</h1>

              <div className={style.input_box}>
                <label>{t("auth.phone")}</label>
                <div className={style.input_wrapper}>
                  <span className={style.prefix}>+998</span>
                  <InputMask
                    autoComplete="off"
                    type="tel"
                    required
                    mask="(99)-999-99-99"
                    name="phone"
                    onChange={LoginUserChange}
                  />
                </div>
              </div>

              <div className={style.input_box}>
                <label>{t("auth.password")}</label>

                <div className={style.input_parol}>
                  <input
                    autoComplete="off"
                    required
                    type={closeParol ? "password" : "text"}
                    name="password"
                    onChange={LoginUserChange}
                  />
                  <button
                    type="button"
                    className={style.toggle_icon}
                    onClick={() => setCloseParol((prev) => !prev)}
                  >
                    {closeParol ? <AiTwotoneEyeInvisible /> : <AiTwotoneEye />}
                  </button>
                </div>
              </div>

              <button className={style.send_btn}>
                <span>{t("auth.login")}</span>
                <div className={style.bg}></div>
              </button>

              <div className={style.navigate_link}>
                <button
                  className={style.home_link}
                  onClick={() => navigate("/")}
                >
                  <FaHome />
                  <span>{t("auth.home")}</span>
                </button>

                <button className={style.login_link} onClick={RegistrationPage}>
                  {t("auth.register_now")}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <Register setRegister={setRegister} />
        )}
      </div>
    </div>
  );
}

export default Login;
