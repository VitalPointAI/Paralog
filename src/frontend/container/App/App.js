// import 'babel-polyfill';
import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Header from '../../component/Header/Header';
import Footer from '../../component/footer/footer';
import Home from '../../component/home/home';
import Log from '../../component/Log/log';
import Account from '../../component/Account/account';
import Profile from '../../component/Profile/profile';
import Single from '../../component/Single/single';
import Animation from '../../component/Log/animation/animation';
import SocialShare from '../../component/SocialShare/SocialShare';
import ShowPage from '../../component/showpage/showpage';

import './App.css';

let randomColor = require('randomcolor');
let generate = require('project-name-generator');

export const DEFAULT_GAS_VALUE = 10000000000000;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            loggedIn: false,
            backDrop: false,
            back: false,
            jumps: [],
            accountId: '',
            color: randomColor(),
            backgroundColor: randomColor(),
            jumpName: generate({ words: 2, alliterative: true }).spaced,
            jumpDate: new Date().toString().substring(0,16),
            dropAltitude: '',
            freefall: '',
            jumpIdentifier: ''
        }
        this.signedInFlow = this.signedInFlow.bind(this);
        this.requestSignIn = this.requestSignIn.bind(this);
    }

    componentDidMount() {
        let loggedIn = window.walletAccount.isSignedIn();
        if (loggedIn) {
            this.signedInFlow();
        } else {
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

    async signedInFlow() {
        const accountId = await this.props.wallet.getAccountId();
        this.getJumps(accountId).then(res => {
            console.log(res.len)
            console.log(res)
            this.setState({
                loggedIn: true,
                accountId
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
            [name]: value.toString().substring(0,16)
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
        let { loggedIn, loaded, jumps, accountId, jumpName, jumpDate, dropAltitude, freefall, backDrop, back, jumpIdentifier } = this.state
        let { contract } = this.props
        return (
            <div className="App">
                <Header
                    login={loggedIn}
                    load={loaded}
                    requestSignIn={this.requestSignIn}
                    requestSignOut={this.requestSignOut}
                    accountId={accountId}
                    length={jumps.length}
                    handleChange={this.handleChange} />
                <Switch>
                    <Route
                        exact
                        path='/'
                        render={() => <Home
                            login={loggedIn}
                            load={loaded}
                            requestSignIn={this.requestSignIn}
                            accountId={accountId}
                            length={jumps.length} />}
                    />
                    <Route
                        exact
                        path="/log"
                        render={() => <Log
                            login={loggedIn}
                            load={loaded}
                            handleChange={this.handleChange}
                            handleDateChange={this.handleDateChange}
                            jumpName={jumpName}
                            jumpDate={jumpDate}
                            dropAltitude={dropAltitude}
                            freefall={freefall}
                        />} />
                    <Route
                        exact
                        path="/account"
                        render={() => <Account
                            load={loaded}
                            login={loggedIn}
                            jumps={jumps}
                        />} />
                    <Route
                        exact
                        path="/profile"
                        render={() => <Profile
                            load={loaded}
                            login={loggedIn}
                            jumps={jumps}
                            contract={contract}
                            handleChange={this.handleChange} />} />
                    <Route
                        exact
                        path="/@:name"
                        render={() => <Single
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
                        />} />
                    <Route
                        exact
                        path="/share"
                        render={() => <SocialShare
                            load={loaded}
                            login={loggedIn}
                            contract={contract}
                            requestSignIn={this.requestSignIn}
                        />} />
                    <Route
                        exact
                        path="/logging"
                        render={() => <Animation
                            load={loaded}
                            login={loggedIn}
                            jumpName={jumpName}
                            jumpDate={jumpDate}
                            handleChange={this.handleChange}
                            jumps={jumps}
                            contract={contract}
                            dropAltitude={dropAltitude}
                            freefall={freefall}
                            jumpIdentifier={jumpIdentifier}
                            accountId={accountId}
                        />} />
                    <Route
                        exact
                        path="/showcase"
                        render={() => <ShowPage
                            jumps={jumpArray}
                        />} />
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