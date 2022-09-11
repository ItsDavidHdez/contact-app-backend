import { Router } from "express";

const router = Router();

router.get("/contacts", (req, res) => {
  res.send("Contacts");
});

export default router;
