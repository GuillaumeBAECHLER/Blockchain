const Block = require('./block');

const foo = Block.mineBlock(Block.genesis(), 'foo');
console.log(foo.toString());