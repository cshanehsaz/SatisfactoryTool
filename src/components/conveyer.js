import React from 'react';
import '../css/conveyer.css'



class Conveyer extends React.Component {
    constructor(props) {
      super(props);
    }

    // _handleClick(e) {
    //     this.props._handleClick;
    // }
  
    render() {
      const { x1, y1, x2, y2 } = this.props;
      return(
        <line x1={x1} y1={y1} x2={x2} y2={y2} className="conveyer"/>
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

export default Conveyer;
