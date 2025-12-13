const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration Y',
    rocket: 'Explorer IS2',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
};

function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(
      latestFlightNumber,
      Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ["Zero To Mastery", "NASA"],
        flightNumber: latestFlightNumber,
        launchDate: new Date(launch.launchDate),
      })
    );
}

function abortLaunch(id) {
  const launch = launches.get(id);
  launch.upcoming = false;
  launch.success = false;
  return launch;
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
  existsLaunchWithId,
};