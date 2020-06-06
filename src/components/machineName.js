import React from 'react';
import '../css/machine.css'



class MachineName extends React.Component {
    constructor(props) {
      super(props);
    }

    // _handleClick(e) {
    //     this.props._handleClick;
    // }
  
    render() {
      const { x, y } = this.props;
      return(
          <text onClick={this.props.onClick} x={x} y={y} fill="black">
              {this.props.name}
          </text>    
      )

    }
  }

export default MachineName;
