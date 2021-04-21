const mongoose = require('mongoose');
const produtoSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nome: String,
    preco: Number,
});

module.exports = mongoose.model('Produto', produtoSchema);
/*{
    _id:mongoose.Schema.Types.ObjectId,
    nome: String,
    preco: Number,
});
/*
{
    _id: mongoose.Schema.Types.ObjectId,
    nome: String,
    preco: Number,

});
*/

