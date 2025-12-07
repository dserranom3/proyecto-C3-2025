const mongoose = require('mongoose');

let schemaUsuario = new mongoose.Schema({
    nombre : {type: String, required: true},
    correo: {type: String, required: true, unique: true},
    contrasenna: {type: String, required: true},
    rol: { type: String, default: "estudiante" }, 
    estudianteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: false } 
}, {
    timestamps: true
});

module.exports = mongoose.model('Usuario', schemaUsuario, 'usuarios');