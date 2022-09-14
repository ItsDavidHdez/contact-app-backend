import passport from "passport";
import LocalStrategy from "passport-local";
import User from "./models/Users";

passport.use(
  new LocalStrategy(
    {
      emailField: "email",
    },
    async (email, password, done) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: "Not user found! :(" });
      } else {
        const match = await user.matchPassword(password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  console.log(id);
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
