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

  // Redirections to /poll
  router.get("/", (req, res) => {
    res.redirect("/poll");
  });

  router.get("/home", (req, res) => {
    res.redirect("/poll");
  });

  // Create new poll
  router.post("/poll", (req, res) => {
    const { email, questionText } = req.body;

    if (!email) {
      res.status(403).render("index", ["Invalid data"]);
      return;
    }

    database
      .createPoll(email, questionText)
      .then((poll) => {
        if (!poll) {
          res.send({ error: "Couldn't create poll!" });
          return;
        }
        res.redirect("/poll/:id/options");
      })
      .catch((e) => res.send(e));
  });

  // Display poll question and accept options.
  router.get("/poll/:id/options", (req, res) => {
    const { id } = req.body;

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
      })
      .catch((e) => res.send(e));
  });

  // Create poll options
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

        const { pollCreatorEmail } = result;
        const shareLink = `/poll/${id}`;

        // Trigger email to poll creator
        const emailData = {
          from: "Strawpoll <hello@strawpoll.com>",
          to: pollCreatorEmail,
          subject: `DecisionMaker - You created a new poll and id is ${id}!!`,
          text: `Share this poll with your friends! Link: ${shareLink}`,
        };
        sendEmail(emailData);
        res.redirect(shareLink);
      })
      .catch((e) => res.send(e));
  });

  // Get poll data and display on vote page.
  // Result object from dB will have "poll question" and "options"
  // to render
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

  // Post poll data and display results page
  // Result object from dB will have "poll question", "legend" &
  // data for pie chart.
  router.post("/poll/:id", (req, res) => {
    const { id } = req.params;
    const pollVotes = req.body; // ---- get from frontend via AJAX

    database
      .voteOnPoll(id, pollVotes)
      .then((result) => {
        const pollCreator = result.email;

        // Trigger email to poll creator
        const emailData = {
          from: "Sneha Mahajan <sneh.km@gmail.com>",
          to: pollCreator,
          subject: `Someone voted on your poll ${id}!!`,
          text: `Someone voted on your poll ${id}!!`,
        };
        sendEmail(emailData);
        res.render("result", result);
      })
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // Get results of a poll and display results page
  // Result object from dB will have "poll question", "legend" &
  // data for pie chart.
  router.get("/poll/:shareID/results", (req, res) => {
    const shareID = req.params.shareID;

    database
      .getAllVotes(shareID)
      .then((result) => res.render("result", result))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // Helper funciton to generate random ID for links
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
