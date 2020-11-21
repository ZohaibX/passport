const express = require("express");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const keys = require("./config/keys");

const app = express();

// Database Service
const mongoose = require("mongoose");
const mongooseConnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost/passport", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("connected to local database");
  } catch (error) {
    console.log("error in database connection: ", error);
  }
};
mongooseConnect();
const User = require("./model"); // User model

//! Cookie-Session -- we are using id in serializing and deserializing, we will send that code in a cookie form
const cookieSession = require("cookie-session");
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // it means 30 days
    keys: ["secret"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

//! Passport Service
passport.serializeUser((user, done) => {
  done(null, user.id); // user's mongo id from database
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
}); // after getting that id, we will translate that into the data

//! For Google
//? https://console.developers.google.com/
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleSecretID,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      let user;
      user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = new User({
          googleId: profile.id,
          username: profile.displayName,
          picture: profile._json.picture,
        });
        await user.save();
      }
      done(null, user); // null means there is no error
    }
  )
);

//! For Facebook
// https://youtu.be/0194nsP3jAg?list=PLB97yPrFwo5hr5PpM9vkraDdrgnH3oWHm
// https://developers.facebook.com/
const FacebookStrategy = require("passport-facebook").Strategy;
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookSecretID,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "gender", "picture"],
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile._json.picture);
      let user;
      user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = new User({
          googleId: profile.id,
          username: profile.displayName,
          picture: profile._json.picture.data.url,
        });
        await user.save();
      }
      done(null, user); // null means there is no error
    }
  )
);

// Auth Route for google
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Auth Route for google
app.get("/auth/facebook", passport.authenticate("facebook")); //  we cannot use scope property here -- so we have this similar property in FB Strategy

// Callback Route for google
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/"); // we don't have this route here , but we have this route in client folder , so it will work here
  }
);

// Callback Route for FB
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/"); // we don't have this route here , but we have this route in client folder , so it will work here
  }
);

//? Special Routes for both
app.get("/api/current_user", (req, res) => {
  res.send(req.user); // req.user will automatically be created when user passes through the authentication flow
});

app.get("/api/logout", (req, res) => {
  req.logout();
  res.redirect("/"); // we don't have this route here , but we have this route in client folder , so it will work here
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log("App is listening on the port - " + port));
