/* The code below uses the Babel Framework */
// below is needed otherwise recursion would end before parsing all values
// noprotect
const fetchMerkleRootAndTransactions = () =>
  fetch(`https://blockchain.info/rawblock/000000000000000082ccf8f1557c5d40b21edabb18d2d691cfbf87118bac7254?cors=true`)
    .then(r => r.json())
    .then(d => [d.mrkl_root, d.tx.map(t => t.hash)]);

const toBytes = hex =>
  hex.match(/../g).reduce((acc, hex) => [...acc, parseInt(hex, 16)], []);

const toHex = bytes =>
  bytes.reduce((acc, bytes) => acc + bytes.toString(16).padStart(2, '0'), '');

const toPairs = arr =>
  Array.from(Array(Math.ceil(arr.length / 2)), (_, i) => arr.slice(i * 2, i * 2 + 2));

const hashPair = (a, b = a) => {
  const bytes = toBytes(`${b}${a}`).reverse();
  const hashed = sha256.array(sha256.array(bytes));
  return toHex(hashed.reverse());
};

const merkleRoot = txs =>
  txs.length === 1 ? txs[0] : merkleRoot(toPairs(txs).reduce((tree, pair) => [...tree, hashPair(...pair)], []));

fetchLatestBlock()
  .then(fetchMerkleRootAndTransactions)
  .then(([root, txs]) => {
    const isValid = merkleRoot(txs) === root;
    console.log(isValid);
  });
