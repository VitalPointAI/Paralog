import React from "react";
import ReactDom from "react-dom";
import getConfig from "./config.js";
import * as nearlib from "near-api-js";
import AppBuilder from "./frontend/container/index";

//initializing contract
async function InitContract() {
    window.nearConfig = getConfig("development");

    // initializing connected to NEAR TestNet
    window.near = await nearlib.connect(
        Object.assign(
            {
                deps: { keyStore: new nearlib.keyStores.BrowserLocalStorageKeyStore() },
            },
            window.nearConfig
        )
    );

    console.log(window.near);

    // needed to access wallet login
    window.walletAccount = new nearlib.WalletAccount(window.near);

    // getting the account ID.  If unauthorized yet, it's just an empty string.
    window.accountId = window.walletAccount.getAccountId();

   
   
    // initializing contract APIs by contract name and configuration
    let acct = await new nearlib.Account(
        window.near.connection,
        window.accountId
    );
    console.log("acct", acct);
    window.contract = await new nearlib.Contract(
        acct,
        window.nearConfig.contractName,
        {
            // view methods are read only.  They don't modify state but usually return a value
            viewMethods: [
                "ownerOfJump",
                "getJumpsByJumper",
                "getJump",
                "getSender",
                "getJumps",
                "getIdentity",
            ],
            // change methods can modify the state, but you don't get the returned value when called
            changeMethods: [
                "logJump",
                "setJump",
                "setJumpsByJumper",
                "setIdentity",
                "deleteJumpProfile",
            ],
            // sender is the account ID to initialize transactions
            sender: window.accountId,
        }
    );

}


window.nearInitPromise = InitContract()
    .then(() => {
        ReactDom.render(
            <AppBuilder contract={window.contract} wallet={window.walletAccount} />,
            document.getElementById("root")
        );
    })
    .catch(console.error);