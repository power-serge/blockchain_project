from block_functions import *

value1 = "aa"
value2 = "bb"

print(hashOne(value1))
print(hashOne(value2))

# How to use the single functions to produce the double hash
a_dec = hexDecode(value1)
b_dec = hexDecode(value2)
result = hexHash(a_dec + b_dec)
res2 = hexHash(result)
res_enc = hexEncode(res2)    
print("res_enc:", res_enc)

# Shorter way to use single functions to produce bitcoin's double hash
hex_hash = hexHash(hexDecode(value1) + hexDecode(value2))
hex_enc = hexEncode(hexHash(hex_hash))
print("hex_enc:", hex_enc)
