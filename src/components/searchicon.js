import React from 'react';
import '../css/searchicon.css'


class Searchicon extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          name: this.props.name,
      }
    }
  
    render() {
      return(
          <div onClick={this.props.onClick} name={this.props.name} className='searchicon'>
              <p style={{color: 'blue'}}>MAKE THIS AN ICON</p>
              <p>{this.state.name}</p>
          </div>
              
            )

    }
  }

export default Searchicon;
