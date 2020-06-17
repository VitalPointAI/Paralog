import React, { Component } from 'react';
import { NavLink, Redirect, withRouter } from 'react-router-dom';
import { BsFillPlusSquareFill } from 'react-icons/bs';

import Button from '../../common/Button/Button';
import './navigation.css';

let generate = require('project-name-generator');

class Navigation extends Component {

    componentDidMount() {
        if (!this.props.login) { return <Redirect push to="/" /> }
    }

    switchToProfile = () => {
        this.props.history.push("/profile")
    }



    InfoChangeHandler = () => {
        this.props.handleChange({name:"jumpName", value: generate({ words: 2, alliterative: true }).spaced})
    }

    render() {
        let { accountName, jumpNumber, dropZoneNumber, requestSignOut } = this.props
        let jumpButtonLabel = "My Jumps (" + jumpNumber + ")"
        let dropZoneButtonLabel = "Drop Zones (" + dropZoneNumber + ")"
        return (
           
            <div className="wrap">
                <div className="account">
                    <NavLink to="/dropzones" ><Button description={dropZoneButtonLabel} /></NavLink>
                    <NavLink to="/account" ><Button description={jumpButtonLabel} /></NavLink>
                    <Card accountName={accountName} requestSignOut={requestSignOut} switchToProfile={this.switchToProfile} />
                    <NavLink to="/log"><AddJump InfoChangeHandler={this.InfoChangeHandler}/></NavLink>
                    <NavLink to="/dropzone-register"><AddDropZone /></NavLink>
                </div>
               
            </div>
            
        )
    }
}

export default withRouter(Navigation)

const Card = ({ accountName, requestSignOut, switchToProfile }) => {
    let name = "@" + accountName + "▾"
    return (
        <div className="dropdown">
            <button className="menutop">{name}</button>
            <div className="dropdown-content">
                <ul style={{textAlign:"center", padding:"2px",marginBottom: "0"}}>
                    <li className="listyle"><button onClick={switchToProfile}>Edit Profile</button></li>
                    <li className="listyle"><button onClick={requestSignOut}>Sign Out</button></li>
                </ul>
            </div>
        </div>
    )
}

const AddJump = ({InfoChangeHandler}) => (    
        <BsFillPlusSquareFill className="add-jump" onClick={InfoChangeHandler}/>
)

const AddDropZone = () => (    
    <BsFillPlusSquareFill className="add-jump"/>
)