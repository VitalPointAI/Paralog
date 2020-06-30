import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Icon, Loader, Dimmer } from 'semantic-ui-react'
import { retrieveRecord, deleteRecord, initiateCollection } from '../../../utils/ThreadDB'
import { militaryJumpSchema } from '../../../schemas/MilitaryJump'

import './jumpCard.css'

class JumpCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            id: '',
            jumpName: '',
            jumpDate: 0,
            jumpPhotos: []
        }
    }
   
    componentDidMount() {
        this.loadData()
        .then((result) => {
            console.log('result', result)
            this.setState({loaded:true})
            this.setState({
                id: result._id,
                jumpName: result.jumpName,
                jumpDate: result.jumpDate,
                jumpPhotos: result.jumpPhotos
            })
        })
    }

    async loadData() {
        let { jump } = this.props
        await initiateCollection('MilitaryJump', militaryJumpSchema)
        let record = await retrieveRecord(jump.jumpIdentifier, 'MilitaryJump')
        console.log('recordfinal', record)
        return record
    }

    deleteJump = () => {
        let { contract, jump, handleChange, handleDelete } = this.props
       
        handleDelete()
        deleteRecord(jump.jumpIdentifier, 'MilitaryJump') 
        contract.deleteJumpProfile({
            tokenId: jump.jumpIdentifier
        }, process.env.DEFAULT_GAS_VALUE).then(response => {
            console.log("[profile.js] jumps", response.len)
            let newJumps = response.jumps
            handleChange({ name: "jumps", value: newJumps })
            handleDelete()
        }).catch(err => {
            console.log(err);
        })
    }


    render() {
        
        // Format jump date as string with date and time for display            
        let formatJumpDate = new Date(this.state.jumpDate).toLocaleString()
        let formatSrc = this.state.jumpPhotos[0]
      
        let info = this.state.jumpName
        ? ( <Card  key={this.state.id}>
                <Icon name='delete' className='iconposition' onClick={this.deleteJump}/>
                <Image src={formatSrc} size='small' />
                
           
                    <Card.Content header={this.state.jumpName} as={Link} to={{
                        pathname: "/@" + this.state.id,
                        hash: this.state.id
                    }} />
                    <Card.Content>
                    <Card.Meta>
                        <span className='date'>{formatJumpDate}</span>
                    </Card.Meta>
                    <Card.Description>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                            <Icon name='user' />
                            22 friends
                </Card.Content>
            </Card> 
        )
        : (
            <Card  key={this.state.id}>
            <Card.Content>
            <Card.Header>
            </Card.Header>
            <Dimmer active>
                <Loader>Loading</Loader>
            </Dimmer>
            </Card.Content>
            <Card.Content extra>
                <Icon name='user' />
                22 friends
            </Card.Content>
            </Card>
        )
      
       
        return (
            <Card.Group>
                {info}
            </Card.Group>
         
        )
    }
}

export default JumpCard