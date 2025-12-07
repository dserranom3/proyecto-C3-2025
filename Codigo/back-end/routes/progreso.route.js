const express = require('express');
const Progreso = require('../models/progreso.model');
const router = express.Router();

// Registrar progreso
router.post('/registrar-progreso', async (req, res) => {
    try {
        let nuevoProgreso = new Progreso({
            peiId: req.body.peiId,
            observacion: req.body.observacion
        });

        await nuevoProgreso.save();
        res.json({ msj: "Progreso registrado correctamente" });

    } catch (error) {
        res.json({ error });
    }
});

// Listar progreso por PEI
router.get('/listar-progreso/:peiId', async (req, res) => {
    try {
        let progreso = await Progreso.find({ peiId: req.params.peiId });
        res.json(progreso);
    } catch (error) {
        res.json({ error });
    }
});

module.exports = router;
