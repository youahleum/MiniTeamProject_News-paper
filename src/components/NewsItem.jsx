import React, { useEffect } from "react";
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
}) {
  const dispatch = useDispatch();
  const clipList = useSelector((state) => state.newsSlice.clipList);
  console.log("clipList", clipList);

  console.log("id:", item._id, "item", item);

  // const handleClip = () => {
  //   console.log("news", item);
  //   dispatch(addClip(item));
  //   // console.log(clipList);
  // };

  // 잠깐주석----------

  // //clip toggle state
  // const [toggle, setToggle] = React.useState(true); //상태값 변경
  // const [clip, setClip] = React.useState("clip"); //상태값에 따른 글자변경

  // //clip toggle 함수
  // const clipToggle = () => {
  //   setToggle(!toggle); //현재의 반대값으로 toggle값 변경

  //   toggle //toggle값에 따라 unclip || clip
  //     ? setClip("unClip")
  //     : setClip("clip");
  //   toggle ? dispatch(addClip(item)) : dispatch(removeClip(item));
  //   console.log("clicpList:", clipList);
  // };
  //-------------------------------

  //clip toggle state
  const [toggle, setToggle] = React.useState(true); //상태값 변경
  const [clip, setClip] = React.useState("clip"); //상태값에 따른 글자변경

  useEffect(() => {
    if (item._id === clipList._id) {
      setToggle(false);
      setClip("unClip");
    }
  }, []);

  //clip toggle 함수
  const clipToggle = () => {
    setToggle(!toggle); //현재의 반대값으로 toggle값 변경

    toggle //toggle값에 따라 unclip || clip
      ? setClip("unClip")
      : setClip("clip");
    toggle ? dispatch(addClip(item)) : dispatch(removeClip(item));
    console.log("clicpList:", clipList);
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
            <button onClick={() => window.open(web_url)}>자세히</button>
            <button onClick={clipToggle}>{clip}</button>
          </div>
        </div>
      </NewsDiv>
    </>
  );
}
