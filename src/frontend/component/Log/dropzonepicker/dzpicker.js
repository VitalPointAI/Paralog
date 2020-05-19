import React, { Component } from 'react';

import './dzpicker.css'

class DZPicker extends Component {

    handleDZChange = (event) => {
        let value = event.target.value;
        this.props.handleChange({ name: "dropZone", value })
    }

    handleBackGroundMapChange = (event) => {
        let value = event.target.value;
        this.props.handleChange({ name: "backgroundMap", value })
    }

    render() {
        const arrow = (
            <div>
                <svg width="15px" height="15px" viewBox="0 0 15 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="create" transform="translate(-110.000000, -548.000000)" fill="#24272A">
                            <polygon id="Fill-1-Copy" points="128 548 110 566 128 566"></polygon>
                        </g>
                    </g>
                </svg>
            </div>
        )
        let { color, backgroundMap } = this.props
        return (
            <div>
                <div className="dzpicker">
                    <label>
                        <div className="result" style={{ backgroundColor: color }}>
                            <input 
                                type="color" 
                                id="dz-picker" 
                                name="dropZone"
                                value={color} 
                                onChange={this.handleDZChange}
                                style={{
                                    display: "none"
                                }} />
                            <div className="select">{arrow}</div>
                        </div>
                    </label>
                    <div>
                        <p style={{ marginBottom: "0", marginLeft: "2px", fontWeight: "600" }}>Drop Zone</p>
                        <p style={{ marginBottom: "0", marginLeft: "2px", }}>{color}</p>
                    </div>
                </div>
                <div className="colorpicker">
                    <label>
                        <div className="result" style={{ backgroundColor: backgroundMap }}>
                            <input 
                                type="color" 
                                id="backcolor-picker" 
                                name="backcolor"
                                value={backgroundMap} 
                                onChange={this.handleBackGroundMapChange}
                                style={{
                                    display: "none"
                                }} />
                            <div className="select">{arrow}</div>
                        </div>
                    </label>
                    <div>
                        <p style={{ marginBottom: "0", marginLeft: "2px", fontWeight: "600" }}>Canopy Type</p>
                        <p style={{ marginBottom: "0", marginLeft: "2px", }}>{backgroundMap}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default DZPicker