import requests
import json
url = "https://jsonplaceholder.typicode.com/todos"
response = requests.get(url)
todos = json.loads(response.text)

