import { Router } from "express";
import * as UserController from "../controllers/user.controller";
const router = new Router();

// Get all Users
router.route("/users").get(UserController.getUsers);

// Add a new User
router.route("/register").post(UserController.register);

// Login User
router.route("/login").post(UserController.login);

// Update UserInfo
router.route("/users/update").post(UserController.login);

// Delete a user by cuid
router.route("/users/:cuid").delete(UserController.deleteUser);

export default router;
