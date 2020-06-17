import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { Keyframes, Frame } from 'react-keyframes';
import { ProgressBar } from 'react-bootstrap';

import Spinners from '../../common/spinner/spinner';
import {DEFAULT_GAS_VALUE} from "../../../container/App/App";

import './animation.css';
class Animation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            running: true,
            loaded: false,
            jumpIdentifier: this.props.jumpIdentifier,
            verificationHash: this.props.verificationHash
        }
    }

    componentDidMount() {
        console.log(this.state.jumpIdentifier, this.state.verificationHash)
        this.loadData().then(() => {
            this.setState({loaded:true})
            console.log('animation props :', this.props)
            let {jumpIdentifier, verificationHash, handleChange, contract, jumps } = this.props
            console.log("**jumpIdentifier", jumpIdentifier, "**verificationhash", verificationHash)
            contract.logMilitaryJump({
                jumpIdentifier: jumpIdentifier,
                verificationHash: verificationHash,
            }, DEFAULT_GAS_VALUE).then(response => {
                console.log("[animation.js] logging", response)
                let jump = response
                let newJumps = jumps.concat(jump)
                console.log(jump);
                handleChange({ name: "jumps", value: newJumps })
                this.setState({running:false})
            }).catch(err => {
                console.log(err);
            })
        })
      
    }

    async loadData() {
        await this.props
    }
        
    render() {
        let { jumpName, login, load, jumpIdentifier } = this.props
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
        if (!this.state.running) { return <Redirect to={{ pathname: "/@" + jumpName, hash: jumpIdentifier }} /> }
        return (
            <div>
                <h3>Logging...</h3>
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

export default Animation
