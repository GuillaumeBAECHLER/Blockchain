const ChainUtil = require('../chain-util');
const { DIFFICULTY, MINE_RATE, TOLERANCE } = require('../config');

class Block {
  constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty || DIFFICULTY;
  }
  
  toString() {
    return `
      | Block --------------------------------
      | Timestamp           : ${this.timestamp}
      | Previous block hash : ${this.lastHash.substring(0, 10)}
      | Block hash          : ${this.hash.substring(0, 10)}
      | Nonce               : ${this.nonce}
      | Difficulty          : ${this.difficulty}
      | Data                : ${this.data}
      ----------------------------------------
    `
  }
  
  static genesis() {
    return new Block('-', '-', 'Genesis Block', [], 0, DIFFICULTY);
  }

  static mineBlock(lastBlock, data) {
    let hash, timestamp;
    const lastHash = lastBlock.hash;
    let { difficulty } = lastBlock;
    let nonce = 0;

    do {
      nonce ++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty(lastBlock, timestamp);
      hash = this.hash(timestamp, lastHash, data, nonce, difficulty);
    } while ( !hash.startsWith('0'.repeat(difficulty)) );

    return new Block(timestamp, lastHash, hash, data, nonce, difficulty);
  }

  static hash(timestamp, lastHash, data, nonce, difficulty) {
    return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
  }

  static hashOfBlock(block){
    const { timestamp, lastHash, data, nonce, difficulty } = block;
    return Block.hash(timestamp, lastHash, data, nonce, difficulty);
  }

  static adjustDifficulty(lastBlock, currentTime) {
    let { difficulty } = lastBlock;
    if(
      currentTime < lastBlock.timestamp + MINE_RATE - TOLERANCE ||
      currentTime > lastBlock.timestamp + MINE_RATE + TOLERANCE
    ){
      difficulty = (lastBlock.timestamp + MINE_RATE > currentTime) ?
      difficulty + 1 : difficulty - 1;
    }
    return difficulty;
  }
}

module.exports = Block;