module.exports = (req, res, next) => {
  // passport automatically assigns logged in user in request
  if (!req.user) {
    return res.status(401).send({ error: "You must log in!" });
  }
  next();
};
