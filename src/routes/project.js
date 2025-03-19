import express from "express";

import projectController from "../controllers/project.controller.js";
import vizController from "../controllers/viz.controller.js";
import dashboardController from "../controllers/dashboard.controller.js";

const router = express.Router();

router.post("/create", projectController.createProject);
router.get("/all", projectController.getProjects);
router.get("/:projectId/viz/all", vizController.getVizs);
router.post("/:projectId/viz/create", vizController.create);
router.put("/:projectId/viz/:vizId", vizController.update);
router.get("/:projectId/viz/:vizId", vizController.getViz);
router.get("/:projectId/dashboard/all", dashboardController.getDashboards);
router.post("/:projectId/dashboard/create", dashboardController.create);
router.put("/:projectId/dashboard/:dashboardId", dashboardController.update);
router.get("/:projectId/dashboard/:dashboardId", dashboardController.getDashboard);
router.put(
  "/:projectId/dashboard/:dashboardId/publish",
  dashboardController.publish
);
router.put("/:projectId", projectController.updateProject);
router.get("/:projectId", projectController.getProject);

export default router;
