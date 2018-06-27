
var mongoose = require('mongoose');
var armaSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    descripcion: {type: String, required: true},
    fuerza: {type: Number},
    categoria: {type: String},
    municion: {type: Boolean}
    
});

var donothing = () => {
}

var Arma = mongoose.model("Arma", armaSchema);
module.exports = Arma;