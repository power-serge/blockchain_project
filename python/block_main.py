from block_functions import *

#Essentially a constant, unless you find a new source
base = 'https://blockchain.info/rawblock/'

#change this to get a different block's info based on the block's hash
block_hash  = '0000000000000a3290f20e75860d505ce0e948a1d1d846bec7e39015d242884b'

#get the block data
block_data = getWholeBlock(base, block_hash)
print_block_info(block_data)

#write a file with the whole block's info, uncomment below to do it
#write_json(block_data, "block_data.json")

#get the transaction hashes from the block data
txs_hashes = get_tx_hashes(block_data)

print("\nTransactions in this block:", len(txs_hashes))

#calculate the merkle root by recursively hashing pairs of transaction hashes
#parse the final result as a string
root = calculate_root(txs_hashes).decode("utf-8")
print("\nCalculated root is:\n" + root)

#get the given merkle root from the block data
root_given = get_mrkl_root(block_data)
print ("\nGiven root from block data is:\n" + root_given)

#check if they are the same
print ("\nIs the given root correct?", root_given == root, "\n")

#reading block data from a json file
file_data = read_json("block_150000.json")
print("READING FROM JSON FILE")

#you can treat file_data just like block_data
print_block_info(file_data)

file_txs = get_tx_hashes(file_data)
print("\nTransactions in this block:", len(file_txs))

file_root = calculate_root(file_txs).decode("utf-8")
print("\nCalculated root is:\n" + file_root)

file_root_given = get_mrkl_root(file_data)
print ("\nGiven root from block data is:\n" + file_root_given)

print ("\nIs the given root correct?", root_ok(file_root, file_root_given), "\n")

#you can traverse the blockchain backwards by getting the previous block hash
#and using that to get that block's info
prev_block = get_prev_block(block_data)

prev_block_data = getWholeBlock(base, prev_block)
calc_root = calculate_root(get_tx_hashes(prev_block_data)).decode("utf-8")
given_root = get_mrkl_root(prev_block_data)

print_block_info(prev_block_data)

print("\nCALCULATED ROOT OF THE PREV BLOCK IS:")
print(calc_root)
print("\nIs Root Valid?", root_ok(given_root, calc_root))


#write a file of only transactions hashes, uncomment to do it
#write_json(txs_hashes, "block_tx_hashes.json")



