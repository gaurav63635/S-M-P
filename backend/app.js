const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ path: './config.env' });
const routes = require('./routes/routes');
const port = process.env.PORT


app.use(cors({
    origin: ['http://localhost:3000','https://e-housing-helping.onrender.com'],
    methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT', 'PATCH'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    credentials: true // Enable credentials
}));


require('./db/db');
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(routes);


app.listen(port, () => {
    console.log("app running on port no", port);
})