import express from "express";

// import auth from "../middleware/auth.js";

import dbController from "../controllers/db.controller.js";

const router = express.Router();

router.post("/execute", dbController.executeQuery);
router.get("/:database/tables", dbController.getAllTables);

export default router;
