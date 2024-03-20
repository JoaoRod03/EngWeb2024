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

router.get('/compositores/editar/:id', function (req, res) {
	var d = new Date().toISOString().substring(0, 16);
	axios.get('http://localhost:3000/compositores/' + req.params.id)
		.then(response => {
			res.render('editarCompositor', { titulo: 'Edição de Compositor', compositor: response.data, data: d });
		})
		.catch(error => {
			res.render('error', { error : error, message: 'Erro ao recuperar o compositor.', data: d })
		})
})

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
	var d = new Date().toISOString().substring(0, 16);
	var p_id = '';

	axios.get('http://localhost:3000/periodos')
		.then(response => {
			for (var i = 0; i < response.data.length; i++)
				if (response.data[i].nome === req.body.periodo) {
					p_id = response.data[i].id;
				}

			if (p_id == '') {
				console.log('1')
				p_id = 'P' + (response.data.length + 1);
				novo_periodo_temp = {
					id: p_id,
					nome: req.body.periodo,
					compositores: [
						{
							"id": req.body.id,
							"nome": req.body.nome
						}
					]
				}
				axios.post('http://localhost:3000/periodos/', novo_periodo_temp)
			} else {
				console.log('2')
				axios.get('http://localhost:3000/periodos/' + p_id)
					.then(response => {
						response.data.compositores.push({ id: req.body.id, nome: req.body.nome });
						axios.put('http://localhost:3000/periodos/' + p_id, response.data)
					})
					.catch(erro => {
						res.render('error', { message: 'Erro ao recuperar o periodo.', data: d })
					})
			}

			req.body.periodo = { id: p_id, nome: req.body.periodo };

			axios.post('http://localhost:3000/compositores', req.body)
			.then(response => {
				res.redirect('/compositores');
			})
			.catch(erro => {
				res.render('error', { message: 'Erro ao registar o compositor.', data: d })
			})
		})
		.catch(erro => {
			res.render('error', { message: 'Erro ao recuperar os periodos.', data: d })
		})
});

router.post('/compositores/editar/:idCompositor', function (req, res) {
	var d = new Date().toISOString().substring(0, 16);
	var p_id = '';

	axios.get('http://localhost:3000/periodos')
		.then(response => {
			for (var i = 0; i < response.data.length; i++)
				if (response.data[i].nome === req.body.periodo) {
					p_id = response.data[i].id;
				}


			axios.get('http://localhost:3000/compositores/' + req.body.id)
				.then(response2 => {
					axios.get('http://localhost:3000/periodos/' + response2.data.periodo.id)
						.then(response3 => {
							response3.data.compositores.splice(response3.data.compositores.indexOf(response2.data.id), 1);
							axios.put('http://localhost:3000/periodos/' + response3.data.id, response3.data)
						})
						.catch(erro => {
							res.render('error', { message: 'Erro ao recuperar o periodo.', data: d })
						})
				})
				.catch(erro => {
					res.render('error', { message: 'Erro ao recuperar o compositor.', data: d })
				})


			if (p_id == '') {
				p_id = 'P' + (response.data.length + 1);
				novo_periodo_temp = {
					id: p_id,
					nome: req.body.periodo,
					compositores: [
						{
							"id": req.body.id,
							"nome": req.body.nome
						}
					]
				}
				axios.post('http://localhost:3000/periodos/', novo_periodo_temp)
			} else {
				axios.get('http://localhost:3000/periodos/' + p_id)
					.then(response => {
						response.data.compositores.push({ id: req.body.id, nome: req.body.nome });
						axios.put('http://localhost:3000/periodos/' + p_id, response.data)
					})
					.catch(erro => {
						res.render('error', { message: 'Erro ao recuperar o periodo.', data: d })
					})
			}

			req.body.periodo = { id: p_id, nome: req.body.periodo };

			axios.put('http://localhost:3000/compositores/' + req.body.id, req.body)
			.then(response => {
				res.redirect('/compositores');
			})
			.catch(erro => {
				res.render('error', { message: 'Erro ao editar o compositor.', data: d })
			})
		})
		.catch(erro => {
			res.render('error', { message: 'Erro ao recuperar os periodos.', data: d })
		})
});

router.get('/compositores/apagar/:idCompositor', function (req, res) {
	var d = new Date().toISOString().substring(0, 16);
	axios.get('http://localhost:3000/compositores/' + req.params.idCompositor)
		.then(response => {
			axios.get('http://localhost:3000/periodos/' + response.data.periodo.id)
				.then(response2 => {
					response2.data.compositores.splice(response2.data.compositores.indexOf(response.data.id), 1);
					axios.put('http://localhost:3000/periodos/' + response2.data.id, response2.data)
						.then(response3 => {
							axios.delete('http://localhost:3000/compositores/' + req.params.idCompositor)
							.then(response => {
								res.redirect('/compositores');
							})
							.catch(erro => {
								res.render('error', { message: 'Erro ao apagar o compositor.', data: d })
							})
						})
				})
				.catch(erro => {
					res.render('error', { message: 'Erro ao recuperar o periodo.', data: d })
				})
		})
		.catch(erro => {
			res.render('error', { message: 'Erro ao recuperar o compositor.', data: d })
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
