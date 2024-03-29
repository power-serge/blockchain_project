/* Constants */
/* Returns the hash of the latest block */
const LATEST_HASH = () =>
	fetch(`https://blockchain.info/q/latesthash?cors=true`)
	.then(r => r.text());

/* Returns the root, the array of transaction hashes, the height, and the hash given a block hash */
const BLOCK_INFO = block =>
	fetch(`https://blockchain.info/rawblock/${block}?cors=true`)
	.then(r => r.json())
	.then(d => [d.mrkl_root, d.tx.map(t => t.hash), d.height, d.hash])

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

const hashOne = data => {
	var alertText = "Please enter a value to hash";
	if (data.length == "")
	{
		alert(alertText);
		return alertText;
	}
	else 
	{
		return toHex(sha256.array(data));
	}
}

/* Functions */
/* Displays the hash of the latest added block to the Bitcoin chain in the given element*/
function displayLatestBlock(element) {
	LATEST_HASH().then(hash => element.innerHTML = hash);
}
function fetchBlockByHash(input) {
	if (input.length != 64) {
		alert("Please Enter a Valid Block hash")
	} else {
		parseBlockInfo(input);
	}
}

function fetchBlockByHeight(height) {
	if (height == "" || isNaN(height)) {
		alert("Please Enter a Valid Number");
	} else {
		fetch(`https://blockchain.info/block-height/${height}`)
		.then(blob => blob.json())
		.then(data => data.blocks[0].hash)
		.then(block_hash => {
			parseBlockInfo(block_hash);
		});
	}
}

function parseBlockInfo(block_hash) {
	BLOCK_INFO(block_hash).then(([root, txs, height, block_id]) => {
		if (root == null || txs == null || height == null) {
			alert("An error occurred. \nCould not fetch the data")
		} else {
			displayData(root, txs, height, block_id)
		}
	});
}

function displayData(root, txs, height, block_id) {
	document.getElementById("block_id").innerHTML = block_id;
	document.getElementById("block_num").innerHTML = height;
	document.getElementById("block_mrkl").innerHTML = root;
	document.getElementById("block_size").innerHTML = txs.length;

	var txt = "";
	for (var x of txs) {
		txt += x + "<br>";
	}
	document.getElementById("block_txs").innerHTML = txt;
}

function fetchOnEnter(element) {
	if (event.keyCode === 13) {
		event.preventDefault();

		if (element.id == "block") {
			fetchBlockByHash(element.value);
			return;
		}

		if (element.id == "height") {
			fetchBlockByHeight(element.value);
		}
	}
}
