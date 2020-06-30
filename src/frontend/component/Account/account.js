import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Card, Header } from 'semantic-ui-react';
import JumpCard from './JumpCard/jumpCard'

import './account.css';

class Account extends Component {
    constructor(props) {
        super(props)
        this.state = {
            running: false
        }
    }

    handleDelete = () => {
        let state = this.state.running
        this.setState({ running: !state })
    }

    render() {
        let { jumps, login, load, handleChange, contract } = this.props
        console.log('jumps ', jumps)
        if (load && !login) {return <Redirect to="/" />}
        let Jumps = 'loading'
        if (jumps && jumps.length === 0) { return <Redirect to="/log" /> }
        
        if (jumps.length > 0) {
            Jumps = jumps.map(jump => {
                return (
                        <JumpCard
                            key={jump.jumpIdentifier}
                            contract={contract}
                            jump={jump}
                            handleChange={handleChange}
                            handleDelete={this.handleDelete} />
                    )
            })
        }
            
        return (
            <Container>
                <Header as='h1'>Your Jumps</Header>
                <Header as='h3'>Review, Delete, and Share</Header>
                <Card.Group>
                 {Jumps}
                </Card.Group>
            </Container>
        )
        }
    }


export default Account