import mongoose from "mongoose";

import Visual from "../models/visual.js";
import { errorHandler } from "../utils/index.js";

const create = async (req, res) => {
  //#swagger.summary  = 'Creates new visualisation under the given project'
  const projectId = req.params["projectId"];
  const name = req.body.name;
  const config = req.body.config;
  const datasource = req.body.datasource;

  if (!name || !config || !datasource || !projectId) {
    errorHandler(res, { message: "Bad Request - Payload not matching" }, 400);
    return;
  }
  try {
    // const user = getUserDetailsFromToken(req);
    const username = "user1";
    const newViz = new Visual({
      _id: new mongoose.Types.ObjectId(),
      name,
      config,
      datasource,
      projectId,
      createdBy: username,
      updatedBy: username,
    });

    await newViz.save();

    res.send(newViz);
  } catch (error) {
    errorHandler(res, error, 500);
  }
};

const update = async (req, res) => {
  //#swagger.summary  = 'Updates or modifies the details of a given visualisation'
  const vizId = req.params["vizId"];
  const projectId = req.params["projectId"];

  const config = req.body.config;
  const datasource = req.body.datasource;

  if (!vizId || !config || !datasource || !projectId) {
    errorHandler(res, { message: "Bad Request - Payload not matching" }, 400);
    return;
  }

  try {
    // const user = getUserDetailsFromToken(req);
    const username = "user1";

    const updated = await Visual.findOneAndUpdate(
      { _id: vizId },
      {
        config,
        datasource,
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

const getVizs = async (req, res) => {
  //#swagger.summary  = 'List all the visualisations with details under the given project'
  const projectId = req.params["projectId"];

  if (!projectId) {
    errorHandler(res, { message: "Bad Request - Payload not matching" }, 400);
    return;
  }

  try {
    const vizs = await Visual.find({ projectId });
    res.send(vizs);
  } catch (err) {
    errorHandler(res, err, 500);
  }
};

const getViz = async (req, res) => {
  //#swagger.summary  = 'Retrieves the details of the given visualisation'
  const projectId = req.params["projectId"];
  const vizId = req.params["vizId"];

  if (!projectId || !vizId) {
    errorHandler(res, { message: "Bad Request - Payload not matching" }, 400);
    return;
  }

  try {
    const vizs = await Visual.find({ projectId, _id: vizId });
    res.send(vizs);
  } catch (err) {
    errorHandler(res, err, 500);
  }
};

export default {
  create,
  update,
  getVizs,
  getViz,
};
