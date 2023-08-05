const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/mailer");

const Survey = mongoose.model("surveys");

const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

module.exports = async (app) => {
  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for voting!!!");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");
    // chain just executes functions one after another
    // req.body contains all the different actions the user performed through the email links
    _.chain(req.body)
      .map(({ email, url }) => {
        // extract surveyId and user choice from the url of the event
        const match = p.test(new URL(url).pathname); // will either contain {surveyId: value, choice: value} or null
        if (match) {
          return {
            ...match,
            email,
          };
        }
      })
      .compact() // events can contain undefined values, which represent other events or do not contain surveyId and choice in this step we remove undefined values
      .uniqBy("email", "surveyId") // remove duplicate records
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          // find survey that contains the recipient and
          // update yes/no counter as well as recipients responded status
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 }, // [choice] is an array destructuring and can refer to the yes ot the no attr of the survey depending on its value
            $set: {
              "recipients.$.responded": true,
              "recipients.$.answer": choice,
            }, // update recipient responded value
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();
    res.send({});
  });

  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({
      _user: req.user.id,
    }).select("yes no dateSent title body");
    res.send(surveys);
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    // If body contains properties, create new survey. Else, return all surveys

    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      body,
      subject,
      recipients: recipients.split(",").map((email) => {
        return { email: email.trim() };
      }),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    try {
      //Send Email
      const mailer = new Mailer(survey, surveyTemplate(survey));
      await mailer.send();

      // after emails have been sent we want to save the survey
      await survey.save();

      // deduct credits
      req.user.credits -= 1;
      const user = await req.user.save();

      // return updated user
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
