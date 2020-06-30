import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Info from './info/info'
import Screen from './screen/screen'
import './log.css'
import AlertDismissible from '../../component/Alert/alert'

class Log extends Component {

    componentDidMount() {
     
    }

    render() {

        let { login, load, handleChange, handleDateChange, accountId, jumpIdentifier, verificationHash,
            jumper, jumpName, jumpDate,
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