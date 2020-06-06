import React from 'react';
import '../css/sidebar.css'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown';
import Searchbar from './searchbar.js'


class Sidebar extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return(
          <div>
              <Searchbar onClick={this.props.onClick} />
          </div>
      )

    }
  }

export default Sidebar;
