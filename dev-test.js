// Blockchain test part
/*
const Blockchain = require('./blockchain');

const bc = new Blockchain();
console.time('Building bc');
for(let i = 0; i < 10; i++){
  console.time(`Adding block ${i}`);
  console.log(bc.addBlock(`foo ${i}`).toString());
  console.timeEnd(`Adding block ${i}`);
}
console.timeEnd('Building bc');
*/

const Wallet = require('./wallet');
const wallet = new Wallet();
console.log(wallet.toString());
