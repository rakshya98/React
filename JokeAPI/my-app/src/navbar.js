import React from "react"
import { Link } from "react-router-dom";
import './App.css'
function Nav(){
return(
    <div className="navbar">
        <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">AboutUs</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <input type="text" placeholder="Search"></input>
        </ul>
    </div>
);
};
export default Nav;