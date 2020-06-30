import React, { Component } from 'react';
import Classifications from '../../common/classification/classifications';
import { CardGroup, Card, Container, Row, Col } from 'react-bootstrap';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

import './screen.css';
import freefallpic from '../../../../assets/freefall.png'

const mapStyles = {
    width: '95%',
    height: '300px',
    top: '5px'
};

class Screen extends Component {

    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
            showingInfoWindow: false,
            activeMarker: null
            });
        }
    }

    render() {
        let { jumper, jumpName, jumpDate,
            dropZone, dropAltitude, aircraftType, jumpType, milExitType,
            milMainCanopyType, milMainCanopySN, milResCanopyType,
            milResCanopySN, pullAltitude, freefall, milFFCanopyType,
            milFFCanopySN, milFFResCanopyType, milFFResCanopySN,
            jumpPhotos, jumpVideos } = this.props

        // Format jump date as string with date and time for display            
            let formatJumpDate = new Date(jumpDate).toLocaleString("en-US")

        // Set jumpType
        
        if(jumpPhotos[0]) {
        let photo = Window.URL.createObjectURL(jumpPhotos[0])
        console.log('photo', photo)
        }
       

        let jumpType1 = (
            <div style={{ width: "100%", height: "100%", margin: "auto", position: "relative", zIndex: "10", }}>
            <svg width="147px" height="146px" viewBox="0 0 147 146" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                <defs>
                    <pattern id="image" patternUnits="userSpaceOnUse" height="147" width="146">
                        <image x="0" y="0" height="147" width="146" xlinkHref={freefallpic}></image>
                    </pattern>
                </defs>
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="gen1" transform="translate(-782.000000, -1123.000000)">
                        <g id="c-phase1-(1)" transform="translate(783.000000, 1124.000000)">
                            <ellipse id="Oval" fill="url(#image)"  cx="72.2491349" cy="72" rx="72.2491349" ry="72"></ellipse>
                           
                            <ellipse id="Oval" stroke="#24272A" strokeWidth="2" cx="72.2491349" cy="72" rx="72.2491349" ry="72"></ellipse>
                        </g>
                    </g>
                </g>
            </svg>
            
        </div>
        )
        let shadow = (
            <div style={{ width: "60%", position: "relative", top: "-10px", margin: "auto" }}>
                <svg width="200px" height="25px" viewBox="0 0 200 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" fillOpacity="0.2">
                        <g id="create" transform="translate(-801.000000, -709.000000)" fill="#000000">
                            <ellipse id="Oval" cx="901" cy="721.048193" rx="100" ry="12.0481928"></ellipse>
                        </g>
                    </g>
                </svg>
            </div>
        )

        
        return (
           
                <Container>
                    <Row>
                        <Col xs={12}>
                            <CardGroup>
                                <Card>
                                    <Card.Header as="h6">
                                        Date
                                    </Card.Header>
                                    <Card.Body className="card-body-adjustment">
                                        {formatJumpDate}
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Header as="h6">
                                        Drop Altitude
                                    </Card.Header>
                                    <Card.Body className="card-body-adjustment">
                                        {dropAltitude} ft
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Header as="h6">
                                        Freefall
                                    </Card.Header>
                                    <Card.Body className="card-body-adjustment">
                                        {freefall} seconds
                                    </Card.Body>
                                </Card>
                            </CardGroup>
                        </Col>                       
                    </Row>
                    <Row>
                        <Col>
                            <Map
                            google={this.props.google}
                            disableDefaultUI={true}
                            zoom={14}
                            style={mapStyles}
                            initialCenter={{
                                lat: -1.2884,
                                lng: 36.8233
                            }}>
                                <Marker
                                onClick={this.onMarkerClick}
                                name={'Kenyatta International Convention Centre'}
                                />
                                <InfoWindow
                                    marker={this.state.activeMarker}
                                    visible={this.state.showingInfoWindow}
                                    onClose={this.onClose}
                                >
                                    <div>
                                        <Card>
                                            <Card.Body>
                                            <Card.Title>{this.state.selectedPlace.name}</Card.Title>
                                            <Card.Text>X, Y, Z, A, B, C</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </InfoWindow>
                          </Map>
                           
                        </Col>
                    </Row>   
                    <Row>
                        <Classifications />
                    </Row> 
                </Container>
                  
                
           
        )
    }
}

export default GoogleApiWrapper({apiKey: process.env.LOCAL_GOOGLE_API_KEY })(Screen)