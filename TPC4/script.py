import json


def comps(compositores, periodos):
    for compositor in compositores:
        per = ''
        for p in periodos:
            if p['nome'] == compositor['periodo']:
                per = p['id']
        compositor['periodo'] = {'id': per, 'nome': compositor['periodo']}
    return compositores

def main():
    with open('compositores.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

        periodos = []

        for compositor in data['compositores']:
            periodo = compositor['periodo']
            if periodo in [p['nome'] for p in periodos]:
                for p in periodos:
                    if p['nome'] == periodo:
                        p['compositores'].append({'id': compositor['id'], 'nome': compositor['nome']})
            else:
                periodos.append({'id': 'P' + str(len(periodos) + 1), 'nome': periodo, 'compositores': [{'id': compositor['id'], 'nome': compositor['nome']}]})

        newDict = {
            'compositores': comps(data['compositores'], periodos),
            'periodos': periodos
        }

        with open('compositores.json', 'w', encoding='utf-8') as file:
            json.dump(newDict, file, indent=4, ensure_ascii=False)

if __name__ == '__main__':
    main()