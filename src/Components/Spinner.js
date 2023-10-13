      // Function Based
import React from 'react'
import loading from '../Moving ball.gif'
const Spinner=()=> {
    return (
      <div className='text-center'><img className='my-3' src={loading} alt="loading" /></div>
    )
}
export default Spinner

  
     // Class Based
// import React, { Component } from 'react'
// import loading from '../Moving ball.gif'
// export default class Spinner extends Component {
//   render() {
//     return (
//       <div className='text-center'><img className='my-3' src={loading} alt="loading" /></div>
//     )
//   }
// }
