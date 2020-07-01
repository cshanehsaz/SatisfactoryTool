import React from 'react';
import Machine from './machine.js'
import Conveyer from './conveyer.js'
import MachineCursor from './machineCursor.js'
import MachineName from './machineName.js'
import MachineNode from '../backend/machineNode.js'
import MachineOutput from './machineOutput.js'
import MachineInput from './machineInput.js'
import '../css/canvas.css'
import { findAllByAltText } from '@testing-library/react';



class Canvas extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        x: 0, 
        y: 0, 
        nodes: [],
        conveyers: [],
        currentTarget: null,
        selector: false,
      };

    }

    handleMachineClick(e) { //conveyer connector tool
      e.stopPropagation()

      //selects clicked node as current target and prep for next click
      if(!this.state.selector) {
        this.setState({
          currentTarget: this.handleMachineClickHelper(this.state.nodes, e),
          selector: true
        })
      }

      //creates conveyer
      else {
        let parentNode = this.state.currentTarget
        let childNode = this.handleMachineClickHelper(this.state.nodes, e)
        parentNode.data.addChild(childNode.data)
        parentNode.data.wipeChildrenInput()
        console.log(parentNode.data)
        parentNode.data.sendOutput()

        let _conveyers = this.state.conveyers;
        _conveyers.push({x1: parentNode.x, y1: parentNode.y, x2: childNode.x, y2: childNode.y});
        this.setState({
          conveyers: _conveyers,
          currentTarget: {},
          selector: false
        })
      }      
    }

    handleMachineClickHelper(nodes, e) {
      for(let node of nodes) {
        if(node.x === Number(e.target.getAttribute("cx")) && node.y === Number(e.target.getAttribute("cy"))) {
          return(node)
        }
      }
    }

    _onMouseMove(e) {
      let rect = e.target.getBoundingClientRect()
      this.setState({ x: e.screenX - rect.x, y: e.screenY - rect.y - rect.top + 50}); //50 to fix the bugs with cursors
    }

    _onClick(e) { //at some point make this so that it's not redrawing all of them every frame, just stamps somewhere more permanent instead
      let _nodes = this.state.nodes;
      this.fetchMachineData(this.props.tool, _nodes)
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
                              JSON.parse(res.data[0].maxInput1),
                              JSON.parse(res.data[0].maxInput2),
                              JSON.parse(res.data[0].maxInput3),
                              JSON.parse(res.data[0].maxInput4),
                              JSON.parse(res.data[0].output)
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
            <svg onMouseMove={this._onMouseMove.bind(this)} onClick={this._onClick.bind(this)} width="100%" height="100%" className={this.state.selector ? "canvas-selector" : "canvas"}>
              {/* maps all machines and conveyers */}
              {/* need to be able to pass down all data stored in a machine object that we create in this class and store in the array instead of key/val chain */}
              {this.state.nodes.map(node => 
                <>
                  <Machine onClick={this.handleMachineClick.bind(this)} x={node.x} y={node.y} data={node.data}/>
                  <MachineOutput x={node.x} y={node.y} data={node.data}/>
                  <MachineInput x={node.x} y={node.y} data={node.data} />
                  <MachineName name={node.data.name} x={node.x} y={node.y}/>
                </>
              )}
              {this.state.conveyers.map(conveyer => 
                <Conveyer x1={conveyer.x1} y1={conveyer.y1} x2={conveyer.x2} y2={conveyer.y2} />
              )} 
              <MachineCursor x={x} y={y} onMouseMove={this._onMouseMove.bind(this)}/>
            </svg>
          </div>
          )
    }
  }

export default Canvas;