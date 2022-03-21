import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
//import './Detail.css'
import './Detail.scss'
import { Nav } from 'react-bootstrap';

import { 재고context } from './App.js';

import { connect } from 'react-redux';

import {CSSTransition} from 'react-transition-group';




function Detail(props) {

  let [누른탭, 누른탭변경] = useState(0);
  let [스위치, 스위치변경] = useState(false);

  let 재고 = useContext(재고context);

  //history.goback 등의 히스토리 내역을 기억하고, 이동가능하게 한다(뒤로가기)
  let history = useHistory();


  let { id } = useParams();

  let [alert, alert변경] = useState(true);
  let [inputData, inputData변경] = useState('');



  useEffect(() => {
    // setTimeout 함수: x초 후(여기선 2초)에 특정 코드를 실행해 주세요!
    // setTimeout은 unmount 될 때, 다시 타이머 제거가 필요함! (clearTimeout 필요)
    let 타이머 = setTimeout(() => { alert변경(false) }, 2000);
    return () => { clearTimeout(타이머) }
  }, []);
  // useEffect 함수는  return 부분을 작성할  수도 있다.  
  //return 부분에 작성된 코드는 해당 Component가 unMount 될 때,  실행 되는 코드부분이다!
  // useEffect는 마지막에 ,[] 를 넣을 수 있는데  [] 는 useEffect 가 실행 될 때의 조건을 넣는 곳이다.
  // 즉, [alert] 라고 적어 넣으면,
  // 맨 처음 해당 component가 mount 될 때와, alert state가 변화가 있어 업데이트 될 때마다, 
  // useEffect를 실행하게 된다.
  // 여러개 넣을 수도 있다  [alert, inputData]
  // 그냥 아무것도 안 적어두면 ([] 로 적어두면), 
  // mount 될 때 실행 된 후, 영영 실행되지 않는다. (업데이트 될 때 실행되지 않는다.)

  let 제목 = styled.h4`
     font-size : 23px;
    `;

  let 찾은상품 = props.shoes.find(function (상품) {
    return 상품.id == id
  });



//최근 본 상품
useEffect( ()=>{
  var arr = localStorage.getItem('watched');
  if(arr==null){arr=[]
  } else {arr = JSON.parse(arr)};
  
  arr.push(id);
  arr = new Set(arr);
  arr = [...arr];
 
  localStorage.setItem('watched', JSON.stringify(arr) );

}, [] );


  return (
    <div className="container">
      <div className="박스">
        <div className="제목">Detail</div>
      </div>

      {/* input에 글이 작성 되면, 바로바로 그 값을 가져와서 inputData에 셋팅해주고, 화면에도 보여주는 코드 */}
      {inputData}
      <input onChange={(e) => { inputData변경(e.target.value) }} />



      {
        alert === true
          ? (<div className="my-alert">
            <p>재고가 얼마 남지 않았습니다</p>
          </div>)
          : null
      }



      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>

          <Info 재고={props.재고} />

          <button className="btn btn-danger" onClick={() => {

            props.dispatch({ type: '항목추가', payload: { id: 찾은상품.id , name:찾은상품.title, quan: 1 } })
            //개발환경에서 페이지 이동시, 강제 새로고침 안되게 하려면,,, history.push('/cart');
            history.push('/cart');
          }}>주문하기</button>



          <button className="btn btn-danger" onClick={() => {
            //history.push('/');
            history.push('/메롱');
            //istory.goBack();
          }}>뒤로가기</button>
        </div>
      </div>



      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={()=>{스위치변경(false); 누른탭변경(0)}}>0번을누르면</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={()=>{스위치변경(false); 누른탭변경(1)}}>1번을누르면</Nav.Link>
        </Nav.Item>
      </Nav>

    <CSSTransition in={스위치} classNames="wow" timeout={500}>
      <TabContent 누른탭={누른탭} 스위치변경={스위치변경}/>
    </CSSTransition>

    </div>
  )
}

function TabContent(props){

  useEffect(()=>{
    props.스위치변경(true);
  });

  if(props.누른탭 === 0){
    return <div>0번째 내용입니다.</div>
  }else if(props.누른탭 === 1){
    return <div>1번째 내용입니다.</div>
  }else if(props.누른탭 === 2){
    return <div>2번째 내용입니다.</div>
  }
}



function Info(props) {
  return (
    <p>재고 : {props.재고[0]}</p>
  )
}

function state를props화(state) {
  console.log(state);
  return {
    state: state.reducer,
    alert열렸니: state.reducer2
  }
}

export default connect(state를props화)(Detail)
//export default Detail;

