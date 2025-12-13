const fs = require('fs');
const { parse } = require('csv-parse');
const path = require('path');

const habitablePlanets = [];

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

const planetsDataPath = path.join(__dirname, '..', '..', 'data', 'kepler_data.csv');

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(planetsDataPath)
            .pipe(csvParser)
            .on('data', (data) => {
                if (isHabitablePlanet(data)) {
                    habitablePlanets.push(data);
                }
            })
            .on('error', (err) => {
                console.error(`Error while reading CSV file: ${err.message}`);
                reject(err);
            })
            .on('end', () => {
                console.log(`${habitablePlanets.length} habitable planets found!`);
                resolve();
            });
    });
}

function getAllPlanets() {
    return habitablePlanets;
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};