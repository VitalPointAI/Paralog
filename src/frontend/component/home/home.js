import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Poster from './poster/poster'
import Features from './features/features'

import './home.css';
class Home extends Component {
    render() {
        let { login, load, requestSignIn, accountId, length } = this.props
        if (login && length === 0) {return <Redirect to="/log"/>}
        return (
          <Container>
                <Poster 
                    requestSignIn={requestSignIn} 
                    load={load} 
                    login={login} 
                    accountId={accountId}
                />
                <Features />
            </Container>
        )
    }
}

export default Home