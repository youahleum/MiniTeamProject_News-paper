import React from "react";
import { HomeDiv, NewsDiv } from "../styles/HomeStyle";
import { useDispatch, useSelector } from "react-redux";
import { funcGetNews } from "../reducers/newsSlice";
import { useInView } from "react-intersection-observer";
import NewsItem from "../components/NewsItem";
import { clearNews } from "../reducers/newsSlice";

function Home() {
    //무한스크롤(주선)
    const [number, setNumber] = React.useState(1);
    console.log('number',number)

    // 검색 input 내용
    const [term, setTerm] = React.useState("");

    // search history hidden
    const [isHidden, setIsHidden] = React.useState(true);
    const [sHistoryItem, setsHistoryItem] = React.useState([]);
    const { ref, inView } = useInView();

    // redux
    const dispatch = useDispatch();
    const newsList = useSelector((state) => state.newsSlice);
    const scrollFlag = useSelector((state) => state.newsSlice.scrollFlag);

    // EventHandle
    const inputFocusHandle = () => {
        const result = [];
        const localData = JSON.parse(localStorage.getItem("searchHistory"));

        if(localData.length > 0 ){
          localData.forEach((el) => {
            const data = {
                key: new Date().getTime() + Math.random(),
                value: el,
            };

            result.push(data);
        });

        setIsHidden(false);
        setsHistoryItem([...result]);
        }
        
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

        if (window.localStorage.getItem("clipHistory") === null) {
            localStorage.setItem("clipHistory", JSON.stringify([]));
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
    if (term === "" || term.length === 0) {
      dispatch(clearNews())
      return;
    }
      

    // 0.5초 검색
    const searchTimeout = setTimeout(() => {
      const body = {
        // 검색내용
        term,
        // 페이지
        page: 1,
        // isScroll
        isScroll: false,
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
      if (scrollFlag) {
        setNumber((prev) => prev + 1);

        if (term === "" || term.length === 0) return;
        const body = {
          term,
          page: number + 1,
          isScroll: true,
          newsList,
        };
        console.log("count page:", body.page);
        dispatch(funcGetNews(body));
      } else {
        alert("마지막 페이지 입니다.")
      }
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
        
        {
              <NewsDiv>
                {newsList.news.length < 0
                  ? null
                  : newsList.news.map((el, idx) => {
                    return (
                      <NewsItem
                        key={el.item._id}
                        id={el.item._id}
                        pub_date={el.item.pub_date.substr(0, 10)}
                        headline={el.item.headline.main}
                        snippet={el.item.snippet}
                        web_url={el.item.web_url}
                        item={el}
                        isClip={el.isClip}
                      />
                    );
                  })}
                <div ref={ref}></div>
              </NewsDiv>
        }        
      </HomeDiv>
    </>
  );
}

export default Home;
