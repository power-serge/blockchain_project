// noprotect
'use strict';

var _slicedToArray = (function () {
    function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;
        try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);
                if (i && _arr.length === i)
                    break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        }
        finally {
            try {
                if (!_n && _i['return'])
                    _i['return']();
            }
            finally {
                if (_d)
                    throw _e;
            }
        }
        return _arr;
    }
    return function (arr, i) {
        if (Array.isArray(arr)) {
            return arr;
        } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
        } else {
            throw new TypeError('Invalid attempt to destructure non-iterable instance');
        }
    };
})();

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++)
            arr2[i] = arr[i];
        return arr2;
    } else {
        return Array.from(arr);
    }
}

var fetchLatestBlock = function fetchLatestBlock() {
    return fetch('https://blockchain.info/q/latesthash?cors=true').then(function (r) {
        return r.text();
    });
};

var fetchMerkleRootAndTransactions = function fetchMerkleRootAndTransactions(block) {
    return fetch('https://blockchain.info/rawblock/' + block + '?cors=true').then(function (r) {
        return r.json();
    }).then(function (d) {
        return [d.mrkl_root, d.tx.map(function (t) {
                return t.hash;
            })];
    });
};

var random = function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};

var toBytes = function toBytes(hex) {
    return hex.match(/../g).reduce(function (acc, hex) {
        return [].concat(_toConsumableArray(acc), [parseInt(hex, 16)]);
    }, []);
};

var toHex = function toHex(bytes) {
    return bytes.reduce(function (acc, bytes) {
        return acc + bytes.toString(16).padStart(2, '0');
    }, '');
};

var toPairs = function toPairs(arr) {
    return Array.from(Array(Math.ceil(arr.length / 2)), function (_, i) {
        return arr.slice(i * 2, i * 2 + 2);
    });
};

var hashPair = function hashPair(a) {
    var b = arguments.length <= 1 || arguments[1] === undefined ? a : arguments[1];
    return (function () {
        var bytes = toBytes('' + b + a).reverse();
        var hashed = sha256.array(sha256.array(bytes));
        return toHex(hashed.reverse());
    })();
};

var merkleProof = function merkleProof(_x3, _x4) {
    var _arguments = arguments;
    var _again = true;

    _function: while (_again) {
        var txs = _x3,
        tx = _x4;
        proof = tree = undefined;
        _again = false;
        var proof = _arguments.length <= 2 || _arguments[2] === undefined ? [] : _arguments[2];

        if (txs.length === 1) {
            return proof;
        }

        var tree = [];

        toPairs(txs).forEach(function (pair) {
            var hash = hashPair.apply(undefined, _toConsumableArray(pair));

            if (pair.includes(tx)) {
                var idx = pair[0] === tx | 0;
                proof.push([idx, pair[idx]]);
                tx = hash;
            }

            tree.push(hash);
        });

        _arguments = [_x3 = tree, _x4 = tx, proof];
        _again = true;
        continue _function;
    }
};

var merkleProofRoot = function merkleProofRoot(proof, tx) {
    return proof.reduce(function (root, _ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var idx = _ref2[0];
        var tx = _ref2[1];
        return idx ? hashPair(root, tx) : hashPair(tx, root);
    }, tx);
};

fetchLatestBlock().then(fetchMerkleRootAndTransactions).then(function (_ref3) {
    var _ref32 = _slicedToArray(_ref3, 2);

    var root = _ref32[0];
    var txs = _ref32[1];

    var tx = random(txs);
    var proof = merkleProof(txs, tx);
    console.log(proof);
    var isValid = merkleProofRoot(proof, tx) === root;
    console.log(tx, isValid);
});
});
