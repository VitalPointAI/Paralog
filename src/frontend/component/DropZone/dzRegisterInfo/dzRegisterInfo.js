import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { BsCardHeading, BsFillCalendarFill, BsArrowUp } from "react-icons/bs";
import { Form, InputGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import ImageUploader from 'react-images-upload';

import Button from '../../common/Button/Button';

import './dzRegisterInfo.css';
import 'react-datepicker/dist/react-datepicker.css';
import { ThreadID } from '@textile/threads';
import { generateHash } from '../../../utils/Encryption';
import { initiateDB, initiateCollection } from '../../../utils/ThreadDB';
import { dropZoneSchema } from '../../../schemas/DropZone';

class DZRegisterInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dzRegistrar: this.props.accountId,
            dropZoneName: '',
            dzId: this.props.dzId,
            dzVerificationHash: this.props.dzVerificationHash,
            dzDateRegistered: new Date().getTime(),
            dzLatitude: '',
            dzLongitude: '',
            dzPhotos: [],
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
        this.setState({dzRegistrar: this.props.accountId})
    }


   async onDrop(pictureFiles, pictureDataURLs) {
        this.setState({
               dzPhotos: (this.state.dzPhotos).concat(pictureDataURLs)
           })
        console.log('dz photos array', this.state.dzPhotos)
    }


    handleDateChange = async (event) => {
        console.log('Date Registered ', event)
        this.setState({dzDateRegistered: event})
        await this.props.handleDateChange({ name: "dzDateRegistered", value: event });
    }


    handleNameChange = (event) => {
        let value = event.target.value;
        this.setState({ dropZoneName: value })
        this.props.handleChange({ name: "dropZoneName", value })
    }

    handleLatitudeChange = (event) => {
        let value = event.target.value;
        this.setState({ dzLatitude: value })
        this.props.handleChange({ name: "dzLatitude", value })
    }

    handleLongitudeChange = (event) => {
        let value = event.target.value;
        this.setState({ dzLongitude: value })
        this.props.handleChange({ name: "dzLongitude", value })
    }


    generateDzId() {
        let buf = Math.random([0, 999999999]);
        let b64 = btoa(buf);
        this.setState({
            dzId: b64.toString()
        })
        console.log('dzId :', this.state.dzId)
    }


    async generateDzVerificationHash() {
        let data = (this.state.dzId).concat(
            ',',this.state.dropZoneName,
            ',',this.state.dzDateRegistered.toString(),
            ',',this.state.dzLatitude,
            ',',this.state.dzLongitude,
            ',',this.state.dzPhotos,
            ',',this.state.dzRegistrar,
        )
        console.log(data)
        let dzVerificationHash = await generateHash(data);
        this.setState({
            dzVerificationHash: dzVerificationHash.toString()
        })
        console.log('dz verification hash ', this.state.dzVerificationHash)
    }


    async handleSubmit(e) {
        e.preventDefault();
       this.generateDzId();
       this.generateDzVerificationHash();
       await initiateDB();
       await initiateCollection(this.state.db, this.state.threadId, 'DropZone', dropZoneSchema)
       await (this.state.db).create(ThreadID.fromString(this.state.threadId), 'DropZone', [
                  {
                    _id: (this.state.dzId).toString(),
                    name: (this.state.dropZoneName).toString(),
                    latitude: parseFloat(this.state.dzLatitude),
                    longitude: parseFloat(this.state.dzLongitude),
                    registrationDate: this.state.dzDateRegistered,
                    registrar: this.state.dzRegistrar.toString(),
                    dropZonePhotos: this.state.dzPhotos,
                    dzVerificationHash: this.state.dzVerificationHash.toString(),
                  }
            ]);
            this.props.handleChange({ name: 'dzId', value: this.state.dzId})
            this.props.handleChange({ name: 'dzVerificationHash', value: this.state.dzVerificationHash})
            this.props.history.push("/registering")
    }

    render() {
        if (this.state.loaded === false) {
            return <div>Loading...</div>
        } else {
    
        return (
            <div className="inputboard">
            <p className="quote">Enter DZ registration data and we’ll do the rest.</p>
                <p className="title">Drop Zone Name</p>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend"><BsCardHeading /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                name="dropZoneName"
                                type="text"
                                placeholder="Drop Zone Name"
                                onChange={this.handleNameChange}
                                value={this.state.dropZoneName}
                                required
                            />
                        </InputGroup>
                    </Form.Row>
                   
                    <Form.Row>
                    <InputGroup className="spacing">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend"><BsFillCalendarFill /></InputGroup.Text>
                        </InputGroup.Prepend>
                            <DatePicker 
                                className="datepicker"
                                selected={this.state.dzDateRegistered}
                                onChange={this.handleDateChange}
                                name="dzRegistrationDate"
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
                                name="dzLatitude"
                                type="number"
                                placeholder="Latitude"
                                onChange={this.handleLatitudeChange}
                                value={this.state.dzLatitude}
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
                                name="dzLongitude"
                                type="number"
                                placeholder="Longitude"
                                onChange={this.handleLongitudeChange}
                                value={this.state.dzLongitude}
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
                    <Button description="Register Drop Zone" />
                </Form>
           
                <p className="quote">This will register the drop zone in the drop zone registry.
                </p>
            </div>
        )
    }
    }
}

export default withRouter(DZRegisterInfo)