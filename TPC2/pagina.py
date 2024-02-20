import os

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

                <header class="w3-container w3-red">
                <h3>{streetName}</h3>
                </header>
        
                <div class="w3-container">
    """

poshtml = """
                </div>
                <footer class="w3-container w3-red">
                    <h5>{streetName} :: A100896 </h5>
                    <a href="index.html" style="text-decoration: none;">Voltar ao menu inicial</a>
                </footer>
            </div>
        </body>

</html> 
"""

outputFileName = f"{street_name.replace(' ','')}.html"
outputFile = os.path.join(output_folder, outputFileName)
with open(outputFile, 'w', encoding ='utf-8') as f:
    f.write(final_content)
