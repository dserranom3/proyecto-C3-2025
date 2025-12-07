const express = require('express');
const PEI = require('../models/pei.model');
const router = express.Router();

// Registrar PEI
router.post('/registrar-pei', async (req, res) => {
    try {
        let nuevoPEI = new PEI({
            estudianteId: req.body.estudianteId,
            programaId: req.body.programaId,
            descripcion: req.body.descripcion
        });

        await nuevoPEI.save();
        res.json({ msj: "PEI registrado correctamente" });

    } catch (error) {
        res.json({ error });
    }
});

// Listar PEIs
router.get('/listar-pei', async (req, res) => {
    try {
        let peis = await PEI.find().populate('estudianteId').populate('programaId');
        res.json(peis);
    } catch (error) {
        res.json({ error });
    }
});

module.exports = router;
