import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import {
  Button,
  Label,
  Icon,
  Dropdown,
  Image,
  Menu,
  Input
} from 'semantic-ui-react'


class HeaderNav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            balance: '',
            loaded: false
        }
    }

    componentDidMount() {
        this.loadData().then(() => {
            this.setState({loaded:true})
            if(this.props.login) {
            this.getCurrentBalance()
            }
        })
    }

    async loadData() {
        console.log(this.props)
    }

    goToJumps = () => {
        this.props.history.push("/account")
    }

    goToDropZones = () => {
        this.props.history.push("/dropzones")
    }

    async getCurrentBalance() {
        let currentBalance = await this.props.account.getAccountBalance();
        let formattedBalance = (parseFloat(currentBalance.available)/Math.pow(10, 24)).toFixed(2);
        console.log('currentBalance', (parseFloat(currentBalance.available)/Math.pow(10, 24)).toFixed(2))
        this.setState({
            balance: formattedBalance
        })
        console.log('Balance: ', this.state.balance)
    }

   render() {
    let { login, loaded, requestSignOut, requestSignIn, jumpsLength, dropZonesLength } = this.props
    
    let jumpsButton = '';
    jumpsButton = (
        <Button size='mini' as='div' labelPosition='left' onClick={this.goToJumps}>
            <Label size='mini' as='a' basic pointing='right'>
            My Jumps
            </Label>
            <Button size='mini'>
                {jumpsLength}
            </Button>
        </Button>
    )

    let dzButton = '';
    dzButton = (
        <Button size='mini' as='div' labelPosition='left' onClick={this.goToDropZones}>
            <Label as='a' basic pointing='right'>
            Drop Zones
            </Label>
            <Button size='mini'>
                {dropZonesLength}
            </Button>
        </Button>
    )
   
    let loginButton = '';
    if (!login) { loginButton = (
        <Button size='mini' as='div' labelPosition='left' onClick={requestSignIn}>
            <Label size='mini' as='a' basic pointing='right'>
            Sign In
            </Label>
            <Button size='mini' icon>
                <Icon name='lock' />
            </Button>
        </Button>
        )
    } else if (login && loaded) { loginButton = (
        <Button size='mini' as='div' labelPosition='left' onClick={requestSignOut}>
        <Label size='mini' as='a' basic pointing='right'>
            Sign Out
        </Label>
            <Button size='mini' icon>
                <Icon name='unlock' />      
            </Button>
        </Button>
        )
    }

       return(
        
            <Menu stackable borderless>

                
                    <Menu.Item header as={Link} to='/'>
                        <Image size='small' src={require('../../../assets/ParaLog-logo.png')} style={{ marginRight: '1.5em' }} />
                    </Menu.Item>
             

                <Menu.Item>
                    <Input className='icon' icon='search' placeholder='Search the Logs...' />
                </Menu.Item>

                <Menu.Menu position='right'>

                        <Menu.Item>{login ? dzButton : ''}</Menu.Item>

                        <Menu.Item>{login ? jumpsButton : ''}</Menu.Item>

                        {login ?
                        <Dropdown icon='add' floating className='item icon'>
                            <Dropdown.Menu>
                            <Dropdown.Header icon='list ul' content='Log'/>
                                <Dropdown.Divider/>
                                <Dropdown.Item icon='add' text='Log a Jump' as={Link} to='/log'/>
                                <Dropdown.Divider/>
                            <Dropdown.Header icon='settings' content='Admin'/>
                                <Dropdown.Divider/>
                                <Dropdown.Item icon='arrow circle right' text='Admin' as={Link} to='/admin'/>
                                <Dropdown.Divider/>
                            <Dropdown.Header icon='tags' content='Account'/>
                                <Dropdown.Divider/>
                                <Dropdown.Item icon='dollar' href='https://wallet.testnet.near.org' text={`Balance: ${this.state.balance}`} />                         
                                
                            </Dropdown.Menu>
                        </Dropdown>
                        : ''}
                
                    <Menu.Item>
                        {loginButton}
                    </Menu.Item>

                </Menu.Menu>
            </Menu>
          
       )
   }
}

export default withRouter(HeaderNav)