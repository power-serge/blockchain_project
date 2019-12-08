/* Functions specific to merkle page */
function hashIt (valueToHash) {
	const HASH_TEXT = 
		"<br><br>The value that was just produced is the hash value or simply <i>The Hash</i>."
	let hash_one = document.getElementById('hash_one');
	
	hash_one.innerHTML = hashOne(valueToHash);
	
	if (!hash_one.innerHTML.includes("Please"))
	{
		hash_one.innerHTML += HASH_TEXT;
	}
}

function hashIt2 (valueToHash) {
	const HASH_TEXT = 
		"<br><br>You just performed a SHA-256 double hash!."
	let hash_p = document.getElementById('hash2');
	
	hash_p.innerHTML = hashOne(valueToHash);
	text_p = document.getElementById('hide_it');
	
	if (!hash_one.innerHTML.includes("Please") && valueToHash.length == 64)
	{
		hash_p.innerHTML += HASH_TEXT;
		text_p.style.display = "none";
	}	
}

