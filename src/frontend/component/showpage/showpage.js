import React from 'react';
import { withRouter } from 'react-router-dom';

import { CreationSingle } from '../creation/creationSingle/creationSingle';
import { GiImperialCrown } from "react-icons/gi";

const ShowPage = ({ jumps, history }) => {
    let jumpIdentifier = history.location.hash.slice(1)
    let jump = jumps.filter((jump) => jump.jumpIdentifier === jumpIdentifier)[0]
    let Jump = <CreationSingle
            jumpName={jump.jumpName}
            jumpDate={jump.jumpDate}
            dropAltitude={jump.dropAltitude}
            freefall={jump.freefall}
            />

    return (
        <div>
            <h1>Checkout {jump.jumpName}!</h1>
            <div>
                {Jump}
            </div>
            <div className="display">
               
                <div>
                    <h5><GiImperialCrown style={{ color: "#9437ff", fontSize: "1.1rem" }} />Jumper: {jump.jumper}</h5>
                </div>
            </div>
        </div>
    )
}

export default withRouter(ShowPage)