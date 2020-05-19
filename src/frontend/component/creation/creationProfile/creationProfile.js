import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { TiDelete } from "react-icons/ti";
import { Card } from 'react-bootstrap';
import {DEFAULT_GAS_VALUE} from "../../../container/App/App";

class CreationProfile extends Component {
    deleteJump = () => {
        let { contract, jump, handleChange, handleDelete } = this.props
        handleDelete()
        contract.deleteJumpProfile({
            tokenId: jump.jumpIdentifier
        }, DEFAULT_GAS_VALUE).then(response => {
            console.log("[profile.js] jumps", response.len)
            let newJumps = response.jumps
            handleChange({ name: "jumps", value: newJumps })
            handleDelete()
        }).catch(err => {
            console.log(err);
        })
    }
    render() {
        let { jump } = this.props
        if (!jump) { return <Redirect to="/profile" /> }

        let jumpType = "SOLO"

        let solo = (<div>
            
        </div>)

        let formation = (<div>
            
        </div>)

        let wingsuit = (<div>
           
        </div>)

        let basejump = (<div>
           
        </div>)

        let tandem= (<div>
           
            </div>)

        let show =
            <Link to={{
                pathname: "/@" + jump.jumpName,
                hash: jump.jumpIdentifier
            }} key={jump.jumpIdentifier}>"ULTRA RARE"</Link>;
        if (jumpType === "SOLO") {
            show =
                <Link to={{
                    pathname: "/@" + jump.jumpName,
                    hash: jump.jumpIdentifier
                }} key={jump.jumpIdentifier}>{solo}</Link>
        } else if (jumpType === "FORMATION") {
            show =
                <Link to={{
                    pathname: "/@" + jump.jumpName,
                    hash: jump.jumpIdentifier
                }} key={jump.jumpIdentifier}>{formation}</Link>
        } else if (jumpType === "WINGSUIT") {
            show =
                <Link to={{
                    pathname: "/@" + jump.jumpName,
                    hash: jump.jumpIdentifier
                }} key={jump.jumpIdentifier}>{wingsuit}</Link>
        } else if (jumpType === "BASEJUMP") {
            show =
                <Link to={{
                    pathname: "/@" + jump.jumpName,
                    hash: jump.jumpIdentifier
                }} key={jump.jumpIdentifier}>{basejump}</Link>
        } else if (jumpType === "TANDEM") {
            show =
                <Link to={{
                    pathname: "/@" + jump.jumpName,
                    hash: jump.jumpIdentifier
                }} key={jump.jumpIdentifier}>{tandem}</Link>
        }
        let info = jump.jumper
            ? <div>{jump.jumpDate} - {jump.jumpName} <TiDelete onClick={this.deleteJump} style={{ marginLeft: "5px", color: "#ff4143", fontSize: "2rem" }} /></div>
            : <div>{jump.jumpName} <TiDelete onClick={this.deleteJump} style={{ marginLeft: "5px", color: "#ff4143", fontSize: "2rem" }} /></div>
       
        return (
            <div style={{ margin: "5px", display: "flex", flexBasis: "row wrap", justifyContent: "center" }}>
                {show}
                <Card>
                    {info}
                </Card>
            </div>
        )
    }
}

export default CreationProfile