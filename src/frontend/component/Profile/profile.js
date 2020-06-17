import React, { Suspense, Component } from 'react'
import { Redirect } from 'react-router-dom';

import CreationProfile from '../creation/creationProfile/creationProfile';
import Spinners from '../common/spinner/spinner'
import { initiateDB } from '../../utils/ThreadDB'

class Profile extends Component {
    state = {
        running: false,
        jumpName: '',
        jumpDate: 0,
        retrieved: false
    }

    handleDelete = () => {
        let state = this.state.running
        this.setState({ running: !state })
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        return initiateDB()
    }
   
    componentDidUpdate() {
    }

    render() {
        
        let { jumps, contract, handleChange, login, load, db, threadId } = this.props
        if (load && !login) { return <Redirect to="/" /> }
        let Jumps = <Spinners />
        if (jumps && jumps.length === 0) { return <Redirect to="/log" /> }
        if (jumps.length > 0) {
            Jumps = jumps.map(jump => {
                console.log('jump', jump)
                console.log('jump id', jump.jumpIdentifier)
                
            
                return (
                    <li style={{ textDecoration: "none" }} key={jump.jumpIdentifier}>
                        <CreationProfile
                            contract={contract}
                            jump={jump}
                            db={db} 
                            threadId={threadId}
                            handleChange={handleChange}
                            handleDelete={this.handleDelete} />
                    </li>
                    )
    
            })
        }                   
            
        if (this.state.running) { return <Goodbye /> }
        return (
            <div>
                <h1>Your Jumps</h1>
                <p>review or delete</p>
                <Suspense fallback={<div>Loading...</div>}>
                <div>
                    <ul style={{ textAlign: "center", padding: "10px", margin: "auto", textDecoration: "none", listStyleType: "none" }}>
                        {Jumps}
                    </ul>
                </div>
                </Suspense>
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