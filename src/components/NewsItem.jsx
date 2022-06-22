import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NewsDiv } from "../styles/HomeStyle";
import { addClip, removeClip } from "../reducers/newsSlice";

export default function NewsItem({
  id,
  pub_date,
  headline,
  snippet,
  web_url,
  item,
  isClip,
}) {
  const dispatch = useDispatch();
  const newsList = useSelector((state) => state.newsSlice.news);
  const clipList = useSelector((state) => state.newsSlice.clipList);

  //clip toggle 함수
  const clipToggle = () => {
    const tmpItem = {
      state: newsList,
      clips: clipList,
      id,
    };

    isClip ? dispatch(removeClip(tmpItem)) : dispatch(addClip(tmpItem));
  };

  return (
    <>
      <NewsDiv>
        <div className="item">
          <div className="news">
            <span className="date">{pub_date}</span>
            <h2 className="card-title">{headline}</h2>
            <p className="content">{snippet}</p>
          </div>
          <div className="btns">
            <a href={web_url} target="_blank" rel="noreferrer">
              자세히
            </a>
            <button onClick={clipToggle}>{isClip ? "UnClip" : "Clip"}</button>
          </div>
        </div>
      </NewsDiv>
    </>
  );
}
