import os
import xml.etree.ElementTree as ET

xml_folder = "./MapaRuas-materialBase/MapaRuas-materialBase/texto"
output_folder = "./ruas"


if not os.path.exists(output_folder):
    os.makedirs(output_folder)


prehtml = """
<!DOCTYPE html>
<html>
        <head>
            <title>{title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="../w3.css">
            <meta charset="utf-8"/>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-lime">
                <h3>{streetName}</h3>
                </header>
        
                <div class="w3-container">
    """

poshtml = """
                </div>
                <footer class="w3-container w3-lime">
                    <h5>{streetName} :: A100896 </h5>
                </footer>
            </div>
        </body>

</html> 
"""


for xml_file in os.listdir(xml_folder):
    if xml_file.endswith('.xml'):
        # Load the XML file
        tree = ET.parse(os.path.join(xml_folder, xml_file))
        root = tree.getroot()

        content = ""

        # Extract information from XML
        street_name = root.find(".//meta/nome").text
        paras = root.findall(".//corpo/para")
        figures = root.findall(".//figura")
        houses = root.findall(".//lista-casas/casa")

        for para in paras:
            content += f"<p>{ET.tostring(para, method='text', encoding='unicode')}</p>"

        for figure in figures:
            image_path = "../MapaRuas-materialBase/MapaRuas-materialBase/" + figure.find('.//imagem').get('path').replace("../", "")
            image_caption = figure.find('.//legenda').text
            content += f"<figure><img src='{image_path}' style='max-width: 100%;height: auto;' alt='{image_caption}'><figcaption>{image_caption}</figcaption></figure>"
            
        if houses:
            content += "<h2>Casas:</h2>"
            content += "<ul>"
            for house in houses:
                house_num = house.find(".//número").text
                enf = house.find(".//enfiteuta")
                house_enfiteuta = enf.text if enf is not None and enf.text is not None else "Não existe enfiteuta"
                foro = house.find(".//foro")
                house_foro = foro.text if foro is not None and foro.text is not None else "Não existe foro"
                content += f"<li>Casa {house_num}; Enfiteuta: {house_enfiteuta}, Foro: {house_foro}</li>"
            content += "</ul>"


        final_content = prehtml.format(title=f"{street_name}", streetName = street_name) + content + poshtml.format(streetName = street_name)

        outputFileName = f"{street_name.replace(' ','')}.html"
        output_file = os.path.join(output_folder, outputFileName)
        with open(output_file, 'w') as f:
            f.write(final_content)


