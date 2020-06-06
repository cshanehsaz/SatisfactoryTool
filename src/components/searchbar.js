import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown';
import Searchicon from './searchicon.js'
import Machinedb from '../tempdb/machinedb.js'
import '../css/searchbar.css'


class Searchbar extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          searchInput: "",
          searchResults: Machinedb.getdb(),
      }
    }

    handleInput(e) {
        let _searchResults = [];
        let input = e.target.value.toLowerCase();

        let db = Machinedb.getdb();
        for (let machine of db) {
            if( machine.indexOf(input) === 0 ) {
                _searchResults.push(machine)
            }
        }
        
        this.setState({
            searchInput: input,
            searchResults: _searchResults,
        })
    }
  
    render() {
      return(
          <div>
              <input className="searchbar" placeholder="Search by Machine" onChange={this.handleInput.bind(this)} />
              {this.state.searchResults.map(_name => <Searchicon name={_name} key={_name} onClick={this.props.onClick} />)} 

          </div>
              
            )

    }
  }

export default Searchbar;
