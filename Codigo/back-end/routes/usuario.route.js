const express = require('express');
const Usuario = require('../models/usuario.model');
const router = express.Router();

router.post('/registrar-usuario', async (req, res)=>{
    try{
        let nuevoUsuario = new Usuario({
            nombre : req.body.nombre,
            correo : req.body.correo,
            contrasenna : req.body.contrasenna,
            rol : req.body.rol,
            estudianteId: req.body.estudianteId || null 
        });

        await nuevoUsuario.save();
        res.json({ msj : "El usuario fue registrado correctamente" });

    }catch(error){
        res.json({error});
    }
});

router.get('/listar-usuarios' , async(req,res)=>{
    try{
        const usuarios = await Usuario.find().populate('estudianteId', 'nombre');
        res.json(usuarios);
    }catch(error){
        res.json({error});
    }
});

router.post('/login', async (req, res) => {
    try {
        const { correo, contrasenna } = req.body;
        if(!correo || !contrasenna) {
            return res.status(400).json({ ok: false, msj: "Faltan credenciales" });
        }

        const usuario = await Usuario.findOne({ correo: correo });
        if(!usuario) {
            return res.status(404).json({ ok: false, msj: "Usuario no encontrado" });
        }

        if(usuario.contrasenna !== contrasenna) {
            return res.status(401).json({ ok: false, msj: "Contraseña incorrecta" });
        }

        const { _id, nombre, correo: mail, rol, estudianteId } = usuario;
        return res.json({ ok: true, usuario: { _id, nombre, correo: mail, rol, estudianteId } });

    } catch (error) {
        return res.status(500).json({ ok:false, error });
    }
});

router.post('/recuperar-contrasenna', async (req, res) => {
    try {
        const { correo } = req.body;
        const usuario = await Usuario.findOne({ correo: correo });

        if (!usuario) {
            return res.json({ ok: false, msj: "El correo no existe en el sistema." });
        }
        res.json({ ok: true, msj: `Instrucciones enviadas a ${correo}` });
    } catch (error) {
        res.json({ error });
    }
});

router.get("/buscar-usuario/:correo",async(req,res)=>{
    try{
        let correo = req.params.correo;
        const usuario = await Usuario.findOne({correo:correo});
        if(!usuario) res.json({msj:"Usuario no encontrado"});
        else res.json(usuario);
    }catch(error){ res.json({error}); }
});

router.delete("/eliminar-usuario/:id", async (req,res)=>{
    try{
        await Usuario.findByIdAndDelete(req.params.id);
        res.json({msj: "Usuario eliminado"});
    }catch(error){ res.json({error}); }
});

module.exports = router;