const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  // requireLogin is a middleware used to check if user is logged in before executing functionality
  // called when user wants to add credits
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const token = req.body;
    const charge = await stripe.charges.create({
      amount: 1000,
      currency: "eur",
      description: "Purchase 10 credits",
      source: token.id,
    });

    req.user.credits += 10;
    const user = await req.user.save();
    res.send(user);
  });
};
