import React, { Component } from 'react';
import { CardGroup, Card, Container, Row, Col } from 'react-bootstrap';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

import './dzRegisterScreen.css';

const mapStyles = {
    width: '95%',
    height: '300px',
    top: '5px'
};

class DZRegisterScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            showingInfoWindow: true,
            activeMarker: {},
            selectedPlace: {},
            dzLatitude: '',
            dzLongitude: '',
            initialPosition: {},
            mapPosition: {}
        }
    }

    componentDidMount() {
        this.loadData().then(() => {
            this.setState({ 
                loaded: true
            })
            console.log('longitude on load', this.state.dzLongitude)
            console.log('next state', this.state)
        
        })
    }

    async loadData() {
       
        console.log('state', this.state)
        console.log('props', this.props)
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
        let { dropZoneName, dzDateRegistered, dzLatitude, dzLongitude, dzPhotos } = this.props

        // Format strings for display            
            let formatDzRegistrationDate = new Date(dzDateRegistered).toLocaleString("en-US")

        // Set jumpType
        
        if(dzPhotos[0]) {
        let photo = Window.URL.createObjectURL(dzPhotos[0])
        console.log('dz photo', photo)
        }
        
        return (
           
                <Container>
                    <Row>
                        <Col>
                            <CardGroup>
                                <Card>
                                    <Card.Header as="h6">
                                        Registration Date
                                    </Card.Header>
                                    <Card.Body className="card-body-adjustment">
                                        {formatDzRegistrationDate}
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Header as="h6">
                                        Latitude
                                    </Card.Header>
                                    <Card.Body className="card-body-adjustment">
                                        {dzLatitude}
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Header as="h6">
                                        Longitude
                                    </Card.Header>
                                    <Card.Body className="card-body-adjustment">
                                        {dzLongitude}
                                    </Card.Body>
                                </Card>
                            </CardGroup>
                        </Col>                       
                    </Row>
                    <Row>
                        <Col>
                        
                            <Map
                            google={this.props.google}
                            className={'map'}
                            disableDefaultUI={true}
                            zoom={1}
                            style={mapStyles}
                            center={{
                                lat: dzLatitude,
                                lng: dzLongitude
                            }}
                            >
                                <Marker
                                    title={dropZoneName}
                                    id={1}
                                    position={{
                                        lat: dzLatitude,
                                        lng: dzLongitude
                                    }}
                                    name={dropZoneName}
                                    onClick={this.onMarkerClick}
                                ></Marker>
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
                  
                </Container>
                  
                
           
        )
    }
}

export default GoogleApiWrapper({apiKey: process.env.GOOGLE_API_KEY })(DZRegisterScreen)