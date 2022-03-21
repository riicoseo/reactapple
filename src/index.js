import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter} from 'react-router-dom';

import {Provider} from 'react-redux';
import { combineReducers, createStore } from 'redux';


let store2 = createStore(()=>{return [{ id:0, name:'멋진신발', quan:2},
{ id:1, name:'멋진신발2', quan:5}]});
// 1. 예전 방법
// createStore() 안에 state 초기값을 return []에  넣어 저장 
// 만든 store 를 <Provider> 에 props 전송하듯이 전송


//2. 현재 방법
//state 데이터의 수정방법을 정의해놓자 by  reducer
// reducer 는 데이터 수정되면 수정값을 뱉어내고, 아무일 없으면 초기 기본값을 내뱉는다.
let 초기값=[{ id:0, name:'멋진신발', quan:2},
              { id:1, name:'멋진신발2', quan:5}];
function reducer(state=초기값, 액션){

  if (액션.type === '항목추가') {

    let found = state.findIndex((a)=>{return a.id===액션.payload.id });
 
    if(found >= 0){
      let copy = [...state];
      copy[found].quan++;
      return copy;
    
    } else {
      let copy = [...state];
      copy.push(액션.payload);
      return copy;
    }

  }

  else if(액션.type ==='수량증가'){

    let copy =[...state];
    copy[액션.데이터].quan++;
    return copy

  }else if(액션.type ==='수량감소'){
    let copy =[...state];
    copy[액션.데이터].quan--;
    return copy;

  }else{
    return state
  }
}
//let store = createStore(reducer);




// 또 다른 reduce 만들기! ( 즉, 다른 종류의 state를 저장하고 싶으면 또 다른 하나의 reduce만들기)
let alert초기값 =true;

function reducer2(state=alert초기값,액션){
  if(액션.type === 'alert닫기'){
    state = false;
    return state;
  }else{
    return state
  }

}

// reducer가 2개 일 때는 이런 식으로 store생성 ! 
let store = createStore(combineReducers({reducer,reducer2}));



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
