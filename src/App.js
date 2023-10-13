     // Function Based
import './App.css';
import Navbar from './Components/Navbar.js'
import React, { useState } from 'react'
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'

const App=()=>{
  const pageSize=15;
  const apiKey=process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)
  
    return (
      <div>
       <Navbar></Navbar>
      <LoadingBar
        color='#f11946'
        progress={progress}
        height={3}
      />
       <News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="sports"></News>
      </div>
    )
}
export default App


     // Class Based
// import './App.css';
// import Navbar from './Components/Navbar.js'
// import React, { Component } from 'react'
// import News from './Components/News';
// import LoadingBar from 'react-top-loading-bar'

// export default class App extends Component {
//   pageSize=15;
//   apiKey=process.env.REACT_APP_NEWS_API
//   state={
//     progress:0
//   }
//   setProgress=(progress)=>{
//     this.setState({progress:progress})
//   }
//   render() {
//     return (
//       <div>
//        <Navbar></Navbar>
//       <LoadingBar
//         color='#f11946'
//         progress={this.state.progress}
//         height={3}
//       />
//        <News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="business"></News>
//       </div>
//     )
//   }
// }

