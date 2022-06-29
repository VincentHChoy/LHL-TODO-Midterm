/*
 * All routes for the api are defined here
 * Since this file is loaded in server.js into api/widgets.
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

// Database
const database = require("../lib/db");

module.exports = (router) => {

  // GET JSON data for a particular poll id
  router.get("/poll/:id", (req, res) => {
    const { id } = req.params;

    database
      .showPoll(id)
      .then((result) => {
        const question = result[0].question_text;
        const options = result.map((element) => {
          return element.option_text;
        });

        const poll = {
          id,
          question,
          options,
        };
        res.json(poll);
      })
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });
  return router;
};
