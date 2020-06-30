import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { TiDelete } from "react-icons/ti";
import { Card } from 'react-bootstrap';
import {DEFAULT_GAS_VALUE} from "../../../container/App/App";
import { retrieveRecord, deleteRecord } from '../../../utils/ThreadDB'

class CreationProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            jumpName: '',
            jumpDate: 0,
            jumpPhotos: []
        }
    }
   

    componentDidMount() {
        this.loadData()
        .then((result) => {
            console.log('result', result)
            this.setState({loaded:true})
            this.setState({
                jumpName: result.jumpName,
                jumpDate: result.jumpDate,
                jumpPhotos: result.jumpPhotos
            })
        })
    }

    async loadData() {
        let { jump} = this.props
        let record = await retrieveRecord(jump.jumpIdentifier, 'MilitaryJump')
        console.log('recordfinal', record)
        return record
    }

    deleteJump = () => {
        let { contract, jump, handleChange, handleDelete, } = this.props
        handleDelete()
        deleteRecord(jump.jumpIdentifier, 'MilitaryJump') 
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
        // Format jump date as string with date and time for display            
        let formatJumpDate = new Date(this.state.jumpDate).toLocaleString()
        let formatSrc = this.state.jumpPhotos[0]
        
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
                pathname: "/@" + jump.jumpIdentifier,
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
        let info = this.state.jumpName
        ? <div>{formatJumpDate} - {this.state.jumpName} <TiDelete onClick={this.deleteJump} style={{ marginLeft: "5px", color: "#ff4143", fontSize: "2rem" }} /><img src={formatSrc} alt=""/></div>
        : <div>{this.state.jumpName} <TiDelete onClick={this.deleteJump} style={{ marginLeft: "5px", color: "#ff4143", fontSize: "2rem" }} /></div>
      
       
        return (
            <div>
            <div>{!this.state.loaded ? 'Loading Data...' : ''}</div><div style={{ margin: "5px", display: "flex", flexBasis: "row wrap", justifyContent: "center" }}>
                {show}
                <Card>
                    {info}
                </Card>
            </div>
            </div>
        )
    }
}

export default CreationProfile