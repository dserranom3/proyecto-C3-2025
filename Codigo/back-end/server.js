const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const rutaFrontEnd = path.join(__dirname, 'front-end');
app.use(express.static(rutaFrontEnd));


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch((err) => console.error('Error conectando a BD:', err));

// Rutas del API
app.use('/api', require('./routes/usuario.route'));
app.use('/api', require('./routes/programa.route'));
app.use('/api', require('./routes/pei.route'));
app.use('/api', require('./routes/progreso.route'));

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});