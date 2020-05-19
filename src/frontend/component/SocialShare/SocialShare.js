import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { GiImperialCrown } from "react-icons/gi";

import { CreationSingle } from '../creation/creationSingle/creationSingle';
import Spinner from '../common/spinner/spinner';
import Button from '../common/Button/Button';

class SocialShare extends Component {
    state = {
        loading: true,
        jump: null,
        copied: false
    }
    componentDidMount() {
        let {
            history,
            contract
        } = this.props
        let jumpIdentifier = history.location.hash.slice(1)
        console.log(jumpIdentifier)
        contract.getJump({ tokenId: jumpIdentifier }).then(response => {
            this.setState({
                jump: response,
                loading: false
            })
        })
    }
    render() {
        let {
            login,
            requestSignIn,
            location
        } = this.props
        let { loading, jump } = this.state
      
        if (loading) { return <Spinner /> }
        let Jump = <CreationSingle
                    jumpName={jump.jumpName}
                    jumpDate={jump.jumpDate}
                    dropAltitude={jump.dropAltitude}
                    freefall={jump.freefall}
                    />
        let address = window.location.origin + "/share" + location.hash
        
        let style = {
            width: "70%",
            maxWidth: "800px",
            margin: "2% auto",
            display: "flex",
            justifyContent: "space-between"
        }
        let poster = <div>
            <p>or do you parachute? Click to get started and safeguard your jump record!</p>
            <Button description="Get Started" action={requestSignIn} /></div>
        if (login) {
            poster = <p>Log your jumps.</p>
        }
        return (
            <div>
                <h1>Checkout {jump.jumpName}!</h1>
                <div>
                    {Jump}
                </div>
                <div style={style} >
                    <JumpType type={jump.jumpType} jumpName={jump.jumpName} />
                    <div>
                        <h5><GiImperialCrown style={{ color: "#9437ff", fontSize: "1.1rem" }} />{jump.jumper}'s jump.</h5>
                    </div>
                </div>
                <div style={{ marginBottom: "10px" }}>
                    {poster}
                    <p style={{ backgroundColor: "white", borderRadius: "5px", padding: "4px 2px", wordWrap: "break-word" }}>
                        Do you also want to share {jump.jumpName}?
                        </p>
                    <CopyToClipboard text={address}
                        onCopy={() => this.setState({ copied: true })}>
                        <button style={{ 
                                backgroundColor: "#fbb040", 
                                color: "#f2f2f2", 
                                borderRadius: "5px", 
                                padding: "4px 2px", 
                                cursor: "alias",
                                boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.5)" }}>Copy Link</button>
                    </CopyToClipboard>
                    {this.state.copied ? <span style={{ color: '#961be0', marginLeft: "5px" }}>Copied.</span> : null}
                </div>
            </div>
        )
    }
}

export default withRouter(SocialShare)

const JumpType = ({ rate, jumpName }) => {
    let common = (<div>
        
    </div>)

    let uncommon = (<div>
       
    </div>)

    let rare = (<div>
       </div>)

    let veryRare = (<div>
        
    </div>)

    let show = null
    if (rate === "COMMON") {
        show = <div>{common}<span>common</span></div>
    } else if (rate === "UNCOMMON") {
        show = <div>{uncommon}<span>uncommon</span></div>
    } else if (rate === "RARE") {
        show = <div>{rare}<span>rare</span></div>
    } else if (rate === "VERY RARE") {
        show = <div>{veryRare}<span>very rare</span></div>
    } else if (rate === "ULTRA RARE") {
        show = <div>"ULTRA RARE"</div>
    }

    return (
        <div>
            <h5>Welcome! {jumpName} is </h5>
            {show}
        </div>
    )
}