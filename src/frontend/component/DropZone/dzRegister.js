import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Alert, Container, Row, Col } from 'react-bootstrap';
import DZRegisterInfo from './dzRegisterInfo/dzRegisterInfo'
import DZRegisterScreen from './dzRegisterScreen/dzRegisterScreen'
import './dzRegister.css'


export const AlertDismissible = ({ show }) => {
    if (show) {
        return (
            <Alert variant="warning">
                We are currently in development - play around and enter records - but you'll have to start over when we launch.<br></br>Stay tuned for the announcement.
            </Alert>
        );
    }
}

class DropZoneRegister extends Component {

    componentDidMount() {
        console.log('db props', this.props.db)
        console.log('threadid props', this.props.threadId)
    }

    render() {

        let { login, load, handleChange, handleDateChange, accountId,
            dzId, dzVerificationHash, dropZoneName, dzDateRegistered, dzLatitude, dzLongitude, dzPhotos,
            dzRegistrar } = this.props

        if (load) {console.log('log accountid', accountId)}
        if (load) {console.log('props to pass', this.props)}
        if (load && !login) {return <Redirect to="/" />}

        return (
            <div className="dzlog">
            <AlertDismissible show={true} />
                <h2 className="head">Register a Drop Zone</h2>
                <div className="content">
                <Container>
                    <Row>
                        <Col xs={4}>
                            <DZRegisterInfo  
                                handleChange={handleChange} 
                                handleDateChange={handleDateChange}
                                accountId={accountId}
                                dzId={dzId}
                                dropZoneName={dropZoneName}
                                dzVerificationHash={dzVerificationHash}
                                dzDateRegistered={dzDateRegistered}
                                dzLatitude={dzLatitude}
                                dzLongitude={dzLongitude}
                                dzRegistrar={dzRegistrar}
                                dzPhotos={dzPhotos}
                            />
                        </Col>
                        <Col xs={8}>
                            <DZRegisterScreen
                                dzId={dzId}
                                dropZoneName={dropZoneName}
                                dzDateRegistered={dzDateRegistered}
                                dzLatitude={dzLatitude}
                                dzLongitude={dzLongitude}
                                dzRegistrar={dzRegistrar}
                                dzPhotos={dzPhotos}
                            />
                        </Col>
                    </Row>
                </Container>
                </div>
            </div>
        )
    }
}

export default DropZoneRegister