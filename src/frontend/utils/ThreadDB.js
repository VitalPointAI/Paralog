import {Libp2pCryptoIdentity} from '@textile/threads-core';
import { ThreadID } from '@textile/threads';
import { Client, createAPISig } from '@textile/hub';
import { encryptSecretBox, decryptSecretBox, parseEncryptionKey } from './Encryption'

//export const DEFAULT_GAS_VALUE = 10000000000000;

async function getIdentity(accountId) {
   
    /** Restore any cached user identity first */
    const cached = localStorage.getItem(process.env.THREADDB_IDENTITY_STRING)
    
    if (cached !== null) {
    /**Convert the cached identity string to a Libp2pCryptoIdentity and return */
    return Libp2pCryptoIdentity.fromString(cached)
    }

    /** Try and retrieve identity from contract if it exists */
    if (cached === null) {
            try {
                let retrieveId = await window.contract.getIdentity({threadId: accountId});
                let identity = decryptSecretBox(retrieveId);
                return Libp2pCryptoIdentity.fromString(identity.identity); 
            } catch (err) {
                parseEncryptionKey(accountId);
                /** No cached identity existed, so create a new one */
                let identity = await Libp2pCryptoIdentity.fromRandom()
                /** Add the string copy to the cache */
                localStorage.setItem(process.env.THREADDB_IDENTITY_STRING, identity.toString())
                /** Return the random identity */
                let encryptedId = encryptSecretBox(identity.toString());
               
                const threadId = ThreadID.fromRandom();
                let stringThreadId = threadId.toString();
                localStorage.setItem(process.env.THREADDB_USER_THREADID, stringThreadId);

                // register user role and add account to member list
                await window.contract.registerUserRole({user: accountId, role: 'jumper'}, process.env.DEFAULT_GAS_VALUE);
                await window.contract.addMember({user: accountId}, process.env.DEFAULT_GAS_VALUE);
             
                await window.contract.setIdentity({threadId: encryptedId, threadIdarray: stringThreadId}, process.env.DEFAULT_GAS_VALUE);
                return Libp2pCryptoIdentity.fromString(identity.toString()); 
            }
    }             
}

async function getThreadId(accountId) {

    /** Restore any cached user identity first */
    const cached = localStorage.getItem(process.env.THREADDB_USER_THREADID)
    console.log('cached threadId', cached)
    
    if (cached !== null) {
        return cached
    }

    /** Try and retrieve from contract if it exists */
    if (cached === null) {
            try {
                let retrieveId = await window.contract.getIdentity({threadId: accountId});
                let identity = decryptSecretBox(retrieveId);
                console.log('retrieved threadId decrypted', identity.threadId)
                return identity.threadId; 
            } catch (err) {
               console.log(err);
            }
    }             
}

export const getAPISig = async (seconds = 300) => {
    const expiration = new Date(Date.now() + 1000 * seconds)
    return await createAPISig(process.env.USER_API_SECRET, expiration)
}

export async function initiateDB() {
    let dbObj;
    const keyInfo = {
        key: process.env.USER_API_KEY,
        secret: process.env.USER_API_SECRET,
        type: 1, // User group key type
    }
    
    const identity = await getIdentity(window.accountId);
    const threadId = await getThreadId(window.accountId);
    
    const db = await Client.withKeyInfo(keyInfo)
    const token = await db.getToken(identity)

    const cachedToken = localStorage.getItem(process.env.THREADDB_TOKEN_STRING)

    if(!cachedToken || cachedToken !== token) {
        localStorage.removeItem(process.env.THREADDB_TOKEN_STRING)
        localStorage.setItem(process.env.THREADDB_TOKEN_STRING, token)
    }
  
    console.log(JSON.stringify(db.context.toJSON()))
    try {
        await db.getDBInfo(ThreadID.fromString(threadId))
        dbObj = {
            db: db,
            threadId: threadId,
            token: token
        }
    } catch (err) {
        await db.newDB(ThreadID.fromString(threadId));
        console.log('DB created');
        dbObj = {
            db: db,
            threadId: threadId,
            token: token
        }
    }
    return dbObj
}


export async function initiateCollection(collection, schema) {
    const auth = await getAPISig()
    const credentials = {
        ...auth,
        key: process.env.USER_API_KEY,
        token: localStorage.getItem(process.env.THREADDB_TOKEN_STRING)
      };
      console.log('credentials', credentials)
    const db = Client.withUserAuth(credentials)

    try {
        const r = await db.find(ThreadID.fromString(localStorage.getItem(process.env.THREADDB_USER_THREADID)), collection, {})
        console.log('r :', r)
        console.log('found :', r.instancesList.length)    
        return r
    } catch (err) {
        console.log(err);
        await db.newCollection(ThreadID.fromString(localStorage.getItem(process.env.THREADDB_USER_THREADID)), collection, schema);
        console.log('New collection created', collection);
    }
}


export async function dataURItoBlob(dataURI)
{
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;

    if(dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for(var i = 0; i < byteString.length; i++)
    {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: mimeString});
}

export async function retrieveRecord(id, collection) {
    const auth = await getAPISig()
    const credentials = {
        ...auth,
        key: process.env.USER_API_KEY,
        token: localStorage.getItem(process.env.THREADDB_TOKEN_STRING)
      };
    const db = Client.withUserAuth(credentials)
    let obj
    try {
        let r = await db.findByID(ThreadID.fromString(localStorage.getItem(process.env.THREADDB_USER_THREADID)), collection, id)        
        obj = r.instance
    } catch (err) {
        console.log('error', err)
        console.log('id does not exist')
    }
    return obj
}

export async function createRecord(collection, record) {
    const auth = await getAPISig()
    const credentials = {
        ...auth,
        key: process.env.USER_API_KEY,
        token: localStorage.getItem(process.env.THREADDB_TOKEN_STRING)
      };
    const db = Client.withUserAuth(credentials)
    try {
       await db.create(ThreadID.fromString(localStorage.getItem(process.env.THREADDB_USER_THREADID)), collection, record)        
       console.log('success record created')
    } catch (err) {
        console.log('error', err)
        console.log('there was a problem, record not created')
    }
}



export async function deleteRecord(id, collection) {
    const auth = await getAPISig()
    const credentials = {
        ...auth,
        key: process.env.USER_API_KEY,
        token: localStorage.getItem(process.env.THREADDB_TOKEN_STRING)
      };
    const db = Client.withUserAuth(credentials)
    try {
        await db.delete(ThreadID.fromString(localStorage.getItem(process.env.THREADDB_USER_THREADID)), collection, [id])
        console.log('record deleted')
    } catch (err) {
        console.log('error', err)
        console.log('there was an error deleting the record')
    }
}