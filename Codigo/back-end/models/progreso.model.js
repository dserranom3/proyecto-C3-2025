const mongoose = require('mongoose');

let schemaProgreso = new mongoose.Schema({
    peiId: { type: mongoose.Schema.Types.ObjectId, ref: 'PEI', required: true },
    fecha: { type: Date, default: Date.now },
    observacion: { type: String, required: true }
});

module.exports = mongoose.model('Progreso', schemaProgreso, 'progresos');