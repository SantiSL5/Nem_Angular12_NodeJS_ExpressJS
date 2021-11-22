const express = require('express');
const conectarDB = require('./config/db.config');
const cors = require("cors");
const client = require('prom-client');

const app = express();

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const counterHomeEndpoint = new client.Counter({
    name: 'counterHomeEndpoint',
    help: 'The total number of processed requests'
});

const counterProductEndpoint = new client.Counter({
    name: 'counterProductEndpoint',
    help: 'The total number of processed requests to get endpoint'
});

const counterUserEndpoint = new client.Counter({
    name: 'counterUserEndpoint',
    help: 'The total number of processed requests to get endpoint'
});

const counterCategoryEndpoint = new client.Counter({
    name: 'counterCategoryEndpoint',
    help: 'The total number of processed requests to get endpoint'
});


conectarDB();

const port = process.env.PORT;

app.use(cors());

app.use(express.json());

// Test routes

app.get('/', (req, res) => {
    counterHomeEndpoint.inc();
    res.send('Hello world\n');
});

app.get('/product', (req, res) => {
    counterProductEndpoint.inc();
    res.send('Product\n');
});

app.get('/user', (req, res) => {
    counterUserEndpoint.inc();
    res.send('User\n');
});

app.get('/category', (req, res) => {
    counterCategoryEndpoint.inc();
    res.send('Category\n');
});

app.get('/metrics', (req, res) => {
   res.set('Content-Type', client.register.contentType);
   res.end(client.register.metrics());
});

app.use(require('./routes'));

app.listen( port, () => {
    console.log(`El servidor está corriendo perfectamente en el puerto ${port}`);
})