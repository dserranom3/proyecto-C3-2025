const mongoose = require('mongoose');

let schemaPEI = new mongoose.Schema({
    estudianteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    programaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Programa', required: true },
    descripcion: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now }
});
module.exports = mongoose.model('PEI', schemaPEI, 'peis');