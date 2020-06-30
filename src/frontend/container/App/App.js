// import 'babel-polyfill';
import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import HeaderNav from '../../component/Header/Header';
import Footer from '../../component/footer/footer';
import Home from '../../component/home/home';
import Log from '../../component/Log/log';
import Account from '../../component/Account/account';
import Profile from '../../component/Profile/profile';
import Single from '../../component/Single/single';
import Animation from '../../component/Log/animation/animation';
import SocialShare from '../../component/SocialShare/SocialShare';
import ShowPage from '../../component/showpage/showpage';
import DropZoneRegister from '../../component/DropZone/dzRegister';
import DropZoneRegistering from '../../component/DropZone/DropZoneRegistering/registering'
import Admin from '../../component/Admin/admin'

import './App.css';

let generate = require('project-name-generator');

//export const DEFAULT_GAS_VALUE = 100000000000000;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

            //Misc State
            loaded: false,
            loggedIn: false,
            backDrop: false,
            back: false,
            jumps: [],
            dropZones: [],
            roles: [],
            accountId: '',

            //Jump Log State
            jumpName: generate({ words: 2, alliterative: true }).spaced,
            jumpDate: new Date().getTime(),
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
            jumpPhotos: [],
            jumpVideos: '',
            verificationHash: '',
            jumpIdentifier: '',

            //Drop Zone Register State
            dzId: '',
            dropZoneName: '',
            dzVerificationHash: '',
            dzDateRegistered: new Date().getTime(),
            dzLatitude: '44.1182789',
            dzLongitude: '-77.55354170',
            dzRegistrar: this.props.accountId,
            dzPhotos: [],

            // Admin
            user: '',
            role: '',
        }
        this.signedInFlow = this.signedInFlow.bind(this);
        this.requestSignIn = this.requestSignIn.bind(this);
    }

    componentDidMount() {
      
        let loggedIn = window.walletAccount.isSignedIn()

        if (loggedIn) {
            this.setState({
                loggedIn: true
            })
            this.signedInFlow();
        } else {
            this.setState({
                loggedIn: false
            })
            this.signedOutFlow();
        }
    }

    signedOutFlow = () => {
        this.setState({
            loggedIn: false,
            loaded: true,
        });
        return <Redirect to="/" />
    }

    getJumps = (jumper) => {
        return this.props.contract.getJumps({ jumper: jumper });
    }

    getDropZones = (registrar) => {
        return this.props.contract.getDropZones({ registrar: registrar });
    }

    getUserRoles = (user) => {
        return this.props.contract.getUserRoles({ user: user });
    }

    async signedInFlow() {
        const accountId = await this.props.wallet.getAccountId();
            this.setState({
                accountId: accountId
            })
            console.log('signed in accountid ', this.state.accountId)

        // fill User Jumps Array
        this.getJumps(accountId).then(res => {
            console.log(res.len)
            console.log(res)
            this.setState({
                loggedIn: true,
                accountId: accountId
            });
        
            if (res == null || res.jumps == null || res.jumps.length < 1) {
                this.setState({
                    loaded: true
                });
            } else {
                this.setState({
                    jumps: res.jumps,
                    loaded: true
                });
            }
        }).catch(err => {
            console.log(err);
        })

        // fill User Roles array
        this.getUserRoles(accountId).then(res => {
            console.log(res.len)
            console.log(res)
        
            if (res == null || res.role == null || res.role.length < 1) {
                this.setState({
                    loaded: true
                });
            } else {
                this.setState({
                    roles: res.role,
                    loaded: true
                });
            }
        }).catch(err => {
            console.log(err);
        })
    }

    async requestSignIn() {
        const appTitle = 'PARALOG';
        await this.props.wallet.requestSignIn(
            window.nearConfig.contractName,
            appTitle
        )
    }

    requestSignOut = () => {
        this.setState({ loaded: false })
        this.props.wallet.signOut();
        setTimeout(this.signedOutFlow, 2000);
    }

    handleChange = ({ name, value }) => {
        this.setState({
            [name]: value
        })
    }

    handleDateChange = ({ name, value }) => {
        this.setState({
            [name]: value
        })
    }

    backdropCancelHandler = () => {
        this.setState({ backDrop: false })
    }

    backShowHandler = () => {
        this.setState({ back: true })
    }

    backCancelHandler = () => {
        this.setState({ back: false })
    }

    render() {
        let { loggedIn, loaded, backDrop, jumps, dropZones, back, accountId, jumpIdentifier, verificationHash,
            jumper, jumpName, jumpDate, dropAltitude, freefall, pullAltitude,
            dropZone, aircraftType, jumpType, milExitType, milFFCanopySN, milFFCanopyType,
            milResCanopyType, milFFResCanopySN, milMainCanopyType, milMainCanopySN,
            milResCanopySN, milFFResCanopyType, jumpPhotos, jumpVideos, user, role, roles, 
            
            dzId, dropZoneName, dzDateRegistered, dzLatitude, dzLongitude, dzRegistrar, dzVerificationHash, dzPhotos } = this.state

        console.log('before props ', accountId, jumpIdentifier, verificationHash)
        let { contract, account } = this.props
        console.log('account here', account)
        return (

            <div className="App">

                <HeaderNav
                    login={loggedIn}
                    loaded={loaded}
                    requestSignIn={this.requestSignIn}
                    requestSignOut={this.requestSignOut}
                    account={account}
                    accountId={accountId}
                    jumpsLength={jumps.length}
                    dropZonesLength={dropZones.length}
                    handleChange={this.handleChange} 
                />

                <Switch>

                    <Route
                        exact
                        path='/'
                        render={() => 
                            <Home
                                login={loggedIn}
                                load={loaded}
                                requestSignIn={this.requestSignIn}
                                account={account}
                                accountId={accountId}
                                jumpsLength={jumps.length}
                                dropZonesLength={dropZones.length}
                            />
                        }
                    />

                    <Route
                        exact
                        path='/admin'
                        render={() => 
                            <Admin
                                login={loggedIn}
                                loaded={loaded}
                                user={user}
                                role={role}
                                handleChange={this.handleChange}
                                contract={contract}
                                roles={roles}
                            />
                        }
                    />

                    <Route
                        exact
                        path="/log"
                        render={() => 
                            <Log
                                login={loggedIn}
                                load={loaded}
                                handleChange={this.handleChange}
                                handleDateChange={this.handleDateChange}
                                jumpIdentifier={jumpIdentifier}
                                verificationHash={verificationHash}
                                accountId={accountId}
                                jumpName={jumpName}
                                jumpDate={jumpDate}
                                jumper={jumper}
                                freefall={freefall}
                                dropAltitude={dropAltitude}
                                pullAltitude={pullAltitude}
                                dropZone={dropZone}
                                aircraftType={aircraftType}
                                jumpType={jumpType}
                                milExitType={milExitType}
                                milMainCanopyType={milMainCanopyType}
                                milMainCanopySN={milMainCanopySN}
                                milResCanopyType={milResCanopyType}
                                milResCanopySN={milResCanopySN}
                                milFFCanopyType={milFFCanopyType}
                                milFFCanopySN={milFFCanopySN}
                                milFFResCanopyType={milFFResCanopyType}
                                milFFResCanopySN={milFFResCanopySN}
                                jumpPhotos={jumpPhotos}
                                jumpVideos={jumpVideos}
                            />
                        } 
                    />

                    <Route
                        exact
                        path="/account"
                        render={() => 
                            <Account
                                load={loaded}
                                login={loggedIn}
                                jumps={jumps}
                                contract={contract}
                                handleChange={this.handleChange}
                            />
                        }
                    />

                    <Route
                        exact
                        path="/profile"
                        render={() => 
                            <Profile
                                load={loaded}
                                login={loggedIn}
                                jumps={jumps}
                                contract={contract}
                                handleChange={this.handleChange} 
                            />
                        }
                    />

                    <Route
                        exact
                        path="/@:name"
                        render={() => 
                            <Single
                                load={loaded}
                                login={loggedIn}
                                contract={contract}
                                jumps={jumps}
                                backDrop={backDrop}
                                back={back}
                                backdropCancelHandler={this.backdropCancelHandler}
                                backShowHandler={this.backShowHandler}
                                backCancelHandler={this.backCancelHandler}
                                handleChange={this.handleChange}
                                accountId={accountId}
                            />
                        }
                    />

                    <Route
                        exact
                        path="/share"
                        render={() => 
                            <SocialShare
                                load={loaded}
                                login={loggedIn}
                                contract={contract}
                                requestSignIn={this.requestSignIn}
                            />
                        }
                    />

                    <Route
                        exact
                        path="/logging"
                        render={() => 
                            <Animation
                                load={loaded}
                                login={loggedIn}
                                handleChange={this.handleChange}
                                jumpName={jumpName}
                                jumps={jumps}
                                contract={contract}
                                jumpIdentifier={jumpIdentifier}
                                verificationHash={verificationHash}
                                accountId={accountId}
                            />
                        }
                    />

                    <Route
                        exact
                        path="/registering"
                        render={() => 
                            <DropZoneRegistering
                                load={loaded}
                                login={loggedIn}
                                handleChange={this.handleChange}
                                dropZoneName={dropZoneName}
                                dropZones={dropZones}
                                contract={contract}
                                dzId={dzId}
                                dzVerificationHash={dzVerificationHash}
                                dzRegistrar={dzRegistrar}
                            />
                        }
                    />

                    <Route
                        exact
                        path="/dropzone-register"
                        render={() => 
                            <DropZoneRegister
                                load={loaded}
                                login={loggedIn}
                                accountId={accountId}
                                jumps={jumps}
                                contract={contract}
                                handleChange={this.handleChange}
                                dzId={dzId}
                                dzDateRegistered={dzDateRegistered}
                                dzLatitude={dzLatitude}
                                dzLongitude={dzLongitude}
                                dzRegistrar={dzRegistrar}
                                dzVerificationHash={dzVerificationHash}
                                dropZoneName={dropZoneName}
                                dzPhotos={dzPhotos}

                            />
                        }
                    />

                    <Route
                        exact
                        path="/showcase"
                        render={() => 
                            <ShowPage
                                jumps={jumpArray}
                            />
                        }
                    />

                    <Route render={() => <h1>Not found</h1>} />

                </Switch>

                <Footer />
            </div>
        )
    }
}

export default withRouter(App)

//Show Case

const BACKGROUNDCOLOR = {
    green: "rgba(237,241,133,0.50)",
    purple: "rgba(130,117,175,0.50)",
    blue: "rgba(150,228,221,0.50)",
    pink: "#ffb8c6"
}

const COLOR = {
    green: "rgb(90, 179, 121)",
    blue: "rgb(81, 169, 220)",
    orange: "rgb(224, 100, 58)",
    gray: "#004739"
}

const jumpArray = [{
    backgroundColor: BACKGROUNDCOLOR.green,
    color: COLOR.green,
    sausage: "110.5323",
    name: "J.Corg",
    owner: "jstutzman",
    quote: "Does this color make me look fat?",
    rate: "RARE",
    dna: "J9YqhHfklee9FfqxgwzcFQ=="
}, {
    backgroundColor: BACKGROUNDCOLOR.purple,
    color: COLOR.blue,
    sausage: "0.0000",
    name: "Squatty Blu Doggy",
    owner: "icerove",
    quote: "I like a lot of subjects and things about things...",
    rate: "ULTRA RARE",
    dna: "CDbilm1KtiTDj/8uJfsdrw=="
}, {
    backgroundColor: BACKGROUNDCOLOR.blue,
    color: COLOR.orange,
    sausage: "50.5432",
    name: "Squatty Blu Doggy",
    owner: "potato",
    quote: "We know what we are, but know not what we may be",
    rate: "UNCOMMON",
    dna: "Y8deJkWHjAacSgblf0ASWg=="
}, {
    backgroundColor: BACKGROUNDCOLOR.pink,
    color: COLOR.gray,
    sausage: "199.8672",
    name: "Pbellige",
    owner: "icerove",
    quote: "Do you want me? I am rare corgi and have a cool name!",
    rate: "VERY RARE",
    dna: "HjAacSgblm1KtiYqhHfke=="
}]