var Pessoa = require('../models/pessoas')

module.exports.list = () => {
    return Pessoa
        .find()
        .sort({nome: 1})
        .exec()
}

module.exports.findByID = id => {
    return Pessoa
        .findOne({_id: id})
        .exec()
}

module.exports.insert = pessoa => {
    return Pessoa.create(pessoa)
        .then(res => {
            return res
        })
        .catch(error => {
            return error
        })
}

module.exports.updatePessoa = (id, pessoa) => {
    return Pessoa.updateOne({_id: id}, pessoa)
}

module.exports.removePessoa = id => {
    return Pessoa.deleteOne({_id: id})
}

        

