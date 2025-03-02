import mongoose from "mongoose";

import Dashboard from "../models/dashboard.js";
import { errorHandler } from "../utils/index.js";

const create = async (req, res) => {
  const projectId = req.params["projectId"];
  const name = req.body.name;
  const config = req.body.config;
  const additionalConfig = req.body.additionalConfig || {};
  const published = false;

  if (!name || !config || !projectId) {
    errorHandler(res, { message: "Bad Request - Payload not matching" }, 400);
    return;
  }
  try {
    // const user = getUserDetailsFromToken(req);
    const username = "user1";
    const newDashboard = new Dashboard({
      _id: new mongoose.Types.ObjectId(),
      name,
      config,
      additionalConfig,
      published,
      projectId,
      createdBy: username,
      updatedBy: username,
    });

    await newDashboard.save();

    res.send(newDashboard);
  } catch (error) {
    errorHandler(res, error, 500);
  }
};

const update = async (req, res) => {
  const dashboardId = req.params["dashboardId"];
  const projectId = req.params["projectId"];

  const config = req.body.config;
  const additionalConfig = req.body.additionalConfig || {};
  const published = false;

  if (!dashboardId || !config || !projectId) {
    errorHandler(res, { message: "Bad Request - Payload not matching" }, 400);
    return;
  }

  try {
    // const user = getUserDetailsFromToken(req);
    const username = "user1";

    const updated = await Dashboard.findOneAndUpdate(
      { _id: dashboardId, projectId },
      {
        config,
        additionalConfig,
        published,
        updatedBy: username,
        updatedOn: Date.now(),
      },
      {
        new: true,
      }
    );

    res.send(updated);
  } catch (err) {
    errorHandler(res, err, 500);
  }
};

const publish = async (req, res) => {
  const dashboardId = req.params["dashboardId"];
  const projectId = req.params["projectId"];

  if (!dashboardId || !projectId) {
    errorHandler(res, { message: "Bad Request - Payload not matching" }, 400);
    return;
  }

  try {
    // const user = getUserDetailsFromToken(req);
    const username = "user1";

    const updated = await Dashboard.findOneAndUpdate(
      { _id: dashboardId, projectId },
      {
        published: true,
        updatedBy: username,
        updatedOn: Date.now(),
      },
      {
        new: true,
      }
    );

    res.send(updated);
  } catch (err) {
    errorHandler(res, err, 500);
  }
};

const getDashboards = async (req, res) => {
  const projectId = req.params["projectId"];

  if (!projectId) {
    errorHandler(res, { message: "Bad Request - Payload not matching" }, 400);
    return;
  }

  try {
    const dashboards = await Dashboard.find({ projectId });
    res.send(dashboards);
  } catch (err) {
    errorHandler(res, err, 500);
  }
};

export default {
  create,
  update,
  getDashboards,
  publish,
};
