/* eslint-disable */
import {Navbar,Container,Nav, NavDropdown } from 'react-bootstrap';
import React, {useState, useEffect, useContext, lazy, Suspense} from 'react';
import logo from './logo.svg';
import './App.css';
import array from "./data.js"
//import axios from 'axios';

import {Link, Route,Switch} from 'react-router-dom';
//import Detail from "./Detail.js"
// 위 방법 대신 Detail 필요할 때, Detail 렌더링 불러오는 기술 lazy()
let Detail = lazy(()=>{ return import('./Detail.js')});
// 대신 lazy loading 이 필요한 곳에 가서 <Suspense> 태그로 감싸줘야 한다. 

import Cart from './Cart.js';
import { useHistory } from 'react-router-dom';

// let 재고context= React.createContext();
// props 대신 context를 쓰자! ( 하위 컴포넌트들이 props 없이도 부모의 값을 공유해 사용 가능!)
// React.createContext() 를 사용해야 함! ( 컴포넌트(function app  등) 밖에 생성해야 함!)
// context를 생성 한 후, 같은 값을 공유할 HTML을 범위로 싸매기! 
//  즉,  같은 값을 공유할 HTML 부분을 <생성한context이름.Provider value={공유 원하는 값}>
// <재고context.Provider value={재고}>  로 감싸기
// 즉, value에 들어간 {재고} array를 여러 곳에서 공유할 수 있다. props 없이 재고라는 state 사용 가능!
// {재고}를 props 없이 바로 Card 라는 곳에서 사용 가능해짐. 
// 대신 Card 컴포넌트에서  let 재고 = useContext(재고context);
//let 변수이름 = useContext(생성한context이름);

export let 재고context= React.createContext();
// Datail.js 와 같이 다른 곳에서도 context 공유를 원하면, export 해줘야함 
// 그리고 <Detail> html 부분을 <재고context.Provider value={재고}>    로 감싼다.
// Detail.js 에서는 import 해줘야 함   import {재고context} from './App.js';
// function Detail() 즉 Detail 컴포넌트 안에서도 let 재고 =useContext(재고context); 선언 해주고 사용해야 함


function App() {

  let [shoes, shoes변경] = useState(array);
  let [재고,재고변경] = useState([10,11,12]);
 
  return (
    <div className="App">
    <Navbar bg="light" expand="lg">
    <Container>
    <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link><Link to="/">Home</Link></Nav.Link>
        <Nav.Link><Link to="/detail">Detail</Link></Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>


<Switch>

<Route exact path="/">
<div className="background Jumbotron">
  <h1 class="display-4">20% for YOU! my Vip</h1>
  <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
  
  <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
  <p class="lead">
    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
  </p>
</div>
<div className="container">

      <재고context.Provider value={재고}>
        <div className="row">
          {
            shoes.map((shoe,i)=>{
            return <Card shoes={shoes[i]} i={i} key={i} />
            })
          }
        </div>
      </재고context.Provider>


        <button className="btn btn-primary" onClick={()=>{
          axios.get('https://codingapple1.github.io/shop/data2.json')
          .then((result)=>{ shoes변경([...shoes, ...result.data ])  })
          .catch(()=>{ })

          axios.post('https://codingapple1.github.io/shop/data2.json', { id : 'test', pw : 1234})
          .then((result)=>{  })
          .catch(()=>{ })
        }}>더보기</button>
      </div>
    
</Route>



<Route path="/detail/:id">

 <재고context.Provider value={재고}> 
  <Suspense fallback={<div>로딩중이에요</div>}>
    <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}/> 
   </Suspense>  
    
 </재고context.Provider>    

</Route> 

{/* <Route exact path="/:id">
  <div>아무거나 적었을 때 이거 보여줘</div>
</Route>  */}


{/* npm install redux react-redux  설치 => props, context 대신 간편하게 사용 가능 
  index.js 에 import {Provider} from 'react-redux'; 해준 후, <Provider>로 <App> 감싸기
  <Provider>로 감싼 모든 컴포넌트들은 같은 state 공유 가능! 
*/}
<Route exact path="/cart">
  <Cart></Cart>
</Route> 


</Switch>



{/* <Route path="/modal2" component={Modal2}>
  <div>모달component에요</div>
</Route>  */}

    



    </div>
  );
}

function Card(props){

  let 재고 = useContext(재고context);
  let history = useHistory();

  return(
     <div className="col-md-4" onClick={()=>{
       history.push('/detail/'+props.shoe.id);
     }}>
       <img src={ 'https://codingapple1.github.io/shop/shoes'+ (props.i+1) +'.jpg'} width="100%"/>
       <h4>{props.shoes.title}</h4>  
       <p>{props.shoes.content} & {props.shoes.price}</p>     
       {재고[props.i]}   
       <Test></Test>
     </div>  
    )  
 }

 // context를 사용했기 때문에, props 없이, 
 //App 컴포넌트 밑에 Card 컴포 밑에 Test 컴포 에서도 바로 {재고} 사용가능
 // 대신 useContext 로 어떤 범위 가져올 건지 선언 해주고 써야 함
function Test(){
  let 재고 = useContext(재고context);
  return <p>재고: {재고}</p>
}

export default App;
