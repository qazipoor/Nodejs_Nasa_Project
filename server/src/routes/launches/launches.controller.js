const {
    getAllLaunches,
    addNewLaunch,
    abortLaunch,
    existsLaunchWithId,
} = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}

function httpGetLaunch(req, res) {
    const launchId = req.params.id;
    const launches = getAllLaunches();
    const launch = launches.find(launch => launch.flightNumber === Number(launchId));
    if (!launch) {
        return res.status(404).json({
            'error': "Launch not found!"
        })
    }
    return res.status(200).json(launch);
}

function httpAddNewLaunch(req, res) {
    const launch = req.body;

    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: "Missing required launch property",
        });
    }


    launch.launchDate = new Date(launch.launchDate);

    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: "Invalid launch date",
        });
    }

    addNewLaunch(launch);
    return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);

    if (!existsLaunchWithId(launchId)) {
        return res.status(404).json({
            error: "Launch not found!"
        })
    } else {
        const aborted = abortLaunch(launchId);
        return res.status(200).json(aborted);
    }
    
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
    httpGetLaunch,
}