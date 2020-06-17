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

    componentDidMount() {
        console.log('db props', this.props.db)
        console.log('threadid props', this.props.threadId)
     
    }

    render() {

        let { login, load, handleChange, handleDateChange, accountId, jumpIdentifier, verificationHash,
            db, threadId, jumper, jumpName, jumpDate,
            dropZone, dropAltitude, aircraftType, jumpType, milExitType,
            milMainCanopyType, milMainCanopySN, milResCanopyType,
            milResCanopySN, pullAltitude, freefall, milFFCanopyType,
            milFFCanopySN, milFFResCanopyType, milFFResCanopySN,
            jumpPhotos, jumpVideos } = this.props

        console.log('log accountid', accountId)
        if (load && !login) {return <Redirect to="/" />}

        return (
            <div className="log">
            <AlertDismissible show={true} />
                <h2 className="head">Log a Jump</h2>
                <div className="content">
                    <Info  
                        handleChange={handleChange} 
                        handleDateChange={handleDateChange}
                        accountId={accountId}
                        jumpIdentifier={jumpIdentifier}
                        verificationHash={verificationHash}
                        jumpName={jumpName}
                        jumpDate={jumpDate}
                        jumper={jumper}
                        freefall={freefall}
                        dropAltitude={dropAltitude}
                        pullAltitude={pullAltitude}
                        dropZone={dropZone}
                        aircraftType={aircraftType}
                        jumpType={jumpType}
                        milExitType={milExitType}
                        milMainCanopyType={milMainCanopyType}
                        milMainCanopySN={milMainCanopySN}
                        milResCanopyType={milResCanopyType}
                        milResCanopySN={milResCanopySN}
                        milFFCanopyType={milFFCanopyType}
                        milFFCanopySN={milFFCanopySN}
                        milFFResCanopyType={milFFResCanopyType}
                        milFFResCanopySN={milFFResCanopySN}
                        jumpPhotos={jumpPhotos}
                        jumpVideos={jumpVideos}
                        threadId={threadId}
                        db={db}
                    />
                    <Screen 
                        jumpName={jumpName}
                        jumpDate={jumpDate}
                        jumper={jumper}
                        freefall={freefall}
                        dropAltitude={dropAltitude}
                        pullAltitude={pullAltitude}
                        dropZone={dropZone}
                        aircraftType={aircraftType}
                        jumpType={jumpType}
                        milExitType={milExitType}
                        milMainCanopyType={milMainCanopyType}
                        milMainCanopySN={milMainCanopySN}
                        milResCanopyType={milResCanopyType}
                        milResCanopySN={milResCanopySN}
                        milFFCanopyType={milFFCanopyType}
                        milFFCanopySN={milFFCanopySN}
                        milFFResCanopyType={milFFResCanopyType}
                        milFFResCanopySN={milFFResCanopySN}
                        jumpPhotos={jumpPhotos}
                        jumpVideos={jumpVideos}
                    />
                </div>
            </div>
        )
    }
}

export default Log