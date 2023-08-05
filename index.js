const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

require("./models/User"); // we do not export anything, we just need to run the file
require("./models/Survey"); // we do not export anything, we just need to run the file
require("./services/passport"); // we do not export anything, we just need to run the file

const billingRoutes = require("./routes/billingRoutes");
const surveyRoutes = require("./routes/surveyRoutes");
const authRoutes = require("./routes/authRoutes");

mongoose.connect(keys.mongoURI);
const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // age of cookie
    keys: [keys.cookieKey], // encrypts the cookie so that nobody can change the value of the cookie
  })
);
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
billingRoutes(app);
surveyRoutes(app);

if (process.env.NODE_ENV === "production") {
  // express will serve up production assets
  // like out main.js file , or mai.css file!!
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it does not recognise any of the routes above
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
