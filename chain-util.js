const EC = require('elliptic').ec;
const SHA256 = require('crypto-js/sha256');
const uuid = require('uuid/v1');
const ec = new EC('secp256k1');

class ChainUtil {
  static genKeyPair() {
    return ec.genKeyPair();
  }

  static id() {
    return uuid();
  }

  static hash(data) {
    return SHA256(JSON.stringify(data)).toString();
  }

  static verifySignature(publicKey, signature, dataHash) {
    try {
      return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature);
    }
    catch(Error) {
        console.log("signature verification error for public key: " + publicKey + "; error message: " + Error.message);
        return false;
    }
  }
}

module.exports = ChainUtil;