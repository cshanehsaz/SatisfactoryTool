import React from 'react';
import Machine from './machine.js'
import Conveyer from './conveyer.js'
import MachineCursor from './machineCursor.js'
import MachineName from './machineName.js'
import '../css/canvas.css'



class Canvas extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        x: 0, 
        y: 0, 
        nodes: [],
        conveyers: [],
        currentTarget: {},
        selector: false,
      };

    }

    handleMachineClick(e) { //conveyer connector tool
      e.stopPropagation()

      if(!this.state.selector) {
        this.setState({
          currentTarget: {x1: e.target.getAttribute("cx"), y1: e.target.getAttribute("cy")},
          selector: true
        })
      }

      else {
        let _conveyers = this.state.conveyers;
        _conveyers.push({x1: this.state.currentTarget.x1, y1: this.state.currentTarget.y1, x2: e.target.getAttribute("cx"), y2: e.target.getAttribute("cy")});
        this.setState({
          conveyers: _conveyers,
          currentTarget: {},
          selector: false
        })
      }
      
    }


    _onMouseMove(e) {
      let rect = e.target.getBoundingClientRect()
      this.setState({ x: e.screenX - rect.x, y: e.screenY - rect.y - rect.top + 50}); //50 to fix the bugs with cursors
    }

    _onClick(e) { //at some point make this so that it's not redrawing all of them every frame, just stamps somewhere more permanent instead
      let _nodes = this.state.nodes;
      _nodes.push({x: this.state.x, y: this.state.y, name: this.props.tool});
      this.setState({nodes: _nodes});
      console.log(this.state);
    }
  
    render() {
      const { x, y } = this.state;
        return(
          <div onMouseMove={this._onMouseMove.bind(this)} onClick={this._onClick.bind(this)} className="canvas">
            <svg width="100%" height="100%" className={this.state.selector ? "canvas-selector" : "canvas"}>
              {/* maps all machines, machine names, and conveyers */}
              {this.state.nodes.map(coordinate => <Machine onClick={this.handleMachineClick.bind(this)} x={coordinate.x} y={coordinate.y}/>)}
              {this.state.nodes.map(coordinate => <MachineName name={coordinate.name} x={coordinate.x} y={coordinate.y}/>)}
              {this.state.conveyers.map(coors => <Conveyer x1={coors.x1} y1={coors.y1} x2={coors.x2} y2={coors.y2} />)} 
              <MachineCursor x={x} y={y} onMouseMove={this._onMouseMove.bind(this)}/>
            </svg>
          </div>
          )
    }
  }

export default Canvas;


// this.state.selector ? {cursor: "pointer"} : {cursor: "auto"}