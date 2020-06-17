import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';

import CreationAccount from '../creation/creationAccount/creationAccount'
import './account.css';

class Account extends Component {
    render() {
        let { jumps, login, load } = this.props
        console.log('jumps ', jumps)
        if (load && !login) {return <Redirect to="/" />}
        let Jumps = 'loading'
        if (jumps && jumps.length === 0) { return <Redirect to="/log" /> }
        if (jumps.length > 0) {
            Jumps = jumps.map(jump => {
                return (
                    <Card key={jump.jumpIdentifier} className="spacing">
                        <Card.Header>
                            <Link to={{
                                pathname: "/@" + jump.jumpIdentifier,
                                hash: jump.jumpIdentifier
                                }} key={jump.jumpIdentifier}>
                            <h3>{jump.jumpIdentifier}</h3>
                            </Link>
                        </Card.Header>
                        <Card.Body>
                            <CreationAccount
                                jumpName={jump.jumpName}
                                jumpDate={jump.jumpDate}
                                dropAltitude={jump.dropAltitude}
                                freefall={jump.freefall}
                            />
                        </Card.Body>
                    </Card>
                    )
            })
        }
        return (
            <div>
            <Container>
                <div>
                    <h1 className="head">Your Jumps</h1>
                    <p>Review and Share</p>
                </div>
               
                    {Jumps}
               
            </Container>
            </div>
        )
    }
}

export default Account