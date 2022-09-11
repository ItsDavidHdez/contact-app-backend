import express from "express";
import ContactsRoutes from "./routes/contacts.routes";

const app = express();

app.set("port", process.env.PORT || 8000);

app.get("/", (req, res) => {
  res.json({ message: "Welcome!" });
});

app.use("/api/v1", ContactsRoutes);

export default app;
