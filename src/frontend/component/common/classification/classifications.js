import React from 'react'
import ImageLoader from '../ImageLoad/ImageLoad';
import classifications from '../../../../assets/classifications.png';

const Classifications = ({
    width = "100%"
}) => {
    return (
        <div>
        <div className="classifications">
            <ImageLoader image={classifications} style={{ width: width }} />
        </div>

            
        </div>
    )
}

export default Classifications