import express from "express";

// import auth from "../middleware/auth.js";

import projectController from "../controllers/project.controller.js";
import vizController from "../controllers/viz.controller.js";

const router = express.Router();

router.post("/create", projectController.createProject);
router.get("/:projectId/all", vizController.getVizs);
router.post("/:projectId/create", vizController.create);
router.put("/:projectId/:vizId", vizController.update);
router.put("/:projectId", projectController.updateProject);
router.get("/all", projectController.getProjects);

export default router;
