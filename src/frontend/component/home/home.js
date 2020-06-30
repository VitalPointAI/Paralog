import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Poster from './poster/poster'
import Features from './features/features'

import './home.css';
class Home extends Component {
    render() {
        let { login, load, requestSignIn, accountId } = this.props
      
        return (
          <Container className="main">
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