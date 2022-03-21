import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
//Component에서 store에 있는 state를 쓰려면 
// 1. function 만들기
// 2. connect 를 improt 해온 후, export default connect()()
// 3. redux store 데이터를 가져와서 props 로 변환등록 ex)   function state를props화(){}
// 4. Cart 컴포넌트에 props 처럼 가져다가 사용  ex) props.state


//props.dispatch()  데이터 수정 요청을 할 땐, 항상 props.dispatch() 임! 그냥 암기!!
// props.dispatch({type:''}) type을 반드시 지정해야 함

function Cart(props) {
    return (
        <div>
            <Table responsive>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경</th>
                </tr>
                {props.state.map((a, i) => {
                    return (
                        <tr key={i}>
                            <td>{a.id}</td>
                            <td>{a.name}</td>
                            <td>{a.quan}</td>
                            <td>
                                {/* payload 혹은 data 라고 쓰고 보낼 데이터 작성 */}
                                <button onClick={() => { props.dispatch({ type:'수량증가', payload:{name:'kim'} }) }}> + </button>
                                <button onClick={() => { props.dispatch({ type:'수량감소' }) }}> - </button>
                            </td>
                        </tr>
                    )
                })}
            </Table>


{/* 만약 열고 닫는 state 를 redux를 통해 구현하면...? */}
        
        {props.alert불린 ===true
            ?(<div className='my-alert2'>
                <p> 지금 구매하시면 신규할인 20% </p>
                <button onClick={()=>{props.dispatch({type:'alert닫기'})}}>닫기</button>
                </div>)
            : null
        }
        


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


export default connect(state를props화)(Cart)
//export default Cart;