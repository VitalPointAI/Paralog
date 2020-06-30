import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import ImageLoader from '../../common/ImageLoad/ImageLoad'

import atmospheric from '../../../../assets/skydive-blockchain.png';
import "./poster.css";

class Poster extends Component {
   
    render() {
        
        return (
            <Grid columns={2} stackable>
            <Grid.Column width={10}>
                <Segment basic>
                    <div className="textPoster" >
                        <h1 className="main-title">JUMP. FLY. LAND. RECORD.</h1>
                        <p className="text1">Safeguard your jump record.</p>
                        <p className="text2">Parachuting meets Blockchain: Provable, Immutable, Shareable.</p> 
                    </div>
                </Segment>
            </Grid.Column>
            <Grid.Column width={6}>
                <Segment basic>    
                    <div className="imagePoster">
                        <ImageLoader image={atmospheric} style={{ width: '100%' }} />
                    </div>
                </Segment>
            </Grid.Column>          
            </Grid>
        )
    }
}

export default Poster