import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NewsItem from "../components/NewsItem";
import { NewsDiv } from "../styles/HomeStyle";
import { ClipDiv } from "../styles/ClipStyle";
import { getClipList } from "../reducers/newsSlice";

function Clip() {

  const dispatch = useDispatch();
  const newsList = useSelector((state) => state.newsSlice.news);
  const clipList = useSelector((state) => state.newsSlice.clipList);


  function getClipHistory() {
    let clipHistory = window.localStorage.getItem("clipHistory");
    clipHistory = JSON.parse(clipHistory);
    return clipHistory
  }

  // 최초 실행
  React.useEffect(() => {
    // 클립히스토리 가져오기
    const clipHistory = getClipHistory();
    console.log("[clipHistory]: ", clipHistory);
    console.log("[newsList]: ", newsList);

    const body = {
      news: newsList,
      clipList: clipHistory
    }
    dispatch(getClipList(body))
  }, [])



  return (
    <ClipDiv>
      <NewsDiv>
        {newsList.map(el => {
          if (el.isClip) {
            return (
              <NewsItem
                id={el.item._id}
                key={el.item._id}
                pub_date={el.item.pub_date.substr(0, 10)}
                headline={el.item.headline.main}
                snippet={el.item.snippet}
                web_url={el.item.web_url}
                item={el.item}
                isClip={el.isClip}
              >
              </NewsItem>
            )
          }
        })}
        {clipList.length > 0 && clipList.map(el => {

          return (
            <NewsItem
              id={el.item._id}
              key={el.item._id}
              pub_date={el.item.pub_date.substr(0, 10)}
              headline={el.item.headline.main}
              snippet={el.item.snippet}
              web_url={el.item.web_url}
              item={el.item}
              isClip={el.isClip}
            >
            </NewsItem>
          )
        })}
      </NewsDiv>
    </ClipDiv>
  );
}

export default Clip;
