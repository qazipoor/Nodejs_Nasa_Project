const API_PORT = `${process.env.PORT || 8000}`;

// Load planets and return as JSON.
async function httpGetPlanets() {
  const response = await fetch(`http://localhost:${API_PORT}/planets`);
  return await response.json();
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch(`http://localhost:${API_PORT}/launches`);
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a, b) => a.flightNumber - b.flightNumber);
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`http://localhost:${API_PORT}/launches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (err) {
    return {
      ok: false,
    };
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    return await fetch(`http://localhost:${API_PORT}/launches/${id}`, {
      method: "delete",
    });
  } catch (err) {
    console.log(err);
    return {
      ok: false,
    };
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};