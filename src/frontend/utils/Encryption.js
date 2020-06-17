import * as nacl from 'tweetnacl';

const keccak256 = require('keccak256');

    /**
    read private key from local storage
    - if found, recreate the related key pair
    - if not found, create a new key pair and save it to local storage
    */
export function parseEncryptionKey(accountId) {
    const keyKey = "enc_key:" + accountId + ":" + process.env.APPID + ":";
    let key = localStorage.getItem(keyKey);
    if (key) {
    const buf = Buffer.from(key, 'base64');
    if (buf.length !== nacl.box.secretKeyLength) {
        throw new Error("Given secret key has wrong length");
    }
    key = nacl.box.keyPair.fromSecretKey(buf);
    } else {
    key = new nacl.box.keyPair();
    localStorage.setItem(keyKey, Buffer.from(key.secretKey).toString('base64'));
    }
    this._key = key;
}


 /**
unbox encrypted messages with our secret key
@param {string} msg64 encrypted message encoded as Base64
@return {string} decoded contents of the box
*/
export function decryptSecretBox(msg64) {
    const buf = Buffer.from(msg64, 'base64');
    const nonce = new Uint8Array(nacl.secretbox.nonceLength);
    buf.copy(nonce, 0, 0, nonce.length);
    const box = new Uint8Array(buf.length - nacl.secretbox.nonceLength);
    buf.copy(box, 0, nonce.length);
    const decodedBuf = nacl.secretbox.open(box, nonce, this._key.secretKey);
    return Buffer.from(decodedBuf).toString()
}


/**
box an unencrypted message with our secret key
@param {string} str the message to wrap in a box
@return {string} base64 encoded box of incoming message
*/
export function encryptSecretBox(str) {
    const buf = Buffer.from(str);
    const nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
    const box = nacl.secretbox(buf, nonce, this._key.secretKey);
    const fullBuf = new Uint8Array(box.length + nacl.secretbox.nonceLength);
    fullBuf.set(nonce);
    fullBuf.set(box, nacl.secretbox.nonceLength);
    return Buffer.from(fullBuf).toString('base64')
}

export function generateHash(data) {
    return keccak256(data).toString('hex');
}