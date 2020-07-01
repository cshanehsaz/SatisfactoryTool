import React from 'react';

class MachineOutput extends React.Component {
    constructor(props) {
      super(props);
    }

    // _handleClick(e) {
    //     this.props._handleClick;
    // }
  
    render() {
      const { x, y } = this.props;
      return(
          <>
            <circle cx={x+50} cy={y} r="10" stroke="black" strokeWidth="1" fill="white"/> 
            <text x={x+40} y={y+20} fill="black">
                {this.props.data.output.name}: {this.props.data.output.amount}                
            </text>
          </>
      )

    }
  }

export default MachineOutput;
