const mongoose = require('mongoose');

let schemaPrograma = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String }}, {
    timestamps: true
});


module.exports = mongoose.model('Programa', schemaPrograma, 'programas');