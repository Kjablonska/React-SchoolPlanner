import React, { Component } from 'react';
import { Link  } from "react-router-dom";
import { NavItem, NavLink } from 'reactstrap';

function Menu(props) {

    return (
        <div>
            <NavItem>
                <NavLink tag={Link} className="text-white" to='/'>TimeTable</NavLink>
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
        </div>
    )
}

export default Menu;