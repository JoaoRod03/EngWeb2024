var express = require('express');
var router = express.Router();
var Pessoa = require('../controllers/pessoas')


router.get('/pessoas', function(req, res) {
	Pessoa.list()
    	.then(data => res.jsonp(data))
    	.catch(error => res.jsonp(error))
});

router.get('/pessoas/:id', function(req, res) {
	Pessoa.findByID(req.params.id)
    	.then(data => res.jsonp(data))
    	.catch(error => res.jsonp(error))
});

router.post('/pessoas', function(req, res) {
  	Pessoa.insert(req.body)
    	.then(data => res.status(201).jsonp(data))
    	.catch(error => res.status(523).jsonp(error))
})

router.put('/pessoas', function(req, res) {
  	Pessoa.updatePessoa(req.params.id, req.body)
    	.then(data => res.jsonp(data))
    	.catch(error => res.jsonp(error))
})

router.delete('/pessoas/:id', function(req, res) {
  	Pessoa.removePessoa(req.params.id)
		.then(data => res.jsonp(data))
		.catch(error => res.jsonp(error))
})


module.exports = router;
