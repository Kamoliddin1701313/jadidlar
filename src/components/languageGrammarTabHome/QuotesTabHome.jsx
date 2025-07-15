import style from "./languageGrammarTabHome.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";

function QuotesTabHome({ handleClick }) {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const respons = await axios.get("hikmatli_sozlar_random/");
      setData(respons?.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={style.tab_quotes_container}>
      {data.map((value, index) => (
        <div className={style.card_quotes} key={index}>
          <div
            className={style.description}
            dangerouslySetInnerHTML={{ __html: value?.text }}
          ></div>

          <span className={style.default_text}>{value?.jadid_fullname}</span>
        </div>
      ))}
    </div>
  );
}

export default QuotesTabHome;
