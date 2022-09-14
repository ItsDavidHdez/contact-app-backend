import { Router } from "express";
import * as contactController from "../controllers/contact.controller";
import * as userController from "../controllers/user.controller";

const router = Router();

router.get(
  "/contacts",
  userController.verifyToken,
  contactController.findAllContact
);

router.get(
  "/contacts/:id",
  userController.verifyToken,
  contactController.findOneContact
);

router.post(
  "/contacts",
  userController.verifyToken,
  contactController.createContact
);

router.delete(
  "/contacts/:id",
  userController.verifyToken,
  contactController.deleteContact
);

router.put(
  "/contacts/:id",
  userController.verifyToken,
  contactController.updateTask
);

export default router;
