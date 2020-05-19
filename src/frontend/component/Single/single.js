import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { GrTwitter, GrFacebook } from 'react-icons/gr';

import { CreationSingle } from '../creation/creationSingle/creationSingle';
import SharePage from '../Share/share';
import Spinners from '../common/spinner/spinner';

import "./single.css"
class Single extends Component {
    render() {
        let {
            jumps,
            login,
            load,
            history,
            back,
            backShowHandler,
            backCancelHandler
        } = this.props
        if (!load) { return <Spinners /> }
        if (load && !login) { return <Redirect to="/" /> }
        let jumpIdentifier = history.location.hash.slice(1)
        let jumpName = history.location.pathname.slice(2)
        let jump = jumps.filter((jump) => jump.jumpIdentifier === jumpIdentifier && jump.jumpName === jumpName)[0]
        if (!jump) { return <Redirect to="/account" /> }

        let Jump = <CreationSingle
                jumpDate={jump.jumpDate}
                dropAltitude={jump.dropAltitude}
                freefall={jump.freefall}
                />
        return (
            <div>
                <SharePage
                    jumpName={jump.jumpName}
                    jumpDate={jump.jumpDate}
                    dropAltitude={jump.dropAltitude}
                    freefall={jump.freefall}
                    backCancelHandler={backCancelHandler}
                    back={back}
                    jumpIdentifier={jump.jumpIdentifier}/>
                <div>
                    <h2>Checkout {jump.jumpName}!</h2>
                    <div>
                        {Jump}
                    </div>
                    <div>
                        <SendAndShare backShowHandler={backShowHandler} />
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(Single)



const SendAndShare = ({ backShowHandler }) => {
    let style = { display: "flex", flexDirection: "column", margin: "auto" }
    return (
        <div>
          
            <span style={style}>
                <Share clicked={backShowHandler} />
            </span>
        </div>
    )
}

const Share = ({ clicked }) => {
    let share = (
            <div>
                <p className="text">Nice jump - time to brag a bit:</p>
                <span className="share-icons"><GrTwitter className="flaticon" /><GrFacebook className="flaticon" /></span>
            </div>
       )
    return (
        <button className="sharecard" onClick={clicked}>
            {share}
        </button>
    )
}