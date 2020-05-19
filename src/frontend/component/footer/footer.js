import React from 'react';
import ImageLoad from '../common/ImageLoad/ImageLoad'
import vitalPointAILogo from '../../../assets/vitalpointai.png'
import './footer.css';

const Footer = () => (
    <div className="footer">
        <div className="left">
            <ImageLoad image={vitalPointAILogo} style={{height: "7em"}} />
            <div className="text">
                <p>A Vital Point AI project.</p>
                <p>Powering augmented cognition</p>
                <p>with blockchain, data and MR.</p>
                <p>Learn more at 
                    <a
                        href="https://vitalpoint.ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="blue" > vitalpoint.ai</a></p>
            </div>
        </div>
        <div className="right">
            <p>© 2020 Vital Point AI  </p>
            <p>All Rights Reserved.</p>
            <p className="blue">Privacy Policy  <span className="black"> | </span>  Terms of Use</p>
        </div>

    </div>
)

export default Footer