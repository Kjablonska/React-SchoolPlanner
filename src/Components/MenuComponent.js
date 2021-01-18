import React from 'react';
import { Link } from "react-router-dom";
import { NavLink, Nav } from 'reactstrap';
import './../index.css'

function Menu() {

    return (
        <div>
            <Nav className="mr-auto nav-place">
                <ul className="navbar-nav flex-grow navigation">
                    <NavLink tag={Link} className="link-style" to={{ pathname: '/' }}><b>TimeTable</b></NavLink>
                    <NavLink tag={Link} className="link-style" to={{ pathname: '/editDictionary', state: { dictionary: 'classes' } }}>Classes</NavLink>
                    <NavLink tag={Link} className="link-style" to={{ pathname: '/editDictionary', state: { dictionary: 'groups' } }}>Groups</NavLink>
                    <NavLink tag={Link} className="link-style" to={{ pathname: '/editDictionary', state: { dictionary: 'teachers' } }}>Teachers</NavLink>
                    <NavLink tag={Link} className="link-style" to={{ pathname: '/editDictionary', state: { dictionary: 'rooms' } }}>Rooms</NavLink>
                </ul>
            </Nav>
            <br></br>
        </div>
    )
}

export default Menu;