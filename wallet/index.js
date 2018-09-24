const ChainUtil = require('../chain-util');
const { INITIAL_BALANCE } = require('../config');
const Transaction = require('./transaction');

class Wallet {

  constructor() {
      this.balance = INITIAL_BALANCE;
      this.keyPair = ChainUtil.genKeyPair();
      this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  toString() {
    return `Wallet -
      publicKey : ${this.publickKey.toString()}
      balance   : ${this.balance}
    `;
  }

  sign(dataHash) {
    return this.keyPair.sign(dataHash);
  }

  createTransaction(recipient, amount, blockchain, transactionPool) {
    this.balance = this.calculateBalance(blockchain);

    if (amount > this.balance) {
      console.log(`Amount: ${amount} exceeds current balance ${this.balance}.`);
      return;
    }

    let transaction = transactionPool.existingTransaction(this.publicKey);

    if (transaction) {
      transaction.update(this,recipient, amount);
    } else {
      transaction = Transaction.newTransaction(this, recipient, amount);
      transactionPool.updateOrAddTransaction(transaction);
    }

    return transaction;
  }

  calculateBalance(blockchain) {
    
    //TODO : add a number to block and check transactions in a relative way

    let balance = this.balance;
    let transactions = [];
    blockchain.chain.forEach(block => {
      block.data.forEach( transaction => {
        transactions.push(transaction);
      });
    });

    const walletInputTs = transactions.
      filter(transaction => transaction.input.address === this.publicKey);
    
    let startTime = 0;

    if (walletInputTs.length > 0) {
      const recentInputT = walletInputTs.reduce(
        (prev, current) => prev.input.timestamp > current.input.timestamp ? prev : current
      );

      balance = recentInputT.outputs.find( output => output.address === this.publicKey).amount;
      startTime = recentInputT.input.timestamp;
    }

    transactions.forEach(transaction => {
      if (transaction.input.timestamp > startTime) {
        transaction.outputs.find(output => {
          if (output.address === this.publicKey) {
            balance += output.amount;
          }
        });
      }
    });

    return balance;
  }

  static blockchainWallet() {
    if(!Wallet.bcWallet) {
      Wallet.bcWallet = new this();
      Wallet.bcWallet.address = 'blockchain-wallet';
    }
    return Wallet.bcWallet;
  }
}

module.exports = Wallet;