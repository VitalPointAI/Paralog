import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import ImageLoader from '../common/ImageLoad/ImageLoad';
import Navigation from './Nav/navigation'
import { GrGithub } from 'react-icons/gr'
import logo from '../../../assets/ParaLog-logo.png';
import Spinners from '../common/spinner/spinner';


import './Header.css';

class Header extends Component {
    render() {
        let { login, load, requestSignOut, accountId, length, handleChange } = this.props
        let show = <Spinners />
        if (login && load) {
            show =
            <Navbar>
            <Navbar.Brand><NavLink exact to="/" ><ImageLoader image={logo} style={{ minWidth: "100px", width: "70%" }} /></NavLink></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
               
            </Nav>
            <Nav>
                <Navigation
                accountName={accountId}
                number={length}
                requestSignOut={requestSignOut}
                login={login}
                handleChange={handleChange} />
            </Nav>
            </Navbar.Collapse>
            </Navbar>
        } else if (load) {
            show =
            <Navbar>
            <Navbar.Brand><NavLink exact to="/" ><ImageLoader image={logo} style={{ minWidth: "100px", width: "70%" }} /></NavLink></Navbar.Brand>
            <Nav className="mr-auto">
            </Nav>
            <Nav>
                <Nav.Link href="/">About</Nav.Link>
                <Nav.Link href="/"><GrGithub /></Nav.Link>
            </Nav>
            </Navbar>
              
        }
        return (
            <div>
                {show}
            </div>
        )
    }

}

export default Header