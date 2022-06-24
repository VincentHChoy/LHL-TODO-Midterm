/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

// Mailgun setup
const mailgun = require("mailgun-js");
const DOMAIN = "sandbox47b119268f754f2087647964e3cd6fa8.mailgun.org";
const mg = mailgun({
  apiKey: "f867369ea219b6b15b91cc513a89c0a6-4f207195-2cf5d86e",
  domain: DOMAIN,
});
//

module.exports = (router, database) => {
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

  // Submit new poll data and links created.
  // Poll data includes question and options.
  // Links contain new links.
  router.post("/poll", (req, res) => {
    console.log("inside /poll");
    const pollData = req.body;

    const shareID = generateUniqueId();
    const adminID = generateUniqueId();
    const ids = {
      shareID,
      adminID,
    };

    database.addPoll(pollData, ids).then((poll) => {
        if (!poll) {
          res.send({ error: "error" });
          return;
        }
        const pollCreator = poll.email;
        const shareID = poll.shareID;
        const shareLink = `/poll:${shareID}`;

        const adminID = poll.adminID;
        const adminLink = `/poll:${adminID}`;

        // Trigger email to poll creator
        const emailData = {
          from: "Sneha Mahajan <sneh.km@gmail.com>",
          to: pollCreator,
          subject: `DecisionMaker - You created a new poll ${shareID}!!`,
          text: `Share this poll with your friends! Link: ${shareLink}
                 Your administrator link: ${adminLink}`,
        };
        sendEmail(emailData);

        res.redirect(shareLink);
      })
      .catch((e) => res.send(e));
  });

  // Get poll data and display on vote page.
  // Result object from dB will have "poll question" and "options"
  // to render
  router.get("/poll/:shareID", (req, res) => {
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
  router.post("/poll/:shareID", (req, res) => {
    const shareID = req.params.shareID;
    const pollAnswers = req.body;

    database
      .saveResults(shareID, pollAnswers)
      .then((result) => {
        const pollCreator = result.email;

        // Trigger email to poll creator
        const emailData = {
          from: "Sneha Mahajan <sneh.km@gmail.com>",
          to: pollCreator,
          subject: `Someone voted on your poll ${shareID}!!`,
          text: `Someone voted on your poll ${shareID}!!`,
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
