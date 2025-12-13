const express = require("express");
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
  httpGetLaunch,
} = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.get("/:id", httpGetLaunch);
launchesRouter.post("/", httpAddNewLaunch);
launchesRouter.delete("/:id", httpAbortLaunch);

module.exports = launchesRouter