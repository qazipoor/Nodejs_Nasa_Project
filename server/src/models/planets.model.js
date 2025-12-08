const fs = require('fs');
const { parse } = require('csv-parse');
const path = require('path');

const planets = [];

const csvParser = parse({
    comment: '#',
    columns: true,
    delimiter: ',',
})

const isHabitablePlanet = (planet) => {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] >= 0.36 && planet['koi_insol'] <= 1.11
        && planet['koi_prad'] <= 1.6;
}

const planetsDataPath = path.join(__dirname, '..', 'kepler_data.csv');

fs.createReadStream(planetsDataPath)
    .pipe(csvParser)
    .on('data', (data) => {
        if(isHabitablePlanet(data)) {
            planets.push(data);
        }
    })

module.exports = planets;