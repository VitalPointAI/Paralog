import {Libp2pCryptoIdentity} from '@textile/threads-core';

import { Context } from '@textile/textile'; 
import { Client } from '@textile/threads-client';
import { ThreadID } from '@textile/threads-id';
import { encryptSecretBox, decryptSecretBox, parseEncryptionKey } from './Encryption'
import { militaryJumpSchema } from '../schemas/MilitaryJump'
import dotenv from 'dotenv';

dotenv.config();

export const DEFAULT_GAS_VALUE = 10000000000000;

async function getIdentity(accountId) {

    /** Restore any cached user identity first */
    const cached = localStorage.getItem("paralog-db-identity")
    
    if (cached !== null) {
    /**Convert the cached identity string to a Libp2pCryptoIdentity and return */
    return Libp2pCryptoIdentity.fromString(cached)
    }

    /** Try and retrieve from contract if it exists */
    if (cached === null) {
            try {
                let retrieveId = await window.contract.getIdentity({threadId: accountId});
                let identity = await decryptSecretBox(retrieveId);
                return Libp2pCryptoIdentity.fromString(identity.identity); 
            } catch (err) {
                parseEncryptionKey(accountId);
                /** No cached identity existed, so create a new one */
                let identity = await Libp2pCryptoIdentity.fromRandom()
                /** Add the string copy to the cache */
                localStorage.setItem("paralog-db-identity", identity.toString())
                /** Return the random identity */
                let encryptedId = await encryptSecretBox(identity.toString());
               
                const threadId = ThreadID.fromRandom();
                let stringThreadId = threadId.toString();
                localStorage.setItem("paralog-threadId", stringThreadId);
             
                await window.contract.setIdentity({threadId: encryptedId, threadIdarray: stringThreadId}, DEFAULT_GAS_VALUE);
                return Libp2pCryptoIdentity.fromString(identity.toString()); 
            }
    }             
}

export async function initiateDB(accountId) {
    const ctx = new Context();
    const identity = await getIdentity(accountId);
    let threadId = localStorage.getItem("paralog-threadId");       
    console.log('current state threadid ', threadId);

    // Update the context WITH the user group key information
    await ctx.withUserKey({
        key: process.env.USER_API_KEY,
        secret: process.env.USER_API_SECRET,
        type: 1, // User group key type
    })

    const db = new Client(ctx)
    await db.getToken(identity)
    console.log(JSON.stringify(db.context.toJSON()))

    if(!ThreadID.fromString(threadId)){
        await db.newDB(ThreadID.fromString(threadId));
        await db.newCollection(ThreadID.fromString(threadId), 'MilitaryJump', militaryJumpSchema);
    }
    return db
}