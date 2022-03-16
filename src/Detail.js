import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
//import './Detail.css'
import './Detail.scss'

function Detail(props){
    
    let history =useHistory();
    let {id} =useParams();

    let [ alert, alert변경 ] = useState(true);
    let [inputData, inputData변경] = useState('');
    useEffect(()=>{
    let 타이머 = setTimeout(()=>{ alert변경(false) }, 2000);
    return ()=>{ clearTimeout(타이머) }
     }, []);
  
     

    let 제목 = styled.h4`
     font-size : 23px;
    `;
    
    let 찾은상품 = props.shoes.find(function(상품){
        return 상품.id ==id
    });

    return(
    <div className="container">
    <div className="row">
      <div className="col-md-6">
        <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
      </div>
      <div className="col-md-6 mt-4">
        <h4 className="pt-5">{찾은상품.title}</h4>
        <p>{찾은상품.content}</p>
        <p>{찾은상품.price}</p>

        <Info 재고={props.재고}/>

        <button className="btn btn-danger" onClick={()=>{
              

        }}>주문하기</button> 

        <button className="btn btn-danger" onClick={()=>{
                //history.push('/');
                history.push('/메롱');
                //istory.goBack();
        }}>뒤로가기</button> 
      </div>
    </div>
    </div> 
    )
}

function Info(props){
  return(
    <p>재고 : {props.재고[0]}</p>
  )
}

export default Detail;