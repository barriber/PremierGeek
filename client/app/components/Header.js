import React from 'react';
import {Col, Image, Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'

export default function Header(props) {
    const {user} = props;
    if (user) {
        return (
            <Navbar staticTop={true} inverse className="header">
                <Navbar.Brand>
                    <a href="#">Premier-Geek</a>
                </Navbar.Brand>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="#">Results</NavItem>
                    </Nav>

                    <Nav pullRight>
                        <NavDropdown eventKey={3} title={user.firstName} id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}> Log Out </MenuItem>
                        </NavDropdown>
                        <Image src={user.userImage} responsive/>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        )
    } else {
        return null;
    }
}