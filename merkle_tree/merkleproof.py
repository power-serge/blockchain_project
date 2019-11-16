# Use this file to compute the merkle root by harcoding strings inside the txHashes list

import hashlib, codecs

# This function builds the tree and returns the merkle root
def buildMerkleTree(hashList):
    if len(hashList) == 1:
        return hashList[0]
    newHashList = []
    # Process pairs. For odd length, the last is skipped
    for i in range(0, len(hashList)-1, 2):
        newHashList.append(hashPair(hashList[i], hashList[i+1]))
    if len(hashList) % 2 == 1: # odd, hash last item twice
        newHashList.append(hashPair(hashList[-1], hashList[-1]))
    return buildMerkleTree(newHashList)

def hashPair(a, b):
    # Reverse inputs before and after hashing
    # due to big-endian / little-endian nonsense
    #a1 = a.decode('hex')[::-1]
    a1 = codecs.decode(a, "hex")[::-1]
    #b1 = b.decode('hex')[::-1]
    b1 = codecs.decode(b, "hex")[::-1]    
    h = hashlib.sha256(hashlib.sha256(a1+b1).digest()).digest()
    #return h[::-1].encode('hex')
    return codecs.encode(h[::-1], "hex")

txHashes = ["ba", "bb", "cc", "de"]		

x = buildMerkleTree(txHashes)
print(x)
