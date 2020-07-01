import React from 'react';

class MachineInput extends React.Component {
    constructor(props) {
      super(props);
    }

    // _handleClick(e) {
    //     this.props._handleClick;
    // }
  
    render() {
      const { x, y } = this.props;
      let input = this.props.data.getInput()

      return(
          <>
            <circle cx={x-50} cy={y} r="10" stroke="black" strokeWidth="1" fill="white"/> 
            <text x={x-70} y={y+20} fill="black">
                {(input.length > 0 ? (input[0].name + ": " + input[0].amount) : "")}              
            </text>
          </>
      )

    }
  }

export default MachineInput;
