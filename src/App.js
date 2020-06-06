import React from 'react';
import './App.css';
import Canvas from './components/canvas.js'
import Sidebar from './components/sidebar.js'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tool: "conveyer"
    }
  }

  updateTool(e) {
    this.setState({tool: e.currentTarget.getAttribute("name")})
  }

  // componentDidUpdate() {
  //   console.log(this.state.tool)
  // }
    
  

  render() {
    return (
      <div className="App">
        <div className="navbar" />
        <div className="sidebar">
          <Sidebar onClick={this.updateTool.bind(this)} />
        </div>
        <Canvas tool={this.state.tool}/>
      </div>
    );
  }
  
}

export default App;
