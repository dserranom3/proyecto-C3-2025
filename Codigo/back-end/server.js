const path = require('path'); // <--- IMPORTANTE: Agrega esto al inicio
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// --- ARREGLO DE RUTA ---
// Definimos la ruta exacta a la carpeta front-end
const rutaFrontEnd = path.join(__dirname, 'front-end');

// Imprimimos en la consola para verificar (MIRA ESTO EN TU TERMINAL)
console.log("----------------------------------------------------");
console.log("BUSCANDO ARCHIVOS EN LA CARPETA:", rutaFrontEnd);
console.log("----------------------------------------------------");

app.use(express.static(rutaFrontEnd)); 
// -----------------------

app.use((req, res, next) => {
    // ... (Mantén tus headers de CORS aquí) ...
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// ... (El resto de tu conexión a Mongo y rutas sigue igual) ...
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology : true
});

app.use('/api', require('./routes/usuario.route'));
app.use('/api', require('./routes/programa.route'));
app.use('/api', require('./routes/pei.route'));
app.use('/api', require('./routes/progreso.route'));

app.listen(PORT, ()=>{
    console.log('Servidor corriendo en http://localhost:3000');
});