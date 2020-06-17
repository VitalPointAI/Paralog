import React from 'react'
import ImageLoader from '../ImageLoad/ImageLoad';
import classifications from '../../../../assets/classifications.png';

const Classifications = ({
    width = "100%", marginTop = "300px"
}) => {
    return (
        <div>
        <div className="classifications">
            <ImageLoader image={classifications} style={{ width: width, marginTop: marginTop }} />
        </div>

            
        </div>
    )
}

export default Classifications