import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NewsItem from "../components/NewsItem";
import { NewsDiv } from "../styles/HomeStyle";
import { ClipDiv } from "../styles/ClipStyle";
import ClipItem from "../components/ClipItem";

function Clip() {
  const dispatch = useDispatch;
  const clipList = useSelector((state) => state.newsSlice.clipList);
  // console.log(clipList);

  return (
    <ClipDiv>
      <NewsDiv>
        {/* {clipList.map((item) => (
          <NewsItem
            key={item._id}
            pub_date={item.pub_date.substr(0, 10)}
            headline={item.headline.main}
            snippet={item.snippet}
            web_url={item.web_url}
            item={item}
          />
        ))}
      */}
        {clipList.map((item) => (
          <ClipItem
            key={item._id}
            pub_date={item.pub_date.substr(0, 10)}
            headline={item.headline.main}
            snippet={item.snippet}
            web_url={item.web_url}
            item={item}
          />
        ))}
      </NewsDiv>
    </ClipDiv>
  );
}

export default Clip;
