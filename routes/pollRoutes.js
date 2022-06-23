/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

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
  router.get("/poll/:shareID", (req, res) => {
    const shareID = req.params.shareID;
    console.log(shareID);
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
      .then((result) => res.render("result", result))
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

  return router;
};
