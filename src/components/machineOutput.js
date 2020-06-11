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
          <circle cx={x-20} cy={y} r="10" stroke="black" strokeWidth="1" fill="white"/> 
      )

    }
  }

export default MachineOutput;
