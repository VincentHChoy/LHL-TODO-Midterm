/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: "79322908e21e95c27ed4b3f1d95a6871-4f207195-5a910630",
});
mg.messages
  .create(sandbox38265a88329e4f3e8d5306fee38cddbe.mailgun.org, {
    from: "StrawPoll <Straw poll.org>",
    to: ["ENTER EMAIL VARIABLE HERE"],
    subject: "Your poll here",
    text: "an administrative link (which lets them access the results) and a submission link (which the user sends to their friends)",
  })
  .then((msg) => console.log(msg)) // logs response data
  .catch((err) => console.log(err)); // logs any error`;

// You can see a record of this email in your logs: https://app.mailgun.com/app/logs.

// You can send up to 300 emails/day from this sandbox server.
// Next, you should add your own domain so you can send 10000 emails/month for free.

module.exports = (database) => {
  // Home page to begin the poll creation
  router.get("/", (req, res) => {
    res.render("index");
  });

  // Submit new pole data and links created.
  // Poll data includes question and options.
  // Links contain new links.
  router.post("/poll", (req, res) => {
    const pollData = req.body;

    const shareID = generateUniqueId();
    const adminID = generateUniqueId();
    const ids = {
      shareID,
      adminID,
    };

    database
      .addPoll(pollData, ids)
      .then((poll) => {
        if (!poll) {
          res.send({ error: "error" });
          return;
        }
        const shareID = poll.shareID;
        const shareLink = `/poll:${shareID}`;
        res.redirect(shareLink);
      })
      .catch((e) => res.send(e));
  });

  // Get poll data and display on vote page.
  // Result object from dB will have "poll question" and "options"
  // to render
  router.get("/poll:shareID", (req, res) => {
    const shareID = req.params.shareID;
    database
      .getPollData(shareID)
      .then((result) => res.render("vote", result))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // Post poll data and display results page
  // Result object from dB will have "poll question", "legend" &
  // data for pie chart.
  router.post("/poll:shareID", (req, res) => {
    const shareID = req.params.shareID;
    const pollAnswers = req.body;
    database
      .saveResults(shareID, pollAnswers)
      .then((result) => res.render("result", result))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // Get results of a poll and display results page
  // Result object from dB will have "poll question", "legend" &
  // data for pie chart.
  router.get("/poll:shareID/results", (req, res) => {
    const shareID = req.params.shareID;
    database
      .getResults(shareID)
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

  return router;
};
