const passport = require("passport");

module.exports = (app) => {
  // in order to let the user grant permission using google account
  app.get(
    "/auth/google",
    // "google" string is something that makes passport understand that it has to use the google strategy
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  // once google sees code redirect to auth/google/callback
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    // this gets added because of railway
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  app.get("/api/logout", (req, res) => {
    //logout function is provided by passport
    req.logout();
    // res.send(req.user);
    res.redirect("/");
  });

  // this is needed so that the user who signed in has access to his info
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
