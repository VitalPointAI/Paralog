import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { BsCardHeading, BsFillCalendarFill, BsArrowUp, BsFillClockFill } from "react-icons/bs";
import { Form, InputGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import ImageUploader from 'react-images-upload';

import Button from '../../common/Button/Button';

import './info.css';
import 'react-datepicker/dist/react-datepicker.css';
import { ThreadID } from '@textile/threads';
import { generateHash } from '../../../utils/Encryption';
import { initiateDB, initiateCollection, retrieveRecord } from '../../../utils/ThreadDB';
import { militaryJumpSchema } from '../../../schemas/MilitaryJump';

let generate = require('project-name-generator');

class Info extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jumpIdentifier: this.props.jumpIdentifier,
            jumpName: `${this.props.jumpName}`,
            jumpDate: new Date().getTime(),
            jumper: this.props.accountId,
            freefall: '',
            dropAltitude: '',
            pullAltitude: '',
            dropZone: '',
            aircraftType: '',
            jumpType: '',
            milExitType: '',
            milMainCanopyType: 'nil',
            milMainCanopySN: 'nil',
            milResCanopyType: 'nil',
            milResCanopySN: 'nil',
            milFFCanopyType: 'nil',
            milFFCanopySN: 'nil',
            milFFResCanopyType: 'nil',
            milFFResCanopySN: 'nil',
            jumpPhotos: [],
            jumpVideos: 'nil',
            verificationHash: this.props.verificationHash,
            threadId: this.props.threadId,
            db: this.props.db,
            loaded: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    componentDidMount() {
        this.loadData().then(() => {
            this.setState({loaded:true})
        })
    }


    async loadData() {
        this.setState({jumper: this.props.accountId})
    }


   async onDrop(pictureFiles, pictureDataURLs) {
        this.setState({
               jumpPhotos: (this.state.jumpPhotos).concat(pictureDataURLs)
           })
        console.log('photos array', this.state.jumpPhotos)
    }


    handleRandomName = () => {
        let name = generate({ words: 2, alliterative: true }).spaced
        this.setState({ jumpName: name })
        this.props.handleChange({ name: "jumpName", value: name })
    }


    handleDateChange = async (event) => {
        console.log('Date ', event)
        this.setState({jumpDate: event})
        await this.props.handleDateChange({ name: "jumpDate", value: event });
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
        this.setState({ 
            dropAltitude: value
        })
        this.props.handleChange({ name: "dropAltitude", value })
    }


    handlePullAltitude = (event) => {
        let value = event.target.value;
        this.setState({ pullAltitude: value })
        this.props.handleChange({ name: "pullAltitude", value })
    }


    handleDropZone = async (event) => {
        let value = event.target.value;
        try {
        let record = await retrieveRecord(id, this.state.db, this.state.threadId, 'DropZone')
        console.log('drop zone record', record)
        } catch (err) {
            console.log(err)
            console.log("not a registered drop zone")
        }
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

    async generateId() {
        let buf = Math.random([0, 999999999]);
        let b64 = btoa(buf);
        await this.setState({
            jumpIdentifier: b64.toString()
        })
        console.log('jumpidentifier :', this.state.jumpIdentifier)
    }

    async generateVerificationHash() {
        let data = (this.state.jumpIdentifier).concat(
            ',',this.state.jumper,
            ',',this.state.jumpDate,
            ',',this.state.dropAltitude,
            ',',this.state.dropZone,
            ',',this.state.freefall,
            ',',this.state.pullAltitude,
            ',',this.state.milMainCanopyType,
            ',',this.state.milMainCanopySN,
            ',',this.state.milResCanopyType,
            ',',this.state.milResCanopySN,
            ',',this.state.milFFCanopyType,
            ',',this.state.milFFCanopySN,
            ',',this.state.milFFResCanopyType,
            ',',this.state.milFFResCanopySN,
            ',',this.state.jumpPhotos,
            ',',this.state.jumpVideos
        )
        console.log(data)
        let verificationHash = await generateHash(data);
        await this.setState({
            verificationHash: verificationHash.toString()
        })
        console.log('verification hash ', this.state.verificationHash)
    }

    async handleSubmit(e) {
        e.preventDefault();
       await this.generateId();
       await this.generateVerificationHash();
       await initiateDB();
       await initiateCollection(this.state.db, this.state.threadId, 'MilitaryJump', militaryJumpSchema)
       await (this.state.db).create(ThreadID.fromString(this.state.threadId), 'MilitaryJump', [
                  {
                    _id: (this.state.jumpIdentifier).toString(),
                    jumper: (this.state.jumper).toString(),
                    jumpName: (this.state.jumpName).toString(),
                    jumpDate: this.state.jumpDate,
                    dropZone: (this.state.dropZone).toString(),
                    dropAltitude: parseInt(this.state.dropAltitude, 10),
                    aircraftType: (this.state.aircraftType).toString(),
                    jumpType: (this.state.jumpType).toString(),
                    milExitType: (this.state.milExitType).toString(),
                    milMainCanopyType: (this.state.milMainCanopyType).toString(),
                    milMainCanopySN: (this.state.milMainCanopySN).toString(),
                    milResCanopyType: (this.state.milResCanopyType).toString(),
                    milResCanopySN: (this.state.milResCanopySN).toString(),
                    pullAltitude: parseInt(this.state.pullAltitude, 10),
                    freefall: parseInt(this.state.freefall, 10),
                    milFFCanopyType: (this.state.milFFCanopyType).toString(),
                    milFFCanopySN: (this.state.milFFCanopySN).toString(),
                    milFFResCanopyType: (this.state.milFFResCanopyType).toString(),
                    milFFResCanopySN: (this.state.milFFResCanopySN).toString(),
                    jumpPhotos: this.state.jumpPhotos,
                    jumpVideos: this.state.jumpVideos,
                    verificationHash: (this.state.verificationHash).toString(),
                  }
            ]);
            this.props.handleChange({ name: 'jumpIdentifier', value: this.state.jumpIdentifier})
            this.props.handleChange({ name: 'verificationHash', value: this.state.verificationHash})
            this.props.history.push("/logging")
        
    }

    render() {
        if (this.state.loaded === false) {
            return <div>Loading...</div>
        } else {
    
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
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="time"
                                dateFormat="MM/dd/yyyy h:mm aa"
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
                                selected={this.state.dropZone}
                                onChange={this.handleDropZone}
                                required
                            >
                            <option value="">Choose Drop Zone</option>
                            <option value="Perris Valley">Perris Valley</option>
                            <option value="Mountain View">Mountain View</option>
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
                                selected={this.state.aircraftType}
                                onChange={this.handleAirCraftType}
                                required
                            >
                            <option value="">Choose Aircraft Type</option>
                            <option value="CC-130J">CC-130J</option>
                            <option value="Twin Otter">Twin Otter</option>
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
                                selected={this.state.jumpType}
                                required
                            >
                            <option value="">Choose Jump Type</option>
                            <option value="Static Line">Static Line</option>
                            <option value="Freefall">Freefall</option>
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
                                selected={this.state.milExitType}
                                required
                            >
                            <option value="">Choose Exit Type</option>
                            <option value="Double Door">Double Door</option>
                            <option value="Ramp">Ramp</option>
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
                            <option value="">Select Main Canopy</option>
                            <option value="CT-1">CT-1</option>
                            <option value="CT-6">CT-6</option>
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
                            <option value="">Select Reserve Canopy</option>
                            <option value="CR-1">CR-1</option>
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
                    <Form.Row>
                        <ImageUploader
                        withIcon={true}
                        buttonText="Choose images"
                        onChange={this.onDrop}
                        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                        maxFileSize={5242880}
                        withPreview={true}
                        />
                    </Form.Row>
                    <Button description="Log Jump" />
                </Form>
           
                <p className="quote">This will log your jump in your permanent jump record to share or review as you wish.
                </p>
            </div>
        )
    }
    }
}

export default withRouter(Info)