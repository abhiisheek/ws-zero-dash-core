import express from "express";

// import auth from "../middleware/auth.js";

import projectController from "../controllers/project.controller.js";

const router = express.Router();

router.post("/create", projectController.createProject);
router.put("/:projectId", projectController.updateProject);
router.get("/all", projectController.getProjects);

export default router;
