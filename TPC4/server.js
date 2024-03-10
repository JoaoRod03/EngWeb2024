

var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates.js') 
var static = require('./static.js') 

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var compositoresServer = http.createServer((req, res) => {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /alunos --------------------------------------------------------------------
                if(req.url == "/compositores"){
                    axios.get("http://localhost:3000/compositores")
                        .then(response => {
                            var compositores = response.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.composersListPage(compositores,d))
                            res.end()
                        })
                        .catch(error => {
                            res.writeHead(520, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.errorPage(error,d))
                            res.end()
                        })
                }
                // GET /alunos/:id --------------------------------------------------------------------
                else if(/\/compositores\/C\d+/.test(req.url)){
                    axios.get("http://localhost:3000" + req.url)
                        .then(response => {
                            var compositor = response.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.composerPage(compositor,d))
                            res.end()
                        })
                        .catch(error => {
                            res.writeHead(520, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.errorPage(error,d))
                            res.end()
                        })
                }
                // GET /alunos/registo --------------------------------------------------------------------
                else if(req.url == "/compositores/registo"){
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write(templates.composerFormPage(d))
                    res.end()
                }
                // GET /alunos/edit/:id --------------------------------------------------------------------
                else if(/^\/compositores\/edit\/C\d+$/.test(req.url)){
                    axios.get("http://localhost:3000/compositores/" + req.url.split("/")[3])
                        .then(response => {
                            var compositor = response.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.composerFormEditPage(compositor,d))
                            res.end()
                        })
                        .catch(error => {
                            res.writeHead(520, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.errorPage(error,d))
                            res.end()
                        })
                }
               
                // GET /alunos/delete/:id --------------------------------------------------------------------
                else if(/^\/compositores\/delete\/C\d+$/.test(req.url)){
                    axios.delete("http://localhost:3000" + req.url.split("/")[3])
                        .then(response => {
                            res.writeHead(302, {'Location': '/compositores'})
                            res.end()
                        })
                        .catch(error => {
                            res.writeHead(521, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.errorPage(error,d))
                            res.end()
                        })

                }
                else if (req.url == "/periodos") {
                    axios.get('http://localhost:3000/periodos')
                        .then(response => {
                            var periodos = response.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.periodsListPage(periodos, d))
                        })
                        .catch(error => {
                            res.writeHead(521, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.errorPage(error,d))
                            res.end()
                        })
                }
                
                else if(/^\/periodos\/P\d+$/.test(req.url)) {
                    axios.get('http://localhost:3000/periodos/' + req.url.split("/")[2])
                        .then(response => {
                            var periodo = response.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.periodPage(periodo, d))
                            res.end()
                        })
                        .catch(error => {
                            res.writeHead(521, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.errorPage(error,d))
                            res.end()
                        })
                }

                else if(req.url == "/periodos/registo"){
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write(templates.periodFormPage(d))
                    res.end()
                }
                // GET ? -> Lancar um erro
                else{
                    res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write(templates.errorPage(`Pedido GET não suportado: ${req.url}`,d))
                    res.end()
                }
                break
            case "POST":
                // POST /compositores/registo --------------------------------------------------------------------
                if(req.url == "/compositores/registo"){
                    collectRequestBodyData(req, result => {
                        if (result){
                            axios.post("http://localhost:3000/compositores", result)
                                .then(response => {
                                    res.writeHead(302, {'Location': '/compositores'})
                                    res.end()
                                })
                                .catch(error => {
                                    res.writeHead(520, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write(templates.errorPage(error,d))
                                    res.end()
                                })
                        }
                    })
                }
                // POST /alunos/edit/:id --------------------------------------------------------------------
                else if(/^\/compositores\/edit\/C\d+$/.test(req.url)){
                    collectRequestBodyData(req, result => {
                        if (result){
                            axios.put("http://localhost:3000/compositores/" + req.url.split("/")[3], result)
                                .then(response => {
                                    res.writeHead(302, {'Location': '/compositores'})
                                    res.end()
                                })
                                .catch(error => {
                                    res.writeHead(520, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write(templates.errorPage(error,d))
                                    res.end()
                                })
                        }
                    })
                }
                // POST ? -> Lancar um erro
                else{
                    res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write(templates.errorPage(`Pedido POST não suportado: ${req.url}`,d))
                    res.end()
                }
            default: 
                // Outros metodos nao sao suportados
        }
    }
})

alunosServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



