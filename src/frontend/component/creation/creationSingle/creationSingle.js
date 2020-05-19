import React from 'react';
import Jump from '../../jump/jump';
import { Container } from 'react-bootstrap';

export const CreationSingle = ({ jumpDate, dropAltitude, freefall}) => {
    return (
        <Container>
            <div className="creation-bigjump">            
                <Jump jumpDate={jumpDate} dropAltitude={dropAltitude} freefall={freefall} />
            </div>
        </Container>
    )
}

export const CreationSingleSmall = ({ jumpDate, dropAltitude, freefall }) => {
    return (
        <Container>
            <div className="creation-smalljump">
                <Jump jumpDate={jumpDate} dropAltitude={dropAltitude} freefall={freefall} />
            </div>
        </Container>
    )
}