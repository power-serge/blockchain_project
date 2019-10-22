# This is the code used in the WBN video - Merkle Roots and Merkle Trees. Find the video on YouTube

import hashlib, codecs

Round = 0

# Hash pairs of items recursively until a single value is obtained
def merkle(hashList, ):
    global Round
    Round = Round + 1
    if len(hashList) == 1:
        # I had a brain fart when I mentioned this in the video. This returns the root
        # because now there is only one item - hashList [0]. Wish I could change
        # a youtube video but you cant.
        print ("AND OUR MERKLE ROOT IS")
        return hashList[0]
    newHashList = []   
    print ("Number of Branches in Round", Round, "is", len(hashList))
        
    # Process pairs. For odd length, last item is hashed with itself
    for i in range(0, len(hashList)-1, 2):
        print ("Branch",i+1, "is", hashList[i])
        print ("Branch",i+2, "is", hashList[i+1])
        print ("their hash is", hash2(hashList[i], hashList[i+1]))
        newHashList.append(hash2(hashList[i], hashList[i+1]))
    if len(hashList) % 2 == 1: # odd, hash last item twice
        print ("And Branch",len(hashList),"is hashed with itself to get", hash2(hashList[-1], hashList[-1]))
        print ("Branch", len(hashList), "is", hashList[len(hashList)-1])
        newHashList.append(hash2(hashList[-1], hashList[-1]))
    print ("DONE with Round", Round)
    print ("<========================================================>")
    return merkle(newHashList)

def hash2(first, second):
    # Reverse inputs before and after hashing due to big-endian / little-endian nonsense
    #py2 code-> firstreverse = first.decode('hex')[::-1]
    firstreverse = codecs.decode(first, "hex")[::-1]    
    #py2 code-> secondreverse = second.decode('hex')[::-1]
    secondreverse = codecs.decode(second, "hex")[::-1]
    h = hashlib.sha256(hashlib.sha256(firstreverse+secondreverse).digest()).digest()
    return codecs.encode(h[::-1], "hex")

txHashes2 = [
  "aa",
  "bb",
  "cc",
  "dd",
  "ee",
  "11",
  "22",
  "33",  
]
#"44", "55",
print (merkle(txHashes2))
