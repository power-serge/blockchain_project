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

