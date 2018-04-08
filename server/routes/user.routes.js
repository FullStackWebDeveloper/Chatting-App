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
router.route("/users/update").post(UserController.updateUserInfo);

// Delete a user by cuid
router.route("/users/:cuid").delete(UserController.deleteUser);

// Confirm a user authorization
router.route("/authorized").post(UserController.authorizedUser);

router.route('/users/send').post(UserController.sendEmail);
 
export default router;
