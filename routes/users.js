/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (database) => {

  // Home page to begin the poll creation
  router.get("/", (req, res) => {
    const templateVars = {};
    res.render("index", templateVars);
  });

  // Submit a new pole
  router.post("/poll", (req, res) => {
    const pollData = req.body;

    const shareID = generateUniqueRandomPollId();
    const adminID = generateUniqueRandomPollId();
    const links = {
      shareLink: `/poll/${shareID}`,
      adminLink: `/poll/${adminID}`,
    };

    database
      .addPoll(pollData, links)
      .then((poll) => {
        if (!poll) {
          res.send({ error: "error" });
          return;
        }
        req.session.userId = poll.id;
        res.render("vote", links);
      })
      .catch((e) => res.send(e));
  });

  // Display results of a poll
  router.get("/poll:adminID", (req, res) => {
    const adminID = req.params.adminID;
    database
      .getResults(adminID)
      .then((result) => res.render("result", result))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // Send votes to the database
  router.post("/poll:shareID",(req, res)=>{
    const shareID = req.params.shareID;
    database
      .sendVotes(shareID)
      .then((result) => res.render("vote", result))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // Helper funciton to generate random ID for links
  const generateUniqueRandomPollId = () => {
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
