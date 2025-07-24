import style from "../languageSpellingList.module.scss";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function LanguageSpellingListHikmatlar({ searchValue }) {
  const [data, setData] = useState([]);
  const { i18n } = useTranslation();

  const getData = async () => {
    try {
      const langMap = {
        uzl: "uz",
        uzk: "ru",
        eng: "en",
      };
      const lang = langMap[i18n.language] || "uz";

      const respons = await axios.get(
        `hikmatli_sozlar/?search=${searchValue}`,
        {
          headers: {
            "Accept-Language": lang,
          },
        }
      );

      setData(respons?.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    getData();
  }, [i18n.language, searchValue]);

  console.log(data, "sss");

  return (
    <div className={style.tab_quotes_container}>
      {data?.results?.map((value, index) => (
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

export default React.memo(LanguageSpellingListHikmatlar);
