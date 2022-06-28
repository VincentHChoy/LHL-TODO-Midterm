let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };
}

const { Pool } = require("pg");
const db = new Pool(dbParams);

const showPoll = (id) => {
  return db
    .query(
      `SELECT polls.id, polls.question_text, options.option_text
      FROM polls
      JOIN options ON options.poll_id = polls.id
      WHERE polls.id = $1;`,[id]
    )
    .then(data => data.rows)
    .catch(err => console.error(err.stack));
};

const voteOnPoll = (email, pollId, userVote, voteRank) => {
  return db
    .query(
      `INSERT INTO votes
      (user_email, poll_id, user_vote, vote_rank, voted_at)
      VALUES ($1, $2, $3, $4, current_timestamp)
      RETURNING *;`, [email, pollId, userVote, voteRank]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const createPoll = (email, questionText) => {
  return db
    .query(
      `INSERT INTO polls (owner_email, question_text, created_at, active)
      VALUES ($1, $2, current_timestamp, TRUE)
      RETURNING *;`, [email, questionText]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

// Get question only
const getPollQuestion = (id) => {
  return db
    .query(
      `SELECT question_text FROM polls
      WHERE id = $1;`, [id]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const createOptions = (pollId, optionText) => {
  return db
    .query(
      `INSERT INTO options (poll_id, option_text)
      VALUES ($1, $2)
      RETURNING (SELECT owner_email FROM polls WHERE poll_id = polls.id);`, [pollId, optionText]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const getAllVotes = (pollId) => {
  return db
  .query(`SELECT votes.poll_id, user_email, options.option_text, vote_rank
  FROM votes
  JOIN options on options.poll_id = votes.poll_id
  WHERE votes.poll_id = $1
  ORDER BY vote_rank;`, [pollId])
  .then(data => data.rows)
  .catch(err => console.error(err.stack));
};


const getAllVotesByEmail = (email) => {
  return db
  .query(`SELECT votes.poll_id, user_email, options.option_text, vote_rank
  FROM votes
  JOIN options on options.poll_id = votes.poll_id
  WHERE votes.poll_id = $1
  AND user_email = $2
  ORDER BY vote_rank;`, [email])
  .then(data => data.rows)
  .catch(err => console.error(err.stack));
}

module.exports = {
  db,
  createPoll,
  createOptions,
  showPoll,
  voteOnPoll,
  getAllVotes,
  getAllVotesByEmail,
  getPollQuestion
};
