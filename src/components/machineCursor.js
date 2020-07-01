import React from 'react';
import '../css/machine.css'



class MachineCursor extends React.Component {
    constructor(props) {
      super(props);
    }

    // _handleClick(e) {
    //     this.props._handleClick;
    // }
  
    render() {
      const { x, y } = this.props;
      return(
        <circle onMouseMove={this.props.onMouseMove} 
          cx={x} cy={y} r="20" stroke="black" strokeWidth="2" fill="red" className='machine' />
      )

    }
  }

export default MachineCursor;
