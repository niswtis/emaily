const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const keys = require("./config/keys");

require("./models/User"); // we do not export anything, we just need to run the file
require("./services/passport"); // we do not export anything, we just need to run the file

mongoose.connect(keys.mongoURI);
const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // age of cookie
    keys: [keys.cookieKey], // encrypts the cookie so that nobody can change the value of the cookie
  })
);
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);