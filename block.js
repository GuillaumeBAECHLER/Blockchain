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
}

module.exports = Block;