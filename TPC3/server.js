var http = require('http')
var fs = require('fs')
var url = require('url')
var axios = require('axios')

function genFilmes(filmes){
    pagHTML = `
    <!DOCTYPE html>

    <html>
        <head>
            <title>Filmes</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="/w3.css">
            <meta charset="utf-8"/>
        </head>

    <body>
        <div class="w3-card-4">

            <header class="w3-container w3-red">
              <h1>Lista de Filmes</h1>
            </header>

            <div class="w3-container">
                    <table class="w3-table w3-striped">
                        <tr>
                            <th>Identificador</th>
                            <th>Nome</th>
                            <th>Ano</th>
                          </tr>
    `

    filmes.forEach(filme => {
        pagHTML += `
        <tr>
            <td><a href = '/filmes/${filme.id}'>${filme.id}</a></td>
            <td>${filme.title}</td>
            <td>${filme.year}</td>
        </tr>
        `

    })

    pagHTML += `
        </table>
            </div>
            
            <footer class="w3-container w3-red">
            <h5>Lista de filmes:: A100896</h5>
            </footer>
            
        </div>
    </body>
    </html>
    `

    return pagHTML
}

function genFilme(filme){
    pagHTML = `
    <!DOCTYPE html>

    <html>
        <head>
            <title>Filme ${filme.id}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="/w3.css">
            <meta charset="utf-8"/>
        </head>

    <body>
        <div class="w3-card-4">

            <header class="w3-container w3-red">
              <h1>${filme.title}</h1>
            </header>

            <div class="w3-container">
                <p>ID: ${filme.id}</p>
                <p>Nome: ${filme.title}</p>
                <p>Ano: ${filme.year}</p>
    `
    
    var cast = filme.cast
    if (cast.length > 0) {
        pagHTML += '<p>Elenco: '
        for (var ator in cast) {
            pagHTML += cast[ator];
            if (ator != cast.length - 1) {
                pagHTML += ', ';
            }
        }
        pagHTML += '</p>'
    }


    var genres = filme.genres
    if (genres.length > 0) {
        pagHTML += '<p>Géneros: '
        for (var genero in genres) {
            pagHTML += genres[genero];
            if (genero != genres.length - 1) {
                pagHTML += ', ';
            }
        }
        pagHTML += '</p>'
    }


pagHTML += `        
            </div>
            
            <footer class="w3-container w3-red">
            <h5>Filme ${filme.id} :: A100896 </h5>
            <h5>[<a href = '/filmes'> Voltar à lista </a>]</h5>
            </footer>
            
        </div>
    </body>
    </html>
    `

    return pagHTML
}

http.createServer(function (req, res) {
    var regex = /^\/filmes\/[a-z0-9]{24}$/
    var q = url.parse(req.url, true)
    if(q.pathname == '/'){
        fs.readFile('principal.html', function(erro, dados) {
            if(!erro){
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(dados)
                res.end()
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write('<p>Erro: ' + erro + '</p>')
                res.end()
            }
        })
    } else if(q.pathname == '/filmes'){
        axios.get('http://localhost:3000/filmes')
            .then(function(resp) {
                dados = resp.data
                pagHTML = genFilmes(dados)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8 '})
                res.write(pagHTML)
                res.end()
            })
            .catch(function(erro) {
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                res.write('<pre>Erro:' + erro + '</pre>')
                res.end()
            })
    }else if(regex.test(q.pathname)){
        axios.get('http://localhost:3000' + q.pathname)
            .then(function(resp) {
                dados = resp.data
                pagHTML = genFilme(dados)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8 '})
                res.write(pagHTML)
                res.end()
            })
            .catch(function(erro) {
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                res.write('<pre>Erro:' + erro + '</pre>')
                res.end()
            })
    }
    else if(q.pathname == '/w3.css'){
        fs.readFile('w3.css', function(erro, dados) {
            res.writeHead(200, {'Content-Type': 'text/css'})
            res.write(dados)
            res.end()
        })
    }
    else{
        res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'})
        res.write('<p>Erro: pedido não suportado.</p>')
        res.write('<pre>' + q.pathname + '</pre>')
        res.end()
    }
    console.log(q.pathname)
}).listen(7777)