import React from "react";
import { HomeDiv, NewsDiv } from "../styles/HomeStyle";
import { useDispatch, useSelector } from "react-redux";
import { funcGetNews } from "../reducers/newsSlice";
import { useInView } from "react-intersection-observer";
import NewsItem from "../components/NewsItem";

function Home() {
  //무한스크롤(주선)
  const [number, setNumber] = React.useState(1);
  // 검색 input 내용
  const [term, setTerm] = React.useState("");
  // search history hidden
  const [isHidden, setIsHidden] = React.useState(true);
  const [sHistoryItem, setsHistoryItem] = React.useState([]);
  const { ref, inView } = useInView();

  // redux
  const dispatch = useDispatch();
  const newsList = useSelector((state) => state.newsSlice);

  // EventHandle
  const inputFocusHandle = () => {
    const result = [];
    const localData = localStorage.getItem("searchHistory");
    const historyData = JSON.parse(localData);

    historyData.forEach((el) => {
      const data = {
        key: new Date().getTime() + Math.random(),
        value: el,
      };

      result.push(data);
    });

    console.log("result", result);

    setIsHidden(false);
    setsHistoryItem([...result]);
  };

  const inputBlurHandle = () => {
    setIsHidden(true);
    setsHistoryItem([]);
  };

  //localStorage 생성_최다현

  React.useEffect(() => {
    if (window.localStorage.getItem("searchHistory") === null) {
      localStorage.setItem("searchHistory", JSON.stringify([]));
    }
  }, []);

  //localStorage 저장_최다현
  function saveSearchList(term) {
    let searchHistory = localStorage.getItem("searchHistory");
    searchHistory = JSON.parse(searchHistory);

    //중복제거
    if (searchHistory.includes(term)) {
      searchHistory = searchHistory.filter((el) => {
        return term !== el;
      });
    }

    if (searchHistory.length > 4) {
      searchHistory.pop();
      searchHistory.unshift(term);
    } else {
      searchHistory.unshift(term);
    }
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }

  // useEffect
  React.useEffect(() => {
    // 검색 내용 없으면 return
    if (term === "" || term.length === 0) return;

    // 0.5초 검색
    const searchTimeout = setTimeout(() => {
      console.log("1.검색시작");

      const body = {
        // 검색내용
        term,
        // 페이지
        page: 1,
      };
      // MiddleWare에서 실행하는 비동기 함수 호출
      dispatch(funcGetNews(body));
      // localStorage 저장 함수 호출
      saveSearchList(term);

      inputFocusHandle();
    }, 500);

    return () => {
      clearTimeout(searchTimeout);
    };
  }, [term]);

  //inView가 true가 될 때 다음페이지 호출(주선)
  React.useEffect(() => {
    if (inView) {
      setNumber((prev) => prev + 1);

      if (term === "" || term.length === 0) return;
      const body = {
        term,
        page: number,
      };
      dispatch(funcGetNews(body));
    }
  }, [inView]);

  return (
    <>
      <HomeDiv>
        <div className="search_Div">
          <input
            type="text"
            placeholder="검색"
            onChange={(e) => setTerm(e.target.value)}
            onFocus={inputFocusHandle}
            onBlur={inputBlurHandle}
          />
          <div className="searchList_Div" hidden={isHidden}>
            {sHistoryItem.length > 0 &&
              sHistoryItem.map((el, idx) => {
                return <p key={el.key}>{el.value}</p>;
              })}
          </div>
        </div>

        <NewsDiv>
          {newsList.length < 0
            ? null
            : newsList.news.map((item, idx) => {
                return (
                  <NewsItem
                    key={item._id}
                    pub_date={item.pub_date.substr(0, 10)}
                    headline={item.headline.main}
                    snippet={item.snippet}
                    web_url={item.web_url}
                    item={item}
                  />
                );
              })}
          <div ref={ref}></div>
        </NewsDiv>
      </HomeDiv>
    </>
  );
}

export default Home;
