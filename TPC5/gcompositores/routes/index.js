var axios = require('axios')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	var d = new Date().toISOString().substring(0, 16)
	res.render('index', { titulo: 'Gestão de compositores', data: d });
});

router.get('/compositores', function (req, res) {
	var d = new Date().toISOString().substring(0, 16)
	axios.get("http://localhost:3000/compositores")
		.then(response => {
			res.render('listaCompositores', { lista : response.data, data : d, titulo : 'Lista de Compositores'})
		})
		.catch(error => {
			res.render('error', { error : error, message : 'Erro ao recuperar os compositores',  data : d})
		})
});

router.get('/compositores/registo', function (req, res) {
	var d = new Date().toISOString().substring(0, 16)
	res.render('registoCompositor', { data : d, titulo : 'Registo de compositor'})
});

router.get('/compositores/:id', function (req, res) {
	var d = new Date().toISOString().substring(0, 16)
	axios.get("http://localhost:3000/compositores/" + req.params.id)
		.then(response => {
			res.render('compositor', { compositor : response.data, data : d, titulo : 'Consulta de Compositor'})
		})
		.catch(error => {
			res.render('error', { error : error, message : 'Erro ao recuperar os compositores',  data : d})
		})
});

router.post('/compositores/registo', function (req, res) {
	console.log(JSON.stringify(req.body))
	var d = new Date().toISOString().substring(0, 16)
	axios.post("http://localhost:3000/compositores", req.body)
		.then(response => {
			res.render('confirmRegisto', {info : req.body, data : d, titulo : 'Registo de compositor com Sucesso'})
		})
		.catch(error => {
			res.render('error', { error : error, message : 'Erro ao registar o compositor',  data : d})
		}) 	
})

router.get('/periodos', function (req, res) {
	var d = new Date().toISOString().substring(0, 16)
	axios.get("http://localhost:3000/periodos")
		.then(response => {
			res.render('listaPeriodos', { lista : response.data, data : d, titulo : 'Lista de Períodos'})
		})
		.catch(error => {
			res.render('error', { error : error, message : 'Erro ao recuperar os períodos',  data : d})
		})
});

router.get('/periodos/:id', function (req, res) {
	var d = new Date().toISOString().substring(0, 16)
	console.log(req.params.id)
	axios.get("http://localhost:3000/periodos/" + req.params.id)
		.then(response => {
			res.render('periodo', { periodo : response.data, data : d, titulo : 'Consulta de Período'})
		})
		.catch(error => {
			res.render('error', { error : error, message : 'Erro ao recuperar o período',  data : d})
		})
});

module.exports = router;
