import express from "express";
import ContactsRoutes from "./routes/contacts.routes";
import UsersRoutes from "./routes/user.routes";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import "./passport";

const app = express();

// port settings
app.set("port", process.env.PORT || 8000);

app.use(cors());
app.use(express.json());

// Middlewares
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "mysecretsession",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome!" });
});

app.use("/api/v1", ContactsRoutes);
app.use("/api/v1", UsersRoutes);

export default app;
