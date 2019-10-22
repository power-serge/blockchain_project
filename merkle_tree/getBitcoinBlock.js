/*Plain JS Code */
"use strict";

var fetchMerkleRootAndTransactions = function fetchMerkleRootAndTransactions() {
  return fetch("https://blockchain.info/rawblock/000000000000000000055e8d10bc42534f9db51c1033f9a79dd2465a0ae97416?cors=true").then(function (r) {
    return r.json();
  }).then(function (d) {
    return [d.mrkl_root, d.tx.map(function (t) {
      return t.hash;
    })];
  });
};

fetchMerkleRootAndTransactions().then(console.log);

/*Babel code*/

const fetchMerkleRootAndTransactions = () =>
  fetch(`https://blockchain.info/rawblock/000000000000000000055e8d10bc42534f9db51c1033f9a79dd2465a0ae97416?cors=true`)
    .then(r => r.json())
    .then(d => [d.mrkl_root, d.tx.map(t => t.hash)]);

fetchMerkleRootAndTransactions().then(console.log);
