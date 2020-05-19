import React from 'react';

import Jump from '../jump/jump';
import './creation.css';

const Creation = ({ jumpDate, dropAltitude, freefall, jumpName, jumper }) => {
    return (
        <div className="recorded">
            <div className="jumperboard">
                <div style={{
                   
                    padding: "10px",
                    display: "inline-block",
                    borderRadius: "10px",
                }}>
                    <Jump
                        jumpName={jumpName}
                        jumpDate={jumpDate}
                        dropAltitude={dropAltitude}
                        freefall={freefall}
                    />
                </div>
            </div>
            <p className="jump-name">{jumpName}</p>
            <p className="address">Logged by <span className="orange">@{jumper}</span></p>
        </div>
    )
}

export default Creation