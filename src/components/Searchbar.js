import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import './Searchbar.css';
import pic from './icons/pic.jpg';

class Searchbar extends Component {

    render() {
        const styleInfo = {
            //paddingLeft:'20px'
            margin: '0px'
        }
        const elementStyle = {
            display: 'flex',
            border: '0',
            
            //content: 'start',
            //border:'solid',
            //borderRadius:'10px',
            //position:'relative',
            marginLeft: '0vh',
            //height:'3vh',
            width: '48vh',
            //marginTop:'5vh',
            marginTop: '2vh',
            marginBottom: '2vh'
        }
        return (
            <search>
                <input type='text' className = "no-outline" placeholder="Search for communities, resources, and more..." style={elementStyle} />
            </search>
        )
    }   
}

export default Searchbar;
// <div>
//                 <span>Search for a specific Buoy</span>
//                 <input type='text' placeholder="Enter Buoy ID" style={elementStyle} onChange={(e) => this.searchSpace(e)} />
//                 {elements}
//                 <hr className="hrdash"></hr>
// </div>