var express = require('express');
var router = express.Router();
var Pessoa = require('../controllers/pessoas')

router.get('/modalidades', function(req, res) {
    var modalidades = []
    Pessoa.list().then(dados => {
        for(i = 0; i < dados.length; i++){
            for(modalidade of dados[i].desportos){
                if(!modalidades.includes(modalidade)){
                    modalidades.push(modalidade)
                }
            }
        }
        res.jsonp(modalidades.sort())
    })
    .catch(erro => res.status(500).jsonp(erro))
})

router.get('/modalidades/:modalidade', function (req, res, next) {
    var pessoas = []
    Pessoa.list().then(dados => {
        for(i = 0; i < dados.length; i++){
            if(dados[i].desportos.includes(req.params.modalidade)){
                pessoas.push(dados[i].nome)
            }
        }
        res.jsonp(pessoas.sort())
    })
    .catch(erro => res.status(500).jsonp(erro))
})

module.exports = router;