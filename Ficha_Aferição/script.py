import json
import requests

files = ['dataset-extra1.json', 'dataset-extra2.json', 'dataset-extra3.json']

for file in files:
    with open(file, 'r') as f:
        data = json.load(f)

    for person in data:
        response = requests.post('http://localhost:7777/pessoas', json = person, headers = {'Content-Type': 'application/json'})
        
    if response.status_code == 201:
        print(f'Pessoas do arquivo {file} inseridas com sucesso')
    else:
        print(f'Erro ao inserir pessoas do arquivo {file}')
        print(response.text)


