/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

// Mailgun setup
require("dotenv").config();
const mailgun = require("mailgun-js");
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = mailgun({
  apiKey: process.env.API_KEY_MAILGUN,
  domain: DOMAIN,
});

// Database
const database = require("../lib/db");

module.exports = (router) => {
  // Home page to begin the poll creation
  router.get("/poll", (req, res) => {
    res.render("index");
  });

  // Redirections to /poll or homepage
  router.get("/", (req, res) => {
    res.redirect("/poll");
  });

  router.get("/home", (req, res) => {
    res.redirect("/poll");
  });

  // Create new poll
  router.post("/poll", (req, res) => {
    const { email, questionText } = req.body;

    if (!email || !questionText) {
      const message = ["Invalid data. Please enter the email address and a question!"];
      res.status(403).render("index", message);
      return;
    }

    database
      .createPoll(email, questionText)
      .then((poll) => {
        if (!poll) {
          res.send({ error: "Couldn't create poll!" });
          return;
        }
        const id = poll.id;
        res.redirect(`/poll/${id}/options`);
      })
      .catch((e) => res.send(e));
  });

  // Display poll question for new poll
  router.get("/poll/:id/options", (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(403).render("index", ["Invalid data"]);
      return;
    }

    database
      .getPollQuestion(id)
      .then((poll) => {
        if (!poll) {
          res.send({ error: "Couldn't get question!!" });
          return;
        }
        const message = [ poll.question ];

        res.render("options", message);
      })
      .catch((e) => res.send(e));
  });

  // Accept options for new poll
  router.post("/poll/:id/options", (req, res) => {
    const { option0, option1, option2, option3 } = req.body;
    const { id } = req.params;
    if (!option0 || !option1 || !option2 || !option3) {
      res.status(403).render("index", ["Invalid data"]);
      return;
    }

    database
      .createOptions(id, option0, option1, option2, option3)
      .then((result) => {
        if (!result) {
          res.send({ error: "Couldn't create poll options!" });
          return;
        }

        const { email } = result;
        const shareLink = `/poll/${id}`;

        // Trigger email to poll creator
        const emailData = {
          from: "Strawpoll <hello@strawpoll.com>",
          to: email,
          subject: `DecisionMaker - You created a new poll and id is ${id}!!`,
          text: `Share this poll with your friends! Link: ${shareLink}`,
        };
        sendEmail(emailData);
        res.redirect(shareLink);
      })
      .catch((e) => res.send(e));
  });

  // Show a poll and options
  router.get("/poll/:id", (req, res) => {
    const { id } = req.params;

    database
      .showPoll(id)
      .then((result) => {
        const message = {
          question: result.question,
          option0: result.option0,
          option1: result.option1,
          option2: result.option2,
          option3: result.option3,
        };
        res.render("vote", message);
      })
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // Vote on a poll
  router.post("/poll/:id", (req, res) => {
    const { id } = req.params;
    const pollVotes = req.body; // ---- get as array of order from frontend via AJAX

    if (!pollVotes) {
      res.status(403).render("index", ["No poll votes received!"]);
      return;
    }

    database
      .voteOnPoll(id, pollVotes)
      .then((result) => {
        const email = result.email;

        // Trigger email to poll creator
        const emailData = {
          from: "Strawpoll <hello@strawpoll.com>",
          to: email,
          subject: `Someone voted on your poll ${id}!!`,
          text: `Someone voted on your poll ${id}!!`,
        };
        sendEmail(emailData);
        res.redirect(`/poll/${id}/results`);
      })
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // Show results of a poll
  router.get("/poll/:id/results", (req, res) => {
    const { id } = req.params;

    database
      .getAllVotes(id)
      .then((result) => {
        const message = [
          result.question,
          result.countOption0,
          result.countOption1,
          result.countOption2,
          result.countOption3,
        ];
        res.render("result", message);
      })
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // Helper function to generate random ID for links
  const generateUniqueId = () => {
    let id = "";
    let strLen = 6;
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < strLen; i++) {
      const randIndex = Math.floor(Math.random() * chars.length);
      id = id.concat(chars[randIndex]);
    }
    return id;
  };

  // Helper function to send emails via mailgun
  const sendEmail = (emailData) => {
    // Test data object for now.
    // const data = {
    //   from: 'Sneha Mahajan <sneh.km@gmail.com>',
    //   to: 'sneh.km@gmail.com',
    //   subject: 'Hello',
    //   text: 'Testing some Mailgun awesomness!'
    // };
    mg.messages().send(emailData, function (error, body) {
      if (!body.id || error) {
        console.log("Email unsuccessful! Use a valid email address.");
        return false;
      }
      console.log(`An email was just sent to: ${emailData.to}`);
      return true;
    });
    return;
  };

  return router;
};
