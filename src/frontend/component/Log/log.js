import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import Info from './info/info'
import Screen from './screen/screen'

import './log.css'

export const AlertDismissible = ({ show }) => {
    if (show) {
        return (
            <Alert variant="warning">
                We are currently in development - play around and enter records - but you'll have to start over when we launch.<br></br>Stay tuned for the announcement.
            </Alert>
        );
    }
}

class Log extends Component {
    render() {
        let {login, load, handleChange, handleDateChange, jumpName, jumpDate, dropAltitude, freefall} = this.props
        if (load && !login) {return <Redirect to="/" />}

        return (
            <div className="log">
            <AlertDismissible show={true} />
                <h2 className="head">Log a Jump</h2>
                <div className="content">
                    <Info  handleChange={handleChange} handleDateChange={handleDateChange} jumpName={jumpName}/>
                    <Screen jumpDate={jumpDate} dropAltitude={dropAltitude} freefall={freefall}/>
                </div>
            </div>
        )
    }
}

export default Log