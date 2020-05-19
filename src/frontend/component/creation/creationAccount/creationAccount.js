import React from 'react';

import Jump from '../../jump/jump';
import '../creation.css';

//miss icon for sending and share
const CreationAccount = ({ jumpName, jumpDate, dropAltitude, freefall }) => {
    return (
        <Jump
            jumpName={jumpName}
            jumpDate={jumpDate}
            dropAltitude={dropAltitude}
            freefall={freefall}
        />
    )
}

export default CreationAccount