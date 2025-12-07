const express = require('express');
const Programa = require('../models/programa.model');
const router = express.Router();

// Registrar programa
router.post('/registrar-programa', async (req, res) => {
    try {
        let nuevoPrograma = new Programa({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion
        });

        await nuevoPrograma.save();
        res.json({ msj: "Programa registrado correctamente" });

    } catch (error) {
        res.json({ error });
    }
});

// Listar programas
router.get('/listar-programas', async (req, res) => {
    try {
        let programas = await Programa.find();
        res.json(programas);
    } catch (error) {
        res.json({ error });
    }
});

module.exports = router;
