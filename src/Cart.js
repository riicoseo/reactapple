import React, { useEffect, memo } from 'react';
import { Table } from 'react-bootstrap';
import { connect, useDispatch ,useSelector } from 'react-redux';
//Component에서 store에 있는 state를 쓰려면 
// 1. function 만들기
// 2. connect 를 improt 해온 후, export default connect()()
// 3. redux store 데이터를 가져와서 props 로 변환등록 ex)   function state를props화(){}
// 4. Cart 컴포넌트에 props 처럼 가져다가 사용  ex) props.state


//props.dispatch()  데이터 수정 요청을 할 땐, 항상 props.dispatch() 임! 그냥 암기!!
// props.dispatch({type:''}) type을 반드시 지정해야 함

function Cart(props) {

//state를props화 function 사용보다 state 꺼내 쓰는 더 쉬운 방법?  useSelector()
let state변수 = useSelector((state)=>state);
console.log(state변수.reducer);
// 위와 같이 useSelector 하게 되면 dispatch는 어떻게 쓰나?
let dispatch =useDispatch();


// 응용  
//reducer, reducer2 등과 같이 여러개의 reducer가 state에 담겨 있는데, 이 중 특정 한개의 reducer만 가져오고 싶을 때는
let state특정 = useSelector((state)=>state.reducer);



// 익명함수 대신 function을 만들어 써야 성능 up!
function 버튼누르면(){
    dispatch({type:'alert닫기'})
}

    return (
        <div>
            <Table responsive>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경</th>
                </tr>
                {state변수.reducer.map((a, i) => {
                    return (
                        <tr key={i}>
                            <td>{a.id}</td>
                            <td>{a.name}</td>
                            <td>{a.quan}</td>
                            <td>
                                {/* payload 혹은 data 라고 쓰고 보낼 데이터 작성 */}
                                {/*   <button onClick={() => { props.dispatch({ type:'수량증가', payload:{name:'kim'} }) }}> + </button>
                                <button onClick={() => { props.dispatch({ type:'수량감소' }) }}> - </button> 
                                 useDispatch 사용 시, props.dispatch 라고 쓰지 않고 ,  아래와 같이 바로 dispatch 사용 가능
                                */}
                                
                                <button onClick={() => { dispatch({ type:'수량증가', 데이터: a.id ,payload:{name:'kim'} }) }}> + </button>
                                <button onClick={() => { dispatch({ type:'수량감소',  데이터: a.id }) }}> - </button>
                            </td>
                        </tr>
                    )
                })}
            </Table>


{/* 만약 열고 닫는 state 를 redux를 통해 구현하면...? */}
        
        {props.alert불린 ===true
            ?(<div className='my-alert2'>
                <p> 지금 구매하시면 신규할인 20% </p>
                <button onClick={버튼누르면}>닫기</button>
                </div>)
            : null
        }
        


        <Parent 이름="존박" 나이="20"></Parent>

       </div>    
    )
}

// redux store 데이터 가져와서 props 로 변환해주는 함수(state를 props화)
// function state를props화(state) {
//     return {
//         state: state
//     }
// }

// 만약 reducer가 2개 이상 일때,,, redux store 데이터 가져와서 props로 변환하는 방법
/* function state를props화(state) {
    return {
        state: state.reducer,
        alert불린 : state.reducer2
    }
} */

//불필요한 재렌더링을 막기 위해서 memo() 사용 
//1. import {memo} from 'react';
//2. memo() 로 컴포넌트를 감싸기
//3. 컴포넌트와 관련된 props가 변경이 될 때만 재렌더링 됨
function Parent(props){
    return(
        <div>
            <Child1 이름 ={props.이름}></Child1>
            <Child2 나이 ={props.나이}></Child2>
        </div>
    )
}
function Child1(props){
    useEffect(()=>{console.log('렌더링됨1')});
    return <div>1111</div>
}
let Child2 = memo(function(){
    useEffect(()=>{console.log('렌더링됨2')});
    return <div>2222</div>
}
);

//export default connect(state를props화)(Cart)
export default Cart;