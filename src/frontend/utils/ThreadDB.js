import {Libp2pCryptoIdentity} from '@textile/threads-core';
import { Client, ThreadID } from '@textile/threads';
import { encryptSecretBox, decryptSecretBox, parseEncryptionKey } from './Encryption'

export const DEFAULT_GAS_VALUE = 10000000000000;

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
                let identity = await decryptSecretBox(retrieveId);
                return Libp2pCryptoIdentity.fromString(identity.identity); 
            } catch (err) {
                parseEncryptionKey(accountId);
                /** No cached identity existed, so create a new one */
                let identity = await Libp2pCryptoIdentity.fromRandom()
                /** Add the string copy to the cache */
                localStorage.setItem(process.env.THREADDB_IDENTITY_STRING, identity.toString())
                /** Return the random identity */
                let encryptedId = await encryptSecretBox(identity.toString());
               
                const threadId = ThreadID.fromRandom();
                let stringThreadId = threadId.toString();
                localStorage.setItem(process.env.THREADDB_USER_THREADID, stringThreadId);
             
                await window.contract.setIdentity({threadId: encryptedId, threadIdarray: stringThreadId}, DEFAULT_GAS_VALUE);
                return Libp2pCryptoIdentity.fromString(identity.toString()); 
            }
    }             
}

async function getThreadId(accountId) {

    /** Restore any cached user identity first */
    const cached = localStorage.getItem(process.env.THREADDB_USER_THREADID)
    
    if (cached !== null) {
    /**Convert the cached identity string to a Libp2pCryptoIdentity and return */
    return cached
    }

    /** Try and retrieve from contract if it exists */
    if (cached === null) {
            try {
                let retrieveId = await window.contract.getIdentity({threadId: accountId});
                let identity = await decryptSecretBox(retrieveId);
                return identity.threadId; 
            } catch (err) {
               console.log(err);
            }
    }             
}

export async function initiateDB() {
    const keyInfo = {
        key: process.env.USER_API_KEY,
        secret: process.env.USER_API_SECRET,
        type: 1, // User group key type
    }
    
    const identity = await getIdentity(window.accountId);
    const threadId = await getThreadId(window.accountId);
    
    const db = await Client.withKeyInfo(keyInfo)
    await db.getToken(identity)
    console.log(JSON.stringify(db.context.toJSON()))
    if(!db.getDBInfo(ThreadID.fromString(threadId))) {
        await db.newDB(ThreadID.fromString(threadId));
        console.log('DB created');
    }
    const dbObj = {
        db: db,
        threadId: threadId
    }
    return dbObj
}


export async function initiateCollection(db, threadId, collection, schema) {
    try {
        const r = await db.find(ThreadID.fromString(threadId), collection, {})
        console.log('r :', r)
        console.log('found :', r.instancesList.length)    
        return r
    } catch (err) {
        console.log(err);
        await db.newCollection(ThreadID.fromString(threadId), collection, schema);
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

export async function retrieveRecord(id, db, threadId, collection) {
    let obj
    let initiated = await initiateDB()
    console.log('initiated', initiated)
    try {
      
      //  initiated.then((instanced) => {
            let r = await db.findByID(ThreadID.fromString(threadId), collection, id)
          //  r.then((result) => {
                console.log('r', r)
                var imageBlob = await dataURItoBlob(r.instance.jumpPhotos.toString())
                console.log('imageBlob', imageBlob)
                var imageObjectURL = URL.createObjectURL(imageBlob)
                console.log('imageobjecturl', imageObjectURL)
                let instanceObj = {
                    jumpName: r.instance.jumpName,
                    jumpDate: r.instance.jumpDate,
                    jumpPhotos: r.instance.jumpPhotos,
                }
            console.log('jumpname obj', instanceObj.jumpName)
            console.log('jumpdate obj', instanceObj.jumpDate)
            console.log('jumpphotos obj', instanceObj.jumpPhotos)
            console.log('instance objinside', instanceObj)
           // return instanceObj
            obj = instanceObj
            console.log('obj inside', obj)
           
        //    })
      //  console.log('instanced', instanced)   
      //  })

        //    var blobObject = await this.blobCreationFromURL(r.instance.jumpPhotos)
    } catch (err) {
        console.log('error', err)
        console.log('id does not exist')
    }
    console.log('object', obj)
    return obj
}

export async function deleteRecord(id, db, threadId, collection) {
    let initiated = await initiateDB()
    console.log('initiated', initiated)
    try {
        await db.delete(ThreadID.fromString(threadId), collection, [id])
        console.log('record deleted')
    } catch (err) {
        console.log('error', err)
        console.log('there was an error deleting the record')
    }
}