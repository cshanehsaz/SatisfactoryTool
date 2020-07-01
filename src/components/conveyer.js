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
      let angle = Math.atan((y2-y1) / (x2-x1))
      let arrx1 = Number(x2) + (x2>x1 ? -Math.round(Math.cos(angle-Math.PI/4) * 10) : Math.round(Math.cos(angle-Math.PI/4) * 10))
      let arry1 = Number(y2) + Math.round(Math.sin(angle-Math.PI/4) * 10)
      let arrx2 = Number(x2) + (x2>x1 ? -Math.round(Math.cos(angle-Math.PI/4) * 10) : Math.round(Math.cos(angle-Math.PI/4) * 10))
      let arry2 = Number(y2) + Math.round(Math.sin(angle+Math.PI/4) * 10)
      return(
        <>
          <polygon points={
                            "" + x2 + "," + y2 + 
                            " " + arrx1 + "," + arry1 +
                            " " + arrx2 + "," + arry2
                          } 
                   className="conveyer"/>
          <line x1={x1} y1={y1} x2={x2} y2={y2} className="conveyer"/>
        </>
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
