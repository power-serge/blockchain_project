import hashlib
import random
import string



def randStrDig(strLength=100):
    hashStr = string.ascii_letters + string.digits
    return ''.join(random.choice(hashStr) for i in range(strLength))

def hash256():
    sha = hashlib.sha256()
    sha.update(randStrDig().encode('utf-8'))
    return print(sha.hexdigest())

def transactions(): 
    for i in range(random.randint(1,200)): 
        print("transaction", i+1,":")
        hash256() 
       
transactions()
