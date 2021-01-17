import React from 'react';
import { Link } from "react-router-dom";
import { NavItem, NavLink } from 'reactstrap';
import './views.css'

function Menu() {

    return (
        <nav>
        {/* <Navbar> */}
            <ul className="navbar-nav flex-grow navigation">
            <NavItem>
                <NavLink tag={Link} className="text-white" to={{pathname:'/'}}>TimeTable
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-white" to={{pathname:'/editDictionary', state: {dictionary:'classes'}}}>Classes</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-white" to={{pathname:'/editDictionary', state: {dictionary:'groups'}}}>Groups</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-white" to={{pathname:'/editDictionary', state: {dictionary:'teachers'}}}>Teachers</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-white" to={{pathname:'/editDictionary', state: {dictionary:'rooms'}}}>Rooms</NavLink>
            </NavItem>
            </ul>
        {/* </Navbar> */}
        </nav>
    )
}

export default Menu;