import os
import xml.etree.ElementTree as ET


def chaveOrd(file):
    root = ET.fromstring(file)
    return root.find(".//meta/nome").text

xml_folder = "./MapaRuas-materialBase/MapaRuas-materialBase/texto"

bd = []

for f in os.listdir(xml_folder):
    if f.endswith('.xml'):
        xml_file = os.path.join(xml_folder, f)
        tree = ET.parse(xml_file)
        root = tree.getroot()
        streetName = (root.find(".//meta/nome").text).strip()
        bd.append((streetName,f))


bd.sort(key=lambda x: x[0])

preHTML = """
<!DOCTYPE html>

<html>
    <head>
        <title>Ruas de Braga</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="w3.css">
        <meta charset="utf-8"/>
    </head>

<body>
    <div class="w3-card-4">

        <header class="w3-container w3-lime">
          <h3>Lista das Ruas de Braga</h3>
        </header>
        
        <div class="w3-container">
            <ul class="w3-ul w3-card-4" style="width:50%">
               
"""

posHTML = """
            </ul>
        </div>

</body>

    <footer class="w3-container w3-lime">
        <h5>Lista das Ruas de Braga :: A100896 </h5>
    </footer>

    
</html> 
"""

conteudo = ""

for streetName, f in bd:
    conteudo += f"""
                    <li>
                       <a href="{streetName}.html">{streetName}</a>
                    </li>
                """

pagHTML = preHTML + conteudo + posHTML
f = open('index.html', 'w')
f.write(pagHTML)
f.close()