import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { BsCardHeading, BsFillCalendarFill, BsArrowUp, BsFillClockFill } from "react-icons/bs";
import { Form, InputGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import Button from '../../common/Button/Button';

import './info.css';
import 'react-datepicker/dist/react-datepicker.css';
import { ThreadID } from '@textile/threads-id';
import { generateHash } from '../../../utils/Encryption';
import { initiateDB } from '../../../utils/ThreadDB';

let generate = require('project-name-generator');

const JUMPER_IDENTIFIER = 8;
let db = null;

class Info extends Component {

        state = {
            jumpName: `${this.props.jumpName}`,
            jumpDate: new Date(),
            jumper: this.props.accountId,
            freefall: '',
            dropAltitude: '',
            pullAltitude: '',
            dropZone: '',
            aircraftType: '',
            jumpType: '',
            milExitType: '',
            milMainCanopyType: '',
            milMainCanopySN: '',
            milResCanopyType: '',
            milResCanopySN: '',
            milFFCanopyType: '',
            milFFCanopySN: '',
            milFFResCanopyType: '',
            milFFResCanopySN: '',
            jumpPhotos: '',
            jumpVideos: '',
            verificationHash: '',
        };

    componentDidMount() {
        initiateDB(this.props.accountId).then((result) => {
            db = result;
        })
    }

    handleRandomName = () => {
        let name = generate({ words: 2, alliterative: true }).spaced
        this.setState({ jumpName: name })
        this.props.handleChange({ name: "jumpName", value: name })
    }

    handleDateChange = (event) => {
        console.log(event)
        this.setState({jumpDate: event})
        this.props.handleDateChange({ name: "jumpDate", value: event });
    }

    handleNameChange = (event) => {
        let value = event.target.value;
        this.setState({ jumpName: value })
        this.props.handleChange({ name: "jumpName", value })
    }

    handleFreeFallChange = (event) => {
        let value = event.target.value;
        this.setState({ freefall: value })
        this.props.handleChange({ name: "freefall", value })
    }

    handleAltitudeChange = (event) => {
        let value = event.target.value;
        this.setState({ dropAltitude: value })
        this.props.handleChange({ name: "dropAltitude", value })
    }

    handlePullAltitude = (event) => {
        let value = event.target.value;
        this.setState({ pullAltitude: value })
        this.props.handleChange({ name: "pullAltitude", value })
    }

    handleDropZone = (event) => {
        let value = event.target.value;
        this.setState({ dropZone: value })
        this.props.handleChange({ name: "dropZone", value })
    }

    handleAirCraftType = (event) => {
        let value = event.target.value;
        this.setState({ aircraftType: value })
        this.props.handleChange({ name: "aircraftType", value })
    }

    handleJumpType = (event) => {
        let value = event.target.value;
        this.setState({ jumpType: value })
        this.props.handleChange({ name: "jumpType", value })
    }

    handleMilExitType = (event) => {
        let value = event.target.value;
        this.setState({ milExitType: value })
        this.props.handleChange({ name: "milExitType", value })
    }

    handleMilMainCanopyType = (event) => {
        let value = event.target.value;
        this.setState({ milMainCanopyType: value })
        this.props.handleChange({ name: "milMainCanopyType", value })
    }

    handleMilMainCanopySN = (event) => {
        let value = event.target.value;
        this.setState({ milMainCanopySN: value })
        this.props.handleChange({ name: "milMainCanopySN", value })
    }

    handleMilResCanopyType = (event) => {
        let value = event.target.value;
        this.setState({ milResCanopyType: value })
        this.props.handleChange({ name: "milResCanopyType", value })
    }

    handleMilResCanopySN = (event) => {
        let value = event.target.value;
        this.setState({ milResCanopySN: value })
        this.props.handleChange({ name: "milResCanopySN", value })
    }

    generateId() {
        let buf = Math.randomBuffer(JUMPER_IDENTIFIER);
        let b64 = btoa(buf);
        return b64;
    }

    async handleSubmit(e) {

        let { handleChange, history, accountId, jumper, jumpName, jumpDate,
            dropZone, dropAltitude, aircraftType, jumpType, milExitType,
            milMainCanopyType, milMainCanopySN, milResCanopyType,
            milResCanopySN, pullAltitude, freefall, milFFCanopyType,
            milFFCanopySN, milFFResCanopyType, milFFResCanopySN,
            jumpPhotos, jumpVideos } = this.props

        e.preventDefault()
        let data = jumper+jumpDate+dropZone;
        let verificationHash = generateHash(data);

        await db.create(ThreadID.fromString(this.state.threadId), 'MilitaryJump', [
                  {
                    _id: this.generateId(),
                    jumper: accountId,
                    jumpName: jumpName,
                    jumpDate: jumpDate,
                    dropZone: dropZone,
                    dropAltitude: dropAltitude,
                    aircraftType: aircraftType,
                    jumpType: jumpType,
                    milExitType: milExitType,
                    milMainCanopyType: milMainCanopyType,
                    milMainCanopySN: milMainCanopySN,
                    milResCanopyType: milResCanopyType,
                    milResCanopySN: milResCanopySN,
                    pullAltitude: pullAltitude,
                    freefall: freefall,
                    milFFCanopyType: milFFCanopyType,
                    milFFCanopySN: milFFCanopySN,
                    milFFResCanopyType: milFFResCanopyType,
                    milFFResCanopySN: milFFResCanopySN,
                    jumpPhotos: jumpPhotos,
                    jumpVideos: jumpVideos,
                    verificationHash: verificationHash,
                  }
        ]);
        handleChange(
            { name: "jumpName", value: this.state.jumpName })
        history.push("/logging")
    }

    render() {
    
        return (
            <div className="inputboard">
            <p className="quote">Just fill out the jump data and we’ll do the rest.</p>
                <p className="title">Jump Name</p>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend"><BsCardHeading onClick={this.handleRandomName} /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                name="Name"
                                type="text"
                                placeholder="Jump name"
                                onChange={this.handleNameChange}
                                value={this.state.jumpName}
                                required
                            />
                        </InputGroup>
                    </Form.Row>
                   
                    <p className="title">Jump Data</p>
                    <Form.Row>
                    <InputGroup className="spacing">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend"><BsFillCalendarFill /></InputGroup.Text>
                        </InputGroup.Prepend>
                            <DatePicker 
                                className="datepicker"
                                selected={this.state.jumpDate}
                                onChange={this.handleDateChange}
                                name="jumpDate"
                                dateFormat="MM/dd/yyyy"
                                required
                            />
                    </InputGroup>
                    </Form.Row>
                    <Form.Row>
                    <InputGroup className="spacing">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend"><BsArrowUp /></InputGroup.Text>
                        </InputGroup.Prepend>
                            <Form.Control
                                name="dropAltitude"
                                type="number"
                                placeholder="Drop Altitude"
                                onChange={this.handleAltitudeChange}
                                value={this.state.dropAltitude}
                                required
                            />
                    </InputGroup>
                    </Form.Row>
                    <Form.Row>
                    <InputGroup className="spacing">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend"><BsArrowUp /></InputGroup.Text>
                        </InputGroup.Prepend>
                            <Form.Control
                                name="pullAltitude"
                                type="number"
                                placeholder="Pull Altitude"
                                onChange={this.handlePullAltitude}
                                value={this.state.pullAltitude}
                                required
                            />
                    </InputGroup>
                    </Form.Row>
                    <Form.Row>
                    <InputGroup className="spacing">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend"> <BsFillClockFill /></InputGroup.Text>
                        </InputGroup.Prepend>
                            <Form.Control
                                name="freefall"
                                type="number"
                                placeholder="Seconds in Freefall"
                                onChange={this.handleFreeFallChange}
                                value={this.state.freefall}
                                required
                            />
                    </InputGroup>
                    </Form.Row>
                    <Form.Row>
                    <InputGroup className="spacing">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend"> <BsFillClockFill /></InputGroup.Text>
                        </InputGroup.Prepend>
                            <Form.Control as="select"
                                name="dropZone"
                                type="string"
                                placeholder="Select Drop Zone"
                                onChange={this.handleDropZone}
                                value={this.state.dropZone}
                                required
                            >
                            <option>Perris Valley</option>
                            <option>Mountain View</option>
                            </Form.Control>
                    </InputGroup>
                    </Form.Row>
                    <Form.Row>
                    <InputGroup className="spacing">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend"> <BsFillClockFill /></InputGroup.Text>
                        </InputGroup.Prepend>
                            <Form.Control as="select"
                                name="aircraftType"
                                type="string"
                                placeholder="Select Aircraft"
                                onChange={this.handleAirCraftType}
                                value={this.state.aircraftType}
                                required
                            >
                            <option>CC-130J</option>
                            <option>Twin Otter</option>
                            </Form.Control>
                    </InputGroup>
                    </Form.Row>
                    <Form.Row>
                    <InputGroup className="spacing">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend"> <BsFillClockFill /></InputGroup.Text>
                        </InputGroup.Prepend>
                            <Form.Control as="select"
                                name="jumpType"
                                type="string"
                                placeholder="Choose Jump Type"
                                onChange={this.handleJumpType}
                                value={this.state.jumpType}
                                required
                            >
                            <option>Static Line</option>
                            <option>Freefall</option>
                            </Form.Control>
                    </InputGroup>
                    </Form.Row>
                    <Form.Row>
                    <InputGroup className="spacing">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend"> <BsFillClockFill /></InputGroup.Text>
                        </InputGroup.Prepend>
                            <Form.Control as="select"
                                name="milExitType"
                                type="string"
                                placeholder="Choose Exit Type"
                                onChange={this.handleMilExitType}
                                value={this.state.milExitType}
                                required
                            >
                            <option>Double Door</option>
                            <option>Ramp</option>
                            <option>Helo</option>
                            </Form.Control>
                    </InputGroup>
                    </Form.Row>
                    <Form.Row>
                    <InputGroup className="spacing">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend"> <BsFillClockFill /></InputGroup.Text>
                        </InputGroup.Prepend>
                            <Form.Control as="select"
                                name="milMainCanopyType"
                                type="string"
                                placeholder="Choose Main Canopy"
                                onChange={this.handleMilMainCanopyType}
                                value={this.state.milMainCanopyType}
                                required
                            >
                            <option>CT-1</option>
                            <option>CT-6</option>
                            <option>Helo</option>
                            </Form.Control>
                    </InputGroup>
                    </Form.Row>
                    <Form.Row>
                    <InputGroup className="spacing">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend"><BsArrowUp /></InputGroup.Text>
                        </InputGroup.Prepend>
                            <Form.Control
                                name="milMainCanopySN"
                                type="string"
                                placeholder="Main Canopy Serial #"
                                onChange={this.handleMilMainCanopySN}
                                value={this.state.milMainCanopySN}
                                required
                            />
                    </InputGroup>
                    </Form.Row>
                    <Form.Row>
                    <InputGroup className="spacing">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend"> <BsFillClockFill /></InputGroup.Text>
                        </InputGroup.Prepend>
                            <Form.Control as="select"
                                name="milResCanopyType"
                                type="string"
                                placeholder="Choose Reserve Canopy"
                                onChange={this.handleMilResCanopyType}
                                value={this.state.milResCanopyType}
                                required
                            >
                            <option>CR-1</option>
                            </Form.Control>
                    </InputGroup>
                    </Form.Row>
                    <Form.Row>
                    <InputGroup className="spacing">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend"><BsArrowUp /></InputGroup.Text>
                        </InputGroup.Prepend>
                            <Form.Control
                                name="milResCanopySN"
                                type="string"
                                placeholder="Reserve Canopy Serial #"
                                onChange={this.handleMilResCanopySN}
                                value={this.state.milResCanopySN}
                                required
                            />
                    </InputGroup>
                    </Form.Row>
                    <Button description="Log Jump" />
                </Form>
                <p className="quote">This will log your jump in your permanent jump record to share or review as you wish.
                </p>
            </div>
        )
    }
}

export default withRouter(Info)