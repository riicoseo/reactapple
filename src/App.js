/* eslint-disable */
import {Navbar,Container,Nav, NavDropdown } from 'react-bootstrap';
import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import array from "./data.js"
//import axios from 'axios';

import {Link, Route,Switch} from 'react-router-dom';
import Detail from "./Detail.js"

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
      <div className="row">
        {
        shoes.map((shoe,i)=>{
          return <Product shoes={shoes[i]} i={i} key={i} />
        })
        }
        <button className="btn btn-primary" onClick={()=>{
          axios.get('https://codingapple1.github.io/shop/data2.json')
          .then((result)=>{ shoes변경([...shoes, ...result.data ])  })
          .catch(()=>{ })

          axios.post('https://codingapple1.github.io/shop/data2.json', { id : 'test', pw : 1234})
          .then((result)=>{  })
          .catch(()=>{ })
        }}>더보기</button>
      </div>
    </div>
</Route>



<Route path="/detail/:id">
 <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}/> 
</Route> 

<Route path="/:id">
  <div>아무거나 적었을 때 이거 보여줘</div>
</Route> 

</Switch>



{/* <Route path="/modal2" component={Modal2}>
  <div>모달component에요</div>
</Route>  */}

    



    </div>
  );
}

function Product(props){
  return(
     <div className="col-md-4">
       <img src={ 'https://codingapple1.github.io/shop/shoes'+ (props.i+1) +'.jpg'} width="100%"/>
       <h4>{props.shoes.title}</h4>  
       <p>{props.shoes.content} & {props.shoes.price}</p>        
     </div>  
    )  
 }

export default App;
