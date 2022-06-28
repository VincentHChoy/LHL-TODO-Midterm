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

const testDataPoll = {
  0: {
    question: "Eat where?",
    email: "sneh.km@gmail.com",
    id: 0,
  },
  1: {
    question: "Go where?",
    email: "bob@bob.com",
    id: 1,
  },
  2: {
    question: "Do what?",
    email: "bill@bill.com",
    id: 2,
  },
};

const options = {
  0: {
    option0: "McDonalds",
    option1: "Thai",
    option2: "Home",
    option3: "Out - doesn't matter where",
    pollId: 0,
  },
  1: {
    option0: "Hiking",
    option1: "Skiing",
    option2: "Running",
    option3: "Jumping",
    pollId: 1,
  },
  2: {
    option0: "Paint",
    option1: "Knit",
    option2: "Make coffee",
    option3: "Dance",
    pollId: 2,
  },
};

const votes = {
  0: {
    1: "Knit",
    2: "Paint",
    3: "Make coffee",
    4: "Dance",
    pollId: 0,
  },
  1: {
    1: "Dance",
    2: "Knit",
    3: "Make coffee",
    4: "Dance",
    pollId: 0,
  },
  2: {
    1: "Paint",
    2: "Knit",
    3: "Make coffee",
    4: "Dance",
    pollId: 0,
  },
  3: {
    1: "Hiking",
    2: "Running",
    3: "Skiing",
    4: "Jumping",
    pollId: 1,
  },
  4: {
    1: "Hiking",
    2: "Running",
    3: "Skiing",
    4: "Jumping",
    pollId: 1,
  },
  5: {
    1: "Hiking",
    2: "Running",
    3: "Skiing",
    4: "Jumping",
    pollId: 1,
  },
  6: {
    1: "Paint",
    2: "Knit",
    3: "Make coffee",
    4: "Dance",
    pollId: 2,
  },
  7: {
    1: "Paint",
    2: "Knit",
    3: "Make coffee",
    4: "Dance",
    pollId: 2,
  },
  8: {
    1: "Paint",
    2: "Knit",
    3: "Make coffee",
    4: "Dance",
    pollId: 2,
  },
};
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
    const { email, question } = req.body;

    if (email === "" || question === "") {
      const message = {
        text: "Invalid data. Please enter the email address and a question!",
      };
      res.status(400).render("index", message);
      return;
    }
    // temp code
    const idTemp = cp(email, question);
    console.log(idTemp, testDataPoll[idTemp]);
    res.redirect(`/poll/${idTemp}/options`);
    return;
    // temp code

    database
      .createPoll(email, question)
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
      res.status(400).render("index", ["Invalid data"]);
      return;
    }

    // temp code
    const question = getPollQ(id);
    const templateVars = { id, question };
    res.render("options", templateVars);
    return;
    // temp code

    database
      .getPollQuestion(id)
      .then((poll) => {
        if (!poll) {
          res.send({ error: "Couldn't get question!!" });
          return;
        }
        const templateVars = [id, poll.question];

        res.render("options", templateVars);
      })
      .catch((e) => res.send(e));
  });

  // Accept options for new poll
  router.post("/poll/:id/options", (req, res) => {
    const { option0, option1, option2, option3 } = req.body;
    const { id } = req.params;
    if (option0 === "" || option1 === "" || option2 === "" || option3 === "") {
      res.status(400).render("index", ["Invalid data"]);
      return;
    }

    // temp code
    addOptions(id, option0, option1, option2, option3);
    const shareLink = `/poll/${id}`;
    console.log(
      "Link for poll to share",
      shareLink,
      "Options-full object",
      options
    );
    res.redirect(shareLink);
    return;
    // temp code

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

    // temp code
    const templateVars = getPData(id);
    console.log(`Poll data for id: ${id}`, templateVars);
    res.render("vote", templateVars);
    return;
    // temp code

    database
      .showPoll(id)
      .then((result) => {
        const templateVars = {
          question: result.question,
          option0: result.option0,
          option1: result.option1,
          option2: result.option2,
          option3: result.option3,
        };
        res.render("vote", templateVars);
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
      res.status(400).render("index", ["No poll votes received!"]);
      return;
    }

    // temp code
    const templateVars = {

    }
    console.log("Data received from votes page:",req.body);
    // res.redirect(`/poll/${id}/results`);
    return;
    // temp code

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
        const templateVars = [
          result.question,
          result.countOption0,
          result.countOption1,
          result.countOption2,
          result.countOption3,
        ];
        res.render("result", templateVars);
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

  // Helper function to create junk poll data in object

  const cp = (email, question) => {
    const pollIDs = Object.keys(testDataPoll);
    const id = pollIDs.length;
    testDataPoll[id] = {
      email,
      question,
    };
    return id;
  };

  const getPollQ = (id) => {
    const poll = testDataPoll[id];
    const question = poll.question;
    return question;
  };

  const addOptions = (id, option0, option1, option2, option3) => {
    options[id] = {
      option0,
      option1,
      option2,
      option3,
      pollId: id,
    };
  };

  const getPData = (id) => {
    const poll = testDataPoll[id];
    const question = poll.question;
    const { option0, option1, option2, option3 } = options[id];

    const pollData = {
      question,
      options: [option0, option1, option2, option3],
    };

    return pollData;
  };

  const getPollR = (id) => {
    const result = {};
    for (const v in votes) {
      const vote = votes[v];

      if (vote.pollId === id) {
        for (const key in vote) {
          if (key.length === 1) {
            const value = parseInt(key);
            const option = vote[key];
            if (result[option]) {
              result[option] += value;
            } else {
              result[option] = 0;
              result[option] = value;
            }
          }
        }
      }
    }
    return result;
  };

  return router;
};
