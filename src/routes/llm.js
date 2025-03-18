import express from "express";

import llmController from "../controllers/llm.controller.js";

const router = express.Router();

router.post("/generate-sql", llmController.generateQuery);

export default router;
