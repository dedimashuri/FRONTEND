import React, { Component } from "react";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";
import { Link, NavLink as LinkRouter } from "react-router-dom";

class Header extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    return (
      <Navbar color="warning"  expand="md" >
        <NavbarBrand>
          <Link to="/">HOME</Link>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <LinkRouter to="/corona" className="mx-2">
                CORONA
              </LinkRouter>
            </NavItem>
            <NavItem>
              <LinkRouter to="/dataUsers" className="mx-2">
                DATA USERS
              </LinkRouter>
            </NavItem>
            <NavItem>
              <Link to="/iCom" className="mx-2">
                ICOM
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Header;
