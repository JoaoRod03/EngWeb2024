import os
import json

preHTML = """
<!DOCTYPE html>

<html>
    <head>
        <title>Cidades</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="../w3.css">
        <meta charset="utf-8"/>
    </head>

<body>
    <div class="w3-card-4">

        <header class="w3-container w3-red">
          <h3>Lista das Cidades</h3>
        </header>
        
        <div class="w3-container">
            <ul class="w3-ul w3-card-4" style="width:50%">
               
"""

posHTML = """
            </ul>
        </div>

</body>

    <footer class="w3-container w3-red">
        <h5>Lista das Cidades :: A100896 </h5>
    </footer>

    
</html> 
"""

content = ""

with open('mapa-virtual.json', 'r') as file:
    data = json.load(file)
    sorted_cities = sorted(data['cidades'], key=lambda x: x['nome'])

for city in sorted_cities:
    name = city['nome']
    content += f"""
                    <li>
                    <a href="{name}.html" style="text-decoration: none;">{name}</a>
                    </li>
                """

pagHTML = preHTML + content + posHTML

output_folder = "./output"
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

outputFileName = f"index.html"
outputFile = os.path.join(output_folder, outputFileName)
with open(outputFile, 'w', encoding='utf-8') as f:
    f.write(pagHTML)
f.close()