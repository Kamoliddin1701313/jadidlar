import style from "./jadidListId.module.scss";

function JadidListIdHikmatli({ data }) {
  console.log(data, "jjj");

  return (
    <div className={style.hikmatli_sozlar}>
      {data?.hikmatli_sozlar?.map((value, index) => (
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

export default JadidListIdHikmatli;
