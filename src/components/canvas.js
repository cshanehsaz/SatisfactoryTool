import React from 'react';
import Machine from './machine.js'
import Conveyer from './conveyer.js'
import MachineCursor from './machineCursor.js'
import MachineName from './machineName.js'
import MachineNode from '../backend/machineNode.js'
import MachineOutput from './machineOutput.js'
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
        //creates a new conveyer
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
      this.fetchMachineData(this.props.tool, this.state.nodes)
    }

    fetchMachineData(name, _nodes) {
      //fetch request for all of the data so that we ensure it's only done once and stored in state
        fetch('http://localhost:6969/getmachinedata?name=' + name)
          .then(res => res.json())
          .then(res => {
            console.log('response')
            console.log(res)
            let _data = new MachineNode(
                              res.data[0].name, 
                              res.data[0].maxInput1,
                              res.data[0].maxInput2,
                              res.data[0].maxInput3,
                              res.data[0].maxInput4,
                              res.data[0].output
                            )
            _nodes.push({x: this.state.x, y: this.state.y, data: _data})
            console.log(_nodes)
            this.setState({nodes: _nodes})
            })
    }
  
    render() {
      const { x, y } = this.state;
        return(
          <div onMouseMove={this._onMouseMove.bind(this)} onClick={this._onClick.bind(this)} className="canvas">
            <svg width="100%" height="100%" className={this.state.selector ? "canvas-selector" : "canvas"}>
              {/* maps all machines, machine names, and conveyers */}
              {/* need to be able to pass down all data stored in a machine object that we create in this class and store in the array instead of key/val chain */}
              {/* Try to make this so that we only have to map all machine nodes once instead of 3 times or whatever */}
              {this.state.nodes.map(coordinate => 
                <Machine onClick={this.handleMachineClick.bind(this)} x={coordinate.x} y={coordinate.y} data={coordinate.data}/>,
              )}
              {this.state.nodes.map(node => <MachineOutput x={node.x} y={node.y} data={node.data}/>)}
              {this.state.nodes.map(coordinate => <MachineName name={coordinate.data.name} x={coordinate.x} y={coordinate.y}/>)}
              {this.state.conveyers.map(coors => <Conveyer x1={coors.x1} y1={coors.y1} x2={coors.x2} y2={coors.y2} />)} 
              <MachineCursor x={x} y={y} onMouseMove={this._onMouseMove.bind(this)}/>
            </svg>
          </div>
          )
    }
  }

export default Canvas;


// this.state.selector ? {cursor: "pointer"} : {cursor: "auto"}