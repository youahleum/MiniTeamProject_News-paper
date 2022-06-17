import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const funcGetNews = createAsyncThunk(
  "getNewsData",
  async (termObj, tunk) => {
    const response = await axios
      .get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${termObj.term}&page=${termObj.page}&api-key=NHvfRQhoJiMLF43mhsdgCGwADhhoZEOT`
      )
      .then((res) => res.data.response.docs);
    return response;
  }
);

export const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
    clipList: [],
    isScroll: false,
    // cliped: false,
  },

  reducers: {
    addClip: (state, action) => {
      return {
        ...state,
        clipList: state.clipList.concat(action.payload),
        // cliped: true,
      };
    },
    removeClip: (state, action) => {
      return {
        ...state,
        clipList: state.clipList.filter(
          (item) => item._id !== action.payload._id
        ),
        // cliped: false,
      };
    },
  },

  // createSlice가 생성한 액션타입 외 다른 택션타입에 응답할 수 있도록 합니다.(외부의 액션을 참조)
  extraReducers: (builder) => {
    // build.addCase(async function.pending fulfilled, reject, (state, action))
    builder
      // Promise 상태에 따른 결과 처리르 할 수 있다.
      // 보류
      .addCase(funcGetNews.pending, (state) => {
        console.log("Pending");
      })
      // 충족
      .addCase(funcGetNews.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.news = [...state.news, ...action.payload];
      })
      // 거부
      .addCase(funcGetNews.rejected, (state) => {
        console.log("rejected");
      });
  },
});

export const { addClip, removeClip } = newsSlice.actions;
export default newsSlice.reducer;
