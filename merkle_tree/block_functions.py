# Use this file to compute the merkle root by harcoding strings inside the txHashes list

import hashlib, codecs, requests, json

# This function builds the tree and returns the merkle root
def calculate_root(hashList):
    if len(hashList) == 1:
        return hashList[0]
    newHashList = []
    # Process pairs. For odd length, the last is skipped
    for i in range(0, len(hashList)-1, 2):
        newHashList.append(hashPair(hashList[i], hashList[i+1]))
    if len(hashList) % 2 == 1: # odd, hash last item twice
        newHashList.append(hashPair(hashList[-1], hashList[-1]))
    return calculate_root(newHashList)

def hashPair(a, b):
    # Reverse inputs before and after hashing due to big-endian/little-endian processing
    #python 2 code: a1 = a.decode('hex')[::-1] 
    a1 = codecs.decode(a, "hex")[::-1]    
    
    #python 2 code: b1 = b.decode('hex')[::-1]
    b1 = codecs.decode(b, "hex")[::-1]
    
    #double hash the resulting string a + b and digest it 
    h = hashlib.sha256(hashlib.sha256(a1+b1).digest()).digest()    

    #python 2 code: return h[::-1].encode('hex')
    return codecs.encode(h[::-1], "hex")

def getWholeBlock(base, block_hash):
    blob = requests.get(base + block_hash)
    block_data = json.loads(blob.text)
    return block_data

def get_tx_hashes(block_data):
    size = len(block_data['tx'])
    txs = []
    for x in range(size):
        txs.append(block_data['tx'][x]['hash'])
    return txs

def get_mrkl_root(block_data):
    return block_data['mrkl_root']

def get_block_hash(block_data):
    return block_data['hash']

def get_prev_block(block_data):
    return block_data['prev_block']

def print_block_info(block_data):
    print("THE BLOCK HASH IS:")
    print(get_block_hash(block_data))
    print("\nTHE GIVEN MERKLE ROOT IS:")
    print(get_mrkl_root(block_data))
    print("\nTHE PREVIOUS BLOCK IS:")
    print(get_prev_block(block_data))
    print("\nTHE NUMBER OF TRANSACTIONS IS:", len(get_tx_hashes(block_data)))    
    print("\nTHE TRANSACTIONS HASHES ARE:")
    print_txs(get_tx_hashes(block_data))    

def read_json (filename):
    with open(filename) as json_file:
        data = json.load(json_file)
        return data

def write_json(text_data, filename):
    with open(filename, "w") as data_file:
        json.dump(text_data, data_file)

def print_txs(txs):
    for x in txs:
        print(x)

def root_ok(given_root, calc_root):
    return given_root == calc_root

# dividing the hashing function to be able to call it on a single item
def hexDecode(a_decode):    
    return codecs.decode(a_decode, "hex")[::-1]

def hexHash(a_hash):
    return hashlib.sha256(a_hash).digest()

def hexEncode(a):
    return codecs.encode(a[::-1], "hex")

# single hash one item
def hashOne (a):
    a_decode = codecs.decode(a, "hex")[::-1]
    a_hash = hashlib.sha256(a_decode).digest()
    return codecs.encode(a_hash[::-1], "hex")
    

        





    


