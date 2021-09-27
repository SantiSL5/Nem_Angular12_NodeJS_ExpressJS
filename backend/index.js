const express = require('express');
const conectarDB = require('./config/db.config');
const cors = require("cors");

const app = express();

conectarDB();

const port = process.env.PORT;

app.use(cors());

app.use(express.json());

app.use('/api/products', require('./routes/routes'));

app.listen( port, () => {
    console.log(`El servidor está corriendo perfectamente en el puerto ${port}`);
})