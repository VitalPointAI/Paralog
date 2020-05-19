import React from 'react';
import { Spinner } from 'react-bootstrap';
import './spinner.css'

const Spinners = () => {
    return (
        <div>
            <Spinner animation="border" role="status" className="spinner-size">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    )
}

export default Spinners