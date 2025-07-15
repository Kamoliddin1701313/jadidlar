import { FaHome } from "react-icons/fa";
import { InputMask } from "primereact/inputmask";
import style from "./auth.module.scss";
import { AiTwotoneEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register({ setRegister }) {
  const navigate = useNavigate();
  const [parolToggl, setParolToggl] = useState(true);
  const [confirmParolToggl, setConfirmParolToggl] = useState(true);
  const [formdata, setFormdata] = useState({});

  const [users, setUsers] = useState({
    full_name: "",
    phone: "",
    email: "",
    password: "",
    password2: "",
  });

  const RegistrationUser = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const LoginHandle = async (e) => {
    e.preventDefault();

    try {
      const respons = await axios.post("register/", users);
      if (respons.status === 201) {
        console.log(respons);
        setFormdata(respons.data);
        setRegister((prev) => !prev);
        localStorage.setItem("token", respons?.data?.access);
        navigate("/");
      }
    } catch (error) {
      console.log(error, "XATO");
    }
  };

  return (
    <div className={style.registration}>
      <form onSubmit={LoginHandle}>
        <h1>Roʻyxatdan oʻtish</h1>

        <div className={style.input_wrapper}>
          <label>F.I.SH</label>
          <input
            autoComplete="off"
            required
            name="full_name"
            type="text"
            onChange={RegistrationUser}
          />
        </div>

        <div className={style.input_container}>
          <div className={style.input_wrap}>
            <label>Telefon raqam</label>
            <div className={style.phone}>
              <span className={style.prefix}>+998</span>
              <InputMask
                autoComplete="off"
                required
                name="phone"
                mask="(99)-999-99-99"
                className={style.input_mask}
                onChange={RegistrationUser}
              />
            </div>
          </div>

          <div className={style.input_wrap}>
            <label>Email</label>
            <input
              autoComplete="off"
              required
              name="email"
              type="text"
              onChange={RegistrationUser}
            />
          </div>
        </div>

        <div className={style.input_parol_container}>
          <div className={style.box}>
            <label>Oʻron</label>

            <div className={style.input_parol}>
              <input
                autoComplete="off"
                required
                name="password"
                type={parolToggl ? "password" : "text"}
                onChange={RegistrationUser}
              />
              <button
                type="button"
                className={style.toggle_icon}
                onClick={() => setParolToggl((prev) => !prev)}
              >
                {parolToggl ? <AiTwotoneEyeInvisible /> : <AiTwotoneEye />}
              </button>
            </div>
          </div>

          <div className={style.box}>
            <label>Oʻronni tasdiqlash</label>

            <div className={style.input_parol}>
              <input
                autoComplete="off"
                required
                name="password2"
                type={confirmParolToggl ? "password" : "text"}
                onChange={RegistrationUser}
              />
              <button
                type="button"
                className={style.toggle_icon}
                onClick={() => setConfirmParolToggl((prev) => !prev)}
              >
                {confirmParolToggl ? (
                  <AiTwotoneEyeInvisible />
                ) : (
                  <AiTwotoneEye />
                )}
              </button>
            </div>
          </div>
        </div>

        <button className={style.send_btn}>
          <span>Roʻyxatdan oʻtish</span>
          <div className={style.bg}></div>
        </button>

        <div className={style.navigate_link}>
          <button className={style.home_link}>
            <FaHome />
            <span>qaytish</span>
          </button>

          <button
            className={style.register_link}
            onClick={() => setRegister((prev) => !prev)}
          >
            <span>Hisobingiz bormi?</span>
          </button>
        </div>
        
      </form>
    </div>
  );
}

export default React.memo(Register);
