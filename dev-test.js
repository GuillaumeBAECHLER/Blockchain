const Block = require('./block');

const block = new Block('foo', 'prevhash', 'hash', 'data');
console.log(block.toString());