const Block = require('./blockchain/block');

const foo = Block.mineBlock(Block.genesis(), 'foo');
console.log(foo.toString());