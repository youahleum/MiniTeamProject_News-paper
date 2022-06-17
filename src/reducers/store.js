import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import newsSlice from "./newsSlice";

const rootReducer = combineReducers({
  newsSlice,
});

/*
configureStore({

})
:createStore를 추상화한 것, redux의 기본설정을 자동화한 것으로 여러가지 store를 설정을 지정하여 store를 생성한다.
    reducer, middleware, devTools, preloadedState, enchancer
reducer: 단일 함수를 전달하여, 스토어의  최상위 reducer를 사용할 수 있고, combineReduer, SliceReducer를 통해서 루트 Reducer를 지정
middleware : 기본적으로 리덕스 미들웨를 담는 배열, 사용 할 모든 미들웨어를 배열에 담아서 명시적으로 작성하지만, 없으면 getDefaultMiddleware를 호출
devTools : boolean값으로 리덕스 개발자 도구를 끄거나 킵니다.
preloadedState : 스토의 초기값을 지정할수 있다.
enchancer : 기본적으로는 배열이지만 콜백 함수로 정의하기도 합니다. 예를 들어 다음과 같이 작성하면 개발자가 원하는 store enhancer를 미들웨어가 적용되는 순서보다 앞서서 추가할 수 있습니다.
*/
const store = configureStore({
  reducer: rootReducer,
  //  Middleware에  logger Middleware 등록
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
