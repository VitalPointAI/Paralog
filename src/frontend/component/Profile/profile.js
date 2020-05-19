import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

import CreationProfile from '../creation/creationProfile/creationProfile';
import Spinners from '../common/spinner/spinner'

class Profile extends Component {
    state = {
        running: false
    }

    handleDelete = () => {
        let state = this.state.running
        this.setState({ running: !state })
    }
    render() {
        let { jumps, contract, handleChange, login, load } = this.props
        if (load && !login) { return <Redirect to="/" /> }
        let Jumps = <Spinners />
        if (jumps && jumps.length === 0) { return <Redirect to="/log" /> }
        if (jumps.length > 0) {
            Jumps = jumps.map(jump => {
                return (
                    <li style={{ textDecoration: "none" }} key={jump.jumpIdentifier}>
                        <CreationProfile
                            contract={contract}
                            jump={jump}
                            handleChange={handleChange}
                            handleDelete={this.handleDelete} />
                    </li>)
            })
        }
        if (this.state.running) { return <Goodbye /> }
        return (
            <div>
                <h1>Your Jumps</h1>
                <p>review or delete</p>
                <div>
                    <ul style={{ textAlign: "center", padding: "10px", margin: "auto", textDecoration: "none", listStyleType: "none" }}>
                        {Jumps}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Profile

const Goodbye = ({width="300px", color="black"}) => (
    <div>
        <h2>Deleting Jump...</h2>
        <Spinners />   
    </div>
)