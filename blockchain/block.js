const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(timestamp, prevBlockHash, blockHash, data) {
    this.timestamp = timestamp;
    this.prevBlockHash = prevBlockHash;
    this.blockHash = blockHash;
    this.data = data;
  }
  
  toString() {
    return `
      | Block --------------------------------
      | Timestamp           : ${this.timestamp}
      | Previous block hash : ${this.prevBlockHash.substring(0, 10)}
      | Block hash          : ${this.blockHash.substring(0, 10)}
      | Data                : ${this.data}
      ----------------------------------------
    `
  }

  static genesis() {
    return new Block('Genesis Block', 'Genesis Block', 'Genesis Block', []);
  }

  static mineBlock(lastBlock, data) {
    const timestamp = Date.now();
    const prevBlockHash = lastBlock.blockHash;
    const hash = this.hash(timestamp, prevBlockHash, data);

    return new Block(timestamp, prevBlockHash, hash, data);
  }

  static hash(timestamp, prevBlockHash, data) {
    return SHA256(`${timestamp}${prevBlockHash}${data}`).toString();
  }

  static hashOfBlock(block){
    const { timestamp, prevBlockHash, data } = block;
    return Block.hash(timestamp, prevBlockHash, data);
  }
}

module.exports = Block;