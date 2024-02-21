var http = require('http')
var fs = require('fs')
var url = require('url')

http.createServer(function(req, res) {

    var q = url.parse(req.url, true).pathname.substring(1)

    if(q == 'w3.css') {
        fs.readFile('w3.css', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/css'})
            res.write(data)
            res.end()
        })
    }
    else  if (q == '') {
        fs.readFile('output/index.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write(data)
            res.end()
        })
    }
    else {
        fs.readFile('mapa-virtual.json', function(err, data) {
            var cities_ids = []
            var parsedData = JSON.parse(data)
            parsedData.cidades.forEach(function(cidade) {
                cities_ids.push(cidade.id)
            })
            if (cities_ids.includes(q.replace('.html', ''))) {
                fs.readFile('output/'+ q , function(err, data) {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(data)
                    res.end()
                })
            }
            else {
                res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'})
                res.write('<p>Pedido não suportado:</p>')
                res.end()
            }
        })
    }
}).listen(7777)
