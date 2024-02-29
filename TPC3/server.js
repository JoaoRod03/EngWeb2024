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
    
    if (filme.cast.length > 0) {
        pagHTML += '<p>Elenco: '
        pagHTML += '<ul class="w3-ul">'
        for (var ator in filme.cast) {
            pagHTML += `<li><a href='/atores/${filme.cast[ator]}'>${filme.cast[ator]}</a></li>`
            }
        }
        pagHTML += '</ul>'
        pagHTML += '</p>'

    if (filme.genres.length > 0) {
        pagHTML += '<p>Géneros: '
        pagHTML += '<ul class="w3-ul">'
        for (var genero in filme.genres) {
            pagHTML += `<li><a href='/generos/${filme.genres[genero]}'>${filme.genres[genero]}</a></li>`
        }
        pagHTML += '</ul>'
        pagHTML += '</p>'
    }


pagHTML += `        
            </div>
            
            <footer class="w3-container w3-red">
            <h5>Filme: ${filme.id} :: A100896 </h5>
            <h5>[<a href = '/filmes'> Voltar à lista de filmes</a>]</h5>
            </footer>
            
        </div>
    </body>
    </html>
    `

    return pagHTML
}


function genAtores(atores){
    pagHTML = `
    <!DOCTYPE html>

    <html>
        <head>
            <title>Atores</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="/w3.css">
            <meta charset="utf-8"/>
        </head>

    <body>
        <div class="w3-card-4">

            <header class="w3-container w3-red">
              <h1>Lista de Atores</h1>
            </header>

            <div class="w3-container">
                    <table class="w3-table w3-striped">
                        <tr>
                            <th>Identificador</th>
                            <th>Nome</th>
                          </tr>
    `

    atores.forEach(ator => {
        pagHTML += `
            <tr>
                <td><a href='/atores/${ator.id}'>${ator.id}</a></td>
                <td>${ator.name}</td>
            </tr>`
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

function genAtor(ator){
    pagHTML = `
    <!DOCTYPE html>

    <html>
        <head>
            <title>Filme ${ator.id}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="/w3.css">
            <meta charset="utf-8"/>
        </head>

    <body>
        <div class="w3-card-4">

            <header class="w3-container w3-red">
              <h1>${ator.name}</h1>
            </header>

            <div class="w3-container">
                <p>ID: ${ator.id}</p>
                <p>Nome: ${ator.name}</p>
    `

    if (ator.movies.length > 0) {
        pagHTML += '<p>Filmes em que participou:'
        pagHTML += '<ul class="w3-ul">'
        for (var movie in ator.movies) {
            pagHTML += `<li><a href='/filmes/${ator.movies[movie]}'>${ator.movies[movie]}</a></li>`
        }
        pagHTML += '</ul>'
    }


pagHTML += `        
            </div>
            
            <footer class="w3-container w3-red">
            <h5>Ator: ${ator.name} :: A100896 </h5>
            <h5>[<a href = '/atores'> Voltar à lista de atores</a>]</h5>
            </footer>
            
        </div>
    </body>
    </html>
    `

    return pagHTML
}

function genGeneros(generos){
    pagHTML = `
    <!DOCTYPE html>

    <html>
        <head>
            <title>Generos</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="/w3.css">
            <meta charset="utf-8"/>
        </head>

    <body>
        <div class="w3-card-4">

            <header class="w3-container w3-red">
              <h1>Lista de Generos</h1>
            </header>

            <div class="w3-container">
                    <table class="w3-table w3-striped">
                        <tr>
                            <th>Identificador</th>
                            <th>Nome</th>
                          </tr>
    `

    generos.forEach(genero => {
        pagHTML += `
            <tr>
                <td><a href='/generos/${genero.id}'>${genero.id}</a></td>
                <td>${genero.name}</td>
            </tr>`
    })


    pagHTML += `
        </table>
            </div>
            
            <footer class="w3-container w3-red">
            <h5>Lista de generos:: A100896</h5>
            </footer>
            
        </div>
    </body>
    </html>
    `

    return pagHTML
}

function genGenero(genero){
    pagHTML = `
    <!DOCTYPE html>

    <html>
        <head>
            <title>Genero ${genero.id}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="/w3.css">
            <meta charset="utf-8"/>
        </head>

    <body>
        <div class="w3-card-4">

            <header class="w3-container w3-red">
              <h1>${genero.name}</h1>
            </header>

            <div class="w3-container">
                <p>ID: ${genero.id}</p>
                <p>Nome: ${genero.name}</p>
    `
    
    if (genero.movies.length > 0) {
        pagHTML += '<p>Filmes deste género:'
        pagHTML += '<ul class="w3-ul">'
        for (var movie in genero.movies) {
            pagHTML += `<li><a href='/filmes/${genero.movies[movie]}'>${genero.movies[movie]}</a></li>`
        }
        pagHTML += '</ul>'
    }


pagHTML += `        
            </div>
            
            <footer class="w3-container w3-red">
            <h5>Género: ${genero.name} :: A100896 </h5>
            <h5>[<a href = '/generos'> Voltar à lista de géneros</a>]</h5>
            </footer>
            
        </div>
    </body>
    </html>
    `

    return pagHTML
}


http.createServer(function (req, res) {
    var q = url.parse(req.url, true)
    
    var regexFilmesID = /^\/filmes\/[a-z0-9]{24}$/
    var regexFilmesNome = /^\/filmes\/.+$/

    var regexAtoresID = /^\/atores\/\d+$/
    var regexAtoresNome = /^\/atores\/.+$/

    var regexGenerosID = /^\/generos\/\d+$/
    var regexGenerosNome = /^\/generos\/.+$/


    if(q.pathname == '/'){
        fs.readFile('index.html', function(erro, dados) {
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
    }else if(regexFilmesID.test(q.pathname)){
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
    }else if(regexFilmesNome.test(q.pathname)){
        axios.get('http://localhost:3000/filmes')
            .then(function(resp) {
                dados = resp.data
                temp = q.pathname.replace(/%20/g, " ")
                filme = dados.find(filme => filme.title == temp.slice(8))
                console.log("aaaaa")
                pagHTML = genFilme(filme)
                console.log("apapapapap")
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8 '})
                res.write(pagHTML)
                res.end()
            })
            .catch(function(erro) {
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                res.write('<pre>Erro:' + erro + '</pre>')
                res.end()
            })
    }else if(q.pathname == '/atores'){
        axios.get('http://localhost:3000/atores')
            .then(function(resp) {
                dados = resp.data
                pagHTML = genAtores(dados)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8 '})
                res.write(pagHTML)
                res.end()
            })
            .catch(function(erro) {
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                res.write('<pre>Erro:' + erro + '</pre>')
                res.end()
            })
    }else if(regexAtoresID.test(q.pathname)){
        axios.get('http://localhost:3000' + q.pathname)
            .then(function(resp) {
                dados = resp.data
                pagHTML = genAtor(dados)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8 '})
                res.write(pagHTML)
                res.end()
            })
            .catch(function(erro) {
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                res.write('<pre>Erro:' + erro + '</pre>')
                res.end()
            })
    }else if(regexAtoresNome.test(q.pathname)){
        axios.get('http://localhost:3000/atores')
            .then(function(resp) {
                dados = resp.data
                temp = q.pathname.replace(/%20/g, " ")
                ator = dados.find(ator => ator.name == temp.slice(8))
                pagHTML = genAtor(ator)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8 '})
                res.write(pagHTML)
                res.end()
            })
            .catch(function(erro) {
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                res.write('<pre>Erro:' + erro + '</pre>')
                res.end()
            })
    }else if(q.pathname == '/generos'){
        axios.get('http://localhost:3000/generos')
            .then(function(resp) {
                dados = resp.data
                pagHTML = genGeneros(dados)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8 '})
                res.write(pagHTML)
                res.end()
            })
            .catch(function(erro) {
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                res.write('<pre>Erro:' + erro + '</pre>')
                res.end()
            })
    }else if(regexGenerosID.test(q.pathname)){
        axios.get('http://localhost:3000' + q.pathname)
            .then(function(resp) {
                dados = resp.data
                pagHTML = genGenero(dados)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8 '})
                res.write(pagHTML)
                res.end()
            })
            .catch(function(erro) {
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                res.write('<pre>Erro:' + erro + '</pre>')
                res.end()
            })
    }else if(regexGenerosNome.test(q.pathname)){
        axios.get('http://localhost:3000/generos')
            .then(function(resp) {
                console.log("aaaaa")
                dados = resp.data
                temp = q.pathname.replace(/%20/g, " ")
                genero = dados.find(genero => genero.name == temp.slice(9))
                pagHTML = genGenero(genero)
                console.log("apapapapap")
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8 '})
                res.write(pagHTML)
                res.end()
            })
            .catch(function(erro) {
                console.log("bbbbbbbb")
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                res.write('<pre>Erro:' + erro + '</pre>')
                res.end()
            })
    }else if(q.pathname == '/w3.css'){
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