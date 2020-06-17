import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { Keyframes, Frame } from 'react-keyframes';
import { ProgressBar } from 'react-bootstrap';

import Spinners from '../../common/spinner/spinner';
import {DEFAULT_GAS_VALUE} from "../../../container/App/App";

import './registering.css';
class DropZoneRegistering extends Component {
    constructor(props) {
        super(props)
        this.state = {
            running: true,
            loaded: false,
            dzId: this.props.dzId,
            dzVerificationHash: this.props.dzVerificationHash
        }
    }

    componentDidMount() {
        console.log(this.state.dzId, this.state.dzVerificationHash)
        this.loadData().then(() => {
            this.setState({loaded:true})
            console.log('dz registering props :', this.props)
            let {dzId, dzVerificationHash, handleChange, contract, dropZones } = this.props
            console.log("**dzId", dzId, "**dzVerificationhash", dzVerificationHash)
            contract.registerDropZone({
                dzId: dzId,
                dzVerificationHash: dzVerificationHash,
            }, DEFAULT_GAS_VALUE).then(response => {
                console.log("[registering.js] logging", response)
                let dz = response
                let newDropZones = dropZones.concat(dz)
                console.log(newDropZones);
                handleChange({ name: "dropZones", value: newDropZones })
                this.setState({running:false})
            }).catch(err => {
                console.log(err);
            })
        })
      
    }

    async loadData() {
        
    }
        
    render() {
        let { dropZoneName, login, load, dzId } = this.props
        const shadow = (
            <div style={{ width: "100%", position: "relative", top: "40px", margin: "auto" }}>
                <svg width="200px" height="25px" viewBox="0 0 200 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" fillOpacity="0.2">
                        <g id="create" transform="translate(-801.000000, -709.000000)" fill="#000000">
                            <ellipse id="Oval" cx="901" cy="721.048193" rx="100" ry="12.0481928"></ellipse>
                        </g>
                    </g>
                </svg>
            </div>
        )
        const One = ({width="100%"}) => (
            <div>
            <h2>25% Complete</h2>
                <ProgressBar animated now={25} />
            </div>
        )
        const Two = ({width="100%"}) => (
            <div><h2>50% Complete</h2>
            <ProgressBar animated now={50} />
            </div>
        )
        const Three = ({width="100%"}) => (
            <div><h2>75% Complete</h2>
            <ProgressBar animated now={75} />
            </div>
        )
        const Four = ({width="100%"}) => (
            <div><h2>100% Complete</h2>
            <ProgressBar animated now={100} />
            </div>
        )
        if (!load) {return <Spinners />}
        if (load && !login) {return <Redirect to="/" />}
        if (!this.state.running) { return <Redirect to={{ pathname: "/@" + dropZoneName, hash: dzId }} /> }
        return (
            <div>
                <h3>Registering...</h3>
                <div className="logging-screen">
                    <Keyframes>
                        <Frame duration={1000} component={One} ></Frame>
                        <Frame duration={1000} component={Two} ></Frame>
                        <Frame duration={1000} component={Three} ></Frame>
                        <Frame duration={1000} component={Four} ></Frame>
                    </Keyframes>
                    <div>
                        {shadow}
                    </div>
                </div>
                
            </div>)
    }
}

export default DropZoneRegistering