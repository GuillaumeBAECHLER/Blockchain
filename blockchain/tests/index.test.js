const Blockchain = require('..');
const Block = require('../block');

describe('Blockchain', () => {
  let bc, bc2;

  beforeEach(() => {
      bc = new Blockchain();
  });

  it('should start with genesis block', () => {
    expect(bc.chain[0]).toEqual(Block.genesis());
  });

  it('adds a new block', () => {
    const data = 'foo';
    bc.addBlock(data);
    
    expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
  });

  it('validates a valid chain', () => {
    bc.addBlock('foo');

    expect(Blockchain.isValidChain(bc.chain)).toBeTruthy();
  });

  it('invalidates a chain with a corrupt genesis block', () => {
    bc.chain[0].data = 'corrupt data';

    expect(Blockchain.isValidChain(bc.chain)).toBeFalsy();
  });

  it('invalidates a corrupt chain', () => {
    bc.addBlock('foo');
    bc.chain[1].data = 'corrupt data';

    expect(Blockchain.isValidChain(bc.chain)).toBeFalsy();
  });

  it('replaces the chain with a valid chain', () => {
    bc2 = new Blockchain();
    bc2.addBlock('foo');
    bc.replaceChain(bc2.chain);

    expect(bc.chain).toEqual(bc2.chain);
  });

  it('does not replace the chain with one of less than or equal to length', () => {
    bc2 = new Blockchain();
    bc.addBlock('foo');
    bc.replaceChain(bc2.chain);

    expect(bc.chain).not.toEqual(bc2.chain);
  });

  it('does not replace the chain with an invalid chain', () => {
    bc2 = new Blockchain();
    bc.addBlock('foo');
    bc.chain[1].data = 'corrupt data';
    bc2.replaceChain(bc.chain);

    expect(bc.chain).not.toEqual(bc2.chain);
  });
});