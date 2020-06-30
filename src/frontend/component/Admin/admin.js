import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Segment, Input } from 'semantic-ui-react';

import './admin.css';

class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            running: true,
            user: '',
            role: '',
            roles: [],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.loadData().then(() => {
            this.setState({loaded:true})
        })
    }

    async loadData() {
        let memberList = await this.props.contract.listMembers();
        console.log('existingAccounts', memberList)
       
    }

    handleUserChange = (event) => {
        let value = event.target.value;
        this.setState({ user: value })
        this.props.handleChange({ name: "user", value })
    }

    handleRoleChange = async (event, {value }) => {
        console.log('value', value)
        this.setState({ role: value })
        await this.props.handleChange({ name: "role", value })
        console.log('admin props :', this.props)
        let {user, role, contract } = this.props
        console.log("**user", user, "**role", role)
        await contract.changeUserRole({
            user: user,
            role: role,
        }, process.env.DEFAULT_GAS_VALUE).then(response => {
            console.log("changing role", response)
            this.setState({running:false})
        }).catch(err => {
            console.log(err);
        })
    }

    async handleSubmit(e) {
        e.preventDefault();
            this.props.handleChange({ name: 'user', value: this.state.user})
            this.props.handleChange({ name: 'role', value: this.state.role})

            console.log('admin props :', this.props)
            let {user, role, handleChange, contract, roles } = this.props
            console.log("**user", user, "**role", role)
            contract.registerUserRole({
                user: user,
                role: role,
            }, process.env.DEFAULT_GAS_VALUE).then(response => {
                console.log("assigning role", response)
                let role = response
                let newRoles = roles.concat(role)
                console.log(newRoles);
                handleChange({ name: "roles", value: newRoles })
                this.setState({running:false})
            }).catch(err => {
                console.log(err);
            })
    }

    render() {
        let { role } = this.state
        if (this.state.loaded === false) {
            return <div>Loading...</div>
        } else {
    
        return (

            <Form onSubmit={this.handleSubmit}>
            <Segment.Group horizontal>
                <Segment>
                    <Form.Field
                        label="User Account"
                        control={Input}
                        name="user"
                        type="text"
                        placeholder="User Account"
                        onChange={this.handleUserChange}
                        value={this.state.user}
                        required
                    />
                </Segment>
                <Segment>
                    <Form.Group inline>
                    <label>Role</label>
                        <Form.Radio
                            label='Coach'
                            value='coach'
                            checked={role === 'coach'}
                            onChange={this.handleRoleChange}
                        />
                        <Form.Radio
                            label='Association'
                            value='association'
                            checked={role === 'association'}
                            onChange={this.handleRoleChange}
                        />
                        <Form.Radio
                            label='Administrator'
                            value='administrator'
                            checked={role === 'administrator'}
                            onChange={this.handleRoleChange}
                        />
                </Form.Group>
                </Segment>
             </Segment.Group>
                   
            <Segment basic>   
                    <Form.Button
                        className="submitButton"
                        content='Submit'
                    />
            </Segment>     
        </Form>

           
        )
    }
    }
}

export default withRouter(Admin)