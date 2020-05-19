import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Button from '../../common/Button/Button';
import ImageLoader from '../../common/ImageLoad/ImageLoad'

import atmospheric from '../../../../assets/skydive-blockchain.png';
import "./poster.css";

class Poster extends Component {
    componentDidMount() {

    }
    render() {
        let { requestSignIn, load, login, accountId } = this.props
        let showButton = '';
        if (!login) { showButton = <Button description="Start Logging" action={requestSignIn} /> }
        else if (login && load) { showButton = <div className="show">Logged In {accountId}</div> }
        return (
            <Container>
            
                <div className="backup">
                    <div className="textPoster" >
                        <h1 className="main-title">JUMP. FLY. LAND. RECORD.</h1>
                        <p className="text1">Safeguard your jump record.</p>
                        <p className="text2">Parachuting meets Blockchain: Provable, Immutable, Shareable.</p>
                        {showButton}
                      
                    </div>
                    <div className="imagePoster">
                        <ImageLoader image={atmospheric} style={{ width: '100%' }} />
                    </div>
                </div>
          
            </Container>
        )
    }
}

export default Poster