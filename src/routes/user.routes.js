import { Router } from "express";
import * as userController from "../controllers/user.controller";

const router = Router();

router.get("/users", userController.findAllUsers);

router.get("/users/:id", userController.findUserById);

router.post("/users", userController.createUser);

router.delete("/users/:id", userController.deleteUser);

router.put("/users/:id", userController.updateUser);

// register route

router.post("/users/register", userController.registerUser);

// login route

router.post("/users/login", userController.loginUser);

router.get("/private-contacts", userController.verifyToken);

export default router;
