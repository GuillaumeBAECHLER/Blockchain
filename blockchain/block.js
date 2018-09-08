const SHA256 = require('crypto-js/sha256');

const DIFFICULTY = 4;

class Block {
  constructor(timestamp, prevBlockHash, blockHash, data, nonce) {
    this.timestamp = timestamp;
    this.prevBlockHash = prevBlockHash;
    this.blockHash = blockHash;
    this.data = data;
    this.nonce = nonce;
  }
  
  toString() {
    return `
      | Block --------------------------------
      | Timestamp           : ${this.timestamp}
      | Previous block hash : ${this.prevBlockHash.substring(0, 10)}
      | Block hash          : ${this.blockHash.substring(0, 10)}
      | Nonce               : ${this.nonce}
      | Data                : ${this.data}
      ----------------------------------------
    `
  }

  static genesis() {
    return new Block('-', '-', 'Genesis Block', [], 0);
  }

  static mineBlock(lastBlock, data) {
    let hash, timestamp;
    const prevBlockHash = lastBlock.blockHash;
    let nonce = 0;

    do {
      timestamp = Date.now();
      nonce ++;
      hash = this.hash(timestamp, prevBlockHash, data, nonce);
    } while ( hash.startsWith('0'.repeat(DIFFICULTY)) );

    return new Block(timestamp, prevBlockHash, hash, data, nonce);
  }

  static hash(timestamp, prevBlockHash, data, nonce) {
    return SHA256(`${timestamp}${prevBlockHash}${data}${nonce}`).toString();
  }

  static hashOfBlock(block){
    const { timestamp, prevBlockHash, data, nonce } = block;
    return Block.hash(timestamp, prevBlockHash, data, nonce);
  }
}

module.exports = Block;