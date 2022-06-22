import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

function getClipHistory() {
    let clipHistory = window.localStorage.getItem("clipHistory");
    clipHistory = JSON.parse(clipHistory);
    return clipHistory;
}

function addClipHistory(obj) {
    let clipHistory = getClipHistory();

    const data = {
        isClip: true,
        item: obj,
    };

    clipHistory.unshift(data);
    window.localStorage.setItem("clipHistory", JSON.stringify(clipHistory));
}

function delClipHistory(obj) {
    let clipHistory = getClipHistory();
    const newClipHistory = clipHistory.filter((el) => obj._id !== el.item._id);
    window.localStorage.setItem("clipHistory", JSON.stringify(newClipHistory));
}

export const funcGetNews = createAsyncThunk(
  "getNewsData",
  async (termObj, tunk) => {
    try {
      const response = await axios
        .get(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${termObj.term}&page=${termObj.page}&api-key=${API_KEY}`
        )
        .then((res) => { 
          return res
        });

      const res = {
        response : response.data.response.docs,
        isScroll: termObj.isScroll,
        newsList: termObj.newsList,
        page: termObj.page,
        status: response.status,
      }

      if(res.response.length === 0 && res.isScroll === false){
        alert("잘못된 검색어 입니다.")
      }
      
      return res;
    } catch (Error) {
      alert("너무 많은 요청이 왔습니다. 잠시 후 다시 요청해주세요")
      
      const res = {
        response : [],
        isScroll: termObj.isScroll,
        newsList: termObj.newsList,
        page: termObj.page,
        status: Error.response.status,
      }

      return res;
    }
  }
);

export const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
    clipList: [],
    scrollFlag: true,
  },
  reducers: {
        addClip: (state, action) => {
            const newState = action.payload.state.map((el) => {
                if (action.payload.id === el.item._id) {
                    addClipHistory(el.item);
                    return {
                        isClip: true,
                        item: el.item,
                    };
                } else {
                    return el;
                }
            });

            return {
                ...state,
                news: newState,
            };
        },
        removeClip: (state, action) => {
            const newState = action.payload.state.map((el) => {
                // news list에서 삭제
                if (action.payload.id === el.item._id) {
                    delClipHistory(el.item);
                    return {
                        isClip: false,
                        item: el.item,
                    };
                } else {
                    return el;
                }
            });
            // clip list에서 삭제
            const newClipList = action.payload.clips.filter((el) => el.item._id !== action.payload.id);

            action.payload.clips.forEach((el) => {
                if (el.item._id === action.payload.id) {
                    delClipHistory(el.item);
                }
            });
            return {
                ...state,
                news: newState,
                clipList: newClipList,
            };
        },
        getClipList: (state, action) => {
            const news_list = action.payload.news;
            const clip_list = action.payload.clipList;
            let result = [];

            if (news_list.length > 0) {
                result = clip_list.filter((clips) => {
                    return !news_list.some((news) => news.item._id === clips.item._id);
                });
            } else {
                result = clip_list;
            }

            return {
                ...state,
                clipList: result,
            };
        },
        clearNews: (state, action) => {
          if(action.payload === undefined){
            return {...state, news: []}
          }
          
        }
        
    },
  // createSlice가 생성한 액션타입 외 다른 택션타입에 응답할 수 있도록 합니다.(외부의 액션을 참조)
  extraReducers: (builder) => {
    // build.addCase(async function.pending fulfilled, reject, (state, action))
    builder
      // Promise 상태에 따른 결과 처리르 할 수 있다.
      // 보류
      .addCase(funcGetNews.pending, (state) => {
      })
      // 충족
      .addCase(funcGetNews.fulfilled, (state, action) => {
        switch (action.payload.status) {
          case 200:
            let clipHistory = window.localStorage.getItem("clipHistory");
            clipHistory = JSON.parse(clipHistory);

            // 예외처리 resonse가 없는 경우
            const data = action.payload.response.map((el) => {

            let result = {
              isClip: false,
              item: el,
            };
  
            clipHistory.forEach(element => {
              if (element.item._id === el._id) {
                result.isClip = true;
              }
            });
            return result
          })
  
          if (action.payload.isScroll) {
            const news = action.payload.newsList.news
            const filterData = data.filter(res => {
              return !news.some(el => res.item._id === el.item.id)
            })
  
            // 페이지
            if (action.payload.page === 100) {
              state.scrollFlag = false;
            } else {
              state.scrollFlag = true;
            }
  
            state.news = [...state.news, ...filterData];
          } else {
            state.news = [...data]
          }
            break;
        case 429:
          console.log("action.payload",action.payload)
          if(action.payload.newsList !== undefined){
            if(action.payload.newsList.news.length > 0){
              state.news = [...action.payload.newsList.news]
            }
          }
          
          break;
          
          default:
            break;
        }

        
      })
      // 거부
      .addCase(funcGetNews.rejected, (state) => {
        

      });
  },
});

export const { addClip, removeClip, getClipList, clearNews } = newsSlice.actions;
export default newsSlice.reducer;
