import mongoose from "mongoose";

import Project from "../models/project.js";
import { errorHandler } from "../utils/index.js";

const createProject = async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const isPublic = req.body.public;
  const authorisationRoles = req.body.authorisationRoles || [];
  const additionalConfig = req.body.additionalConfig || {};
  const db = req.body.db || {};

  if (!name || !description || !isPublic) {
    errorHandler(res, { message: "Bad Request - Payload not matching" }, 400);
    return;
  }
  try {
    // const user = getUserDetailsFromToken(req);
    const username = "user1";
    const newProject = new Project({
      _id: new mongoose.Types.ObjectId(),
      name,
      description,
      public: isPublic,
      authorisationRoles,
      additionalConfig,
      db,
      createdBy: username,
      updatedBy: username,
    });

    await newProject.save();

    res.send(newProject);
  } catch (error) {
    errorHandler(res, error, 500);
  }
};

const updateProject = async (req, res) => {
  const projectId = req.params["projectId"];

  const description = req.body.description;
  const isPublic = req.body.public;
  const authorisationRoles = req.body.authorisationRoles || [];
  const additionalConfig = req.body.additionalConfig || {};
  const db = req.body.db || {};

  if (!projectId || !description || !isPublic) {
    errorHandler(res, { message: "Bad Request - Payload not matching" }, 400);
    return;
  }

  try {
    // const user = getUserDetailsFromToken(req);
    const username = "user1";

    const updated = await Project.findOneAndUpdate(
      { _id: projectId },
      {
        description,
        public: isPublic,
        authorisationRoles,
        additionalConfig,
        db,
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

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.send(projects);
  } catch (err) {
    errorHandler(res, err, 500);
  }
};

const getProject = async (req, res) => {
  const projectId = req.params["projectId"];

  if (!projectId) {
    errorHandler(res, { message: "Bad Request - Payload not matching" }, 400);
    return;
  }
  try {
    const project = await Project.findOne({ _id: projectId });
    res.send(project);
  } catch (err) {
    errorHandler(res, err, 500);
  }
};

export default {
  createProject,
  updateProject,
  getProjects,
  getProject,
};
