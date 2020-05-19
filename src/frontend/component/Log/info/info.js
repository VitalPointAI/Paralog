import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { BsCardHeading, BsFillCalendarFill, BsArrowUp, BsFillClockFill } from "react-icons/bs";
import { Form, InputGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import Button from '../../common/Button/Button';

import './info.css';
import 'react-datepicker/dist/react-datepicker.css';

let generate = require('project-name-generator');

class Info extends Component {

        state = {
            jumpName: `${this.props.jumpName}`,
            jumpDate: new Date(),
            dropAltitude: '',
            freefall: '',
        };

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

    handleSubmit = (e) => {
        let { handleChange, history } = this.props
        e.preventDefault()
        handleChange(
            { name: "jumpName", value: this.state.jumpName })
        history.push("/logging")
    }

    render() {
    
        return (
            <div className="inputboard">
            <p className="quote">All jumps are recorded on a blockchain ensuring they are never lost or destroyed.<br></br>Just fill out the jump data and we’ll do the rest.</p>
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
                    <Button description="Log Jump" />
                </Form>
                <p className="quote">This will log your jump in your permanent jump record to share or review as you wish.
                </p>
            </div>
        )
    }
}

export default withRouter(Info)