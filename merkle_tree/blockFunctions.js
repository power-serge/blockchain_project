/* Global Variables */
/* Returns the hash of the latest block */
const LATEST_HASH = () =>
	fetch(`https://blockchain.info/q/latesthash?cors=true`)
		.then(r => r.text());

/* Returns the root, the array of transaction hashes, and the height */
const BLOCK_INFO = block =>
    fetch(`https://blockchain.info/rawblock/${block}?cors=true`)
    .then(r => r.json())
    .then(d => [d.mrkl_root, d.tx.map(t => t.hash), d.height, d.hash])

/* Displays the hash of the lates added block to the Bitcoin chain */
function displayLatestBlock() {
	LATEST_HASH().then(hash => document.getElementById("demo").innerHTML = hash);
}

function fetchBlockByHash() {
	const block_hash = document.getElementById("block").value;
	
	if (block_hash.length != 64)
	{
		alert("Please Enter a Valid Block hash")
	}
	else
	{
		parseBlockInfo(block_hash);
	}
}

function fetchBlockByHeight() 
{
	const height = document.getElementById("height").value;
	if (height == "" || isNaN(height))
	{
		alert("Please Enter a Valid Number");
	}
	else
	{
		var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
		var targetUrl = 'https://blockchain.info/block-height/' + height + '?format=json';
			fetch(proxyUrl + targetUrl)
			.then(blob => blob.json())
			.then(data => data.blocks[0].hash)
			.then(block_hash => {
				parseBlockInfo(block_hash);
			});
	}
}

function parseBlockInfo(block_hash) 
{
	BLOCK_INFO(block_hash).then(([root, txs, height, block_id]) => {

		if (root == null || txs == null || height == null )
		{
			alert("An error occurred. \nCould not fetch the data")
		}
		else
		{
			displayData(root, txs, height, block_id)
		}
	});
}

function displayData(root, txs, height, block_id) 
{
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

function fetchOnEnter(button) {
    console.log(button);
    if (event.keyCode === 13) {
        event.preventDefault();
        fetchBlock();
    }
}