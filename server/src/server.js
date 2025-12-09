const http = require('http');

const app = require('./app');

// Load planet data before starting the server
const { loadPlanetsData } = require('./models/planets.model');


const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();