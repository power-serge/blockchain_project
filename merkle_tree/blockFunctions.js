function fetchLatestBlock(){
	fetch(`https://blockchain.info/q/latesthash?cors=true`)
		.then(r => r.text())
		.then(txt => document.getElementById("demo").innerHTML = txt);
}

function fetchBlock(){
//const block = '0000000000000a3290f20e75860d505ce0e948a1d1d846bec7e39015d242884b';
var blockNumber = document.getElementById("block");
const block = blockNumber.value;
fetch(`https://blockchain.info/rawblock/${block}?cors=true`)
    .then(r => r.json())
    .then(d => [d.mrkl_root, d.tx.map(t => t.hash), d.height])
	.then( ([root, txs, height]) => {
		document.getElementById("demo1").innerHTML = height;
		document.getElementById("demo2").innerHTML = root;
		var txsHtml = document.getElementById("block_size");
		txsHtml.innerHTML += " " + txs.length;
		//document.getElementById("block_size").innerHTML = txs.length;
		var txt = "";
		for (var x of txs)
		{
			txt += x + "<br>";
		}
		document.getElementById("demo3").innerHTML = txt;
		
	});
}

function myFunction() {
  var x = document.getElementById("blockForm");
  var text = "";
  var i;
  for (i = 0; i < x.length ;i++) {
    text += x.elements[i].value + "<br>";
  }
  document.getElementById("blockNumber").innerHTML = text;
}