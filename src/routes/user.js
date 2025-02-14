import express from "express";

import auth from "../middleware/auth.js";

import userController from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/change-password", auth, userController.changePassword);
router.get("/:userId", auth, userController.getUser);
router.put("/:userId", auth, userController.updateUser);

export default router;
