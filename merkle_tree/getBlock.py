import hashlib, codecs, requests, json

# Hash pairs of items recursively until a single value is obtained
def merkle(hashList):
    if len(hashList) == 1:
        return hashList[0]
    newHashList = []
    # Process pairs. For odd length, the last is skipped
    for i in range(0, len(hashList)-1, 2):
        newHashList.append(hash2(hashList[i], hashList[i+1]))
    if len(hashList) % 2 == 1: # odd, hash last item twice
        newHashList.append(hash2(hashList[-1], hashList[-1]))
    return merkle(newHashList)

def hash2(a, b):
    # Reverse inputs before and after hashing
    # due to big-endian / little-endian nonsense
    a1 = codecs.decode(a, "hex")[::-1]    
    b1 = codecs.decode(b, "hex")[::-1]    
    h = hashlib.sha256(hashlib.sha256(a1+b1).digest()).digest()
    return codecs.encode(h[::-1], "hex")

url1 = 'https://blockchain.info/rawblock/000000000000000082ccf8f1557c5d40b21edabb18d2d691cfbf87118bac7254'
url  = 'https://blockchain.info/rawblock/0000000000000000000f58006e01fc78f09123e9e3f74449c1cc81d335f41a12'

block_request = requests.get(url)
block_data = json.loads(block_request.text)
size = len(block_data['tx'])
txs = []
for x in range(size):
    txs.append(block_data['tx'][x]['hash'])

root = merkle(txs)
print(root)

with open("block_txs.json", "w") as data_file:
    json.dump(txs, data_file)



    

