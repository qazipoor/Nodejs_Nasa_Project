const planets = require('../../models/planets.model');

function getAllPlanets(req, res) {
    return res.status(200).set('Access-Control-Allow-Origin', 'http://localhost:3000').json(planets);
};

module.exports = {
    getAllPlanets,
}