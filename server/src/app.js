const express = require('express');
const cors = require('cors');

const planetsRouter = require('./routes/planets/planets.router');

const app = express();

// Middlewares
const corsWhiteList = ['http://localhost:3000'];
app.use(cors({
    origin: function (origin, callback) {
        if (corsWhiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
app.use(express.json());

// Routes
app.use('/', planetsRouter);

module.exports = app;