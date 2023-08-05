module.exports = (req, res, next) => {
  // passport automatically assigns logged in user in request
  if (req.user.credits < 1) {
    return res.status(403).send({ error: "Not enough credits!" });
  }
  next();
};
