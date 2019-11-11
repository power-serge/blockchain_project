function fetchLatestBlock() {
    fetch(`https://blockchain.info/q/latesthash?cors=true`)
    .then(r => r.text())
    .then(txt => document.getElementById("demo").innerHTML = txt);
}

function fetchBlock() {
    //const block = '0000000000000a3290f20e75860d505ce0e948a1d1d846bec7e39015d242884b';
    var blockNumber = document.getElementById("block");
    const block = blockNumber.value;
    fetch(`https://blockchain.info/rawblock/${block}?cors=true`)
    .then(r => r.json())
    .then(d => [d.mrkl_root, d.tx.map(t => t.hash), d.height])
    .then(([root, txs, height]) => {

        document.getElementById("demo1").innerHTML = height;
        document.getElementById("demo2").innerHTML = root;

        var txsText = document.getElementById("block_size");
        var text = txsText.innerHTML;

        txsText.innerHTML = text.substring(0, text.indexOf(":") + 1);
        txsText.innerHTML += " " + txs.length;

        var txt = "";
        for (var x of txs) {
            txt += x + "<br>";
        }
        document.getElementById("demo3").innerHTML = txt;

    });
}

function fetchBlockByHeight() {
    
	const height = document.getElementById("height").value;

    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'https://blockchain.info/block-height/' + height + '?format=json'
        fetch(proxyUrl + targetUrl)
        .then(blob => blob.json())
        .then(data => data.blocks[0].hash)
        .then(block => {
            fetch(`https://blockchain.info/rawblock/${block}?cors=true`)
            .then(r => r.json())
            .then(d => [d.mrkl_root, d.tx.map(t => t.hash), d.height])
            .then(([root, txs, height]) => {

                document.getElementById("demo1").innerHTML = height;
                document.getElementById("demo2").innerHTML = root;

                var txsText = document.getElementById("block_size");
                var text = txsText.innerHTML;

                txsText.innerHTML = text.substring(0, text.indexOf(":") + 1);
                txsText.innerHTML += " " + txs.length;

                var txt = "";
                for (var x of txs) {
                    txt += x + "<br>";
                }
                document.getElementById("demo3").innerHTML = txt;

			})
		});
}
            
        

function fetchOnEnter(button) {
    console.log(button);
    if (event.keyCode === 13) {
        event.preventDefault();
        fetchBlock();
    }
}

function myFunction() {
    var x = document.getElementById("blockForm");
    var text = "";
    var i;
    for (i = 0; i < x.length; i++) {
        text += x.elements[i].value + "<br>";
    }
    document.getElementById("blockNumber").innerHTML = text;
}
