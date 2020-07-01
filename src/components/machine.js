import React from 'react';
import '../css/machine.css'



class Machine extends React.Component {
    constructor(props) {
      super(props);

      //not sure if this should go here or if an object should just be passed around
      this.state = {
        data: this.props.data,
      }
    }

    // _handleClick(e) {
    //     this.props._handleClick;
    // }
  
    render() {
      const { x, y } = this.props;
      return(
          <circle onClick={this.props.onClick} cx={x} cy={y} 
          r="20" stroke="black" strokeWidth="2" fill="red" className='machine' />    
      )

    }
  }


//   return <div onMouseMove={this._onMouseMove.bind(this)}>
//         <h1>Mouse coordinates: { x } { y }</h1>
//       </div>;

// function Machine() {

//   _onMouseMove

//   return (
//     <circle cx="100" cy="100" r="40" stroke="black" stroke-width="3" fill="red" />
//   );
// }

export default Machine;
