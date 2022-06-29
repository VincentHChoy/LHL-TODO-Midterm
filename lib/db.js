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
  // In this function, we will need to pull the options and the question for a particular poll based
  // on the shareID of that poll alone. I think this query may need to be reconstructed based on that.
  return db
    .query(
      `SELECT DISTINCT polls.id, question_text, options.option_text as option, polls.owner_email, created_at, active
      FROM polls
      JOIN options ON polls.id = options.poll_id
      WHERE polls.id = $1;`, [id]
    )
    .then(data => data.rows)
    .catch(err => console.error(err.stack));
};


const getPollQuestion = (id) => {
return db
  .query(
    `SELECT question_text FROM polls
    WHERE id = $1;`, [id]
  )
.then(data => data.rows[0])
.catch(err => console.error(err.stack));
};


const voteOnPoll = (pollId, opt1Rank, opt2Rank, opt3Rank, opt4Rank) => {
  // We need to think how to incorporate multiple vote ranks in this query. Whether the server calls
  // function 4 times? Or how would this be handled.
  // will delete owner_email, user_name params if not needed -megan
  return db
    .query(
      `INSERT INTO votes
      (poll_id, opt1_rank, opt2_rank, opt3_rank, opt4_rank, voted_at)
      VALUES ($1, $2, $3, $4, $5, current_timestamp)
      RETURNING (SELECT owner_email FROM polls WHERE poll_id = polls.id);`, [pollId, opt1Rank, opt2Rank, opt3Rank, opt4Rank]
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

const createOptions = (pollId, optionText) => {
  // Thinking how to incorporate this function in the server code. Since all our options
  // and the question are on the same page submitted through 1 form, I am confused how to handle this.
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
  //lowest score =
  return db
  .query(`SELECT DISTINCT SUM(opt1_rank) as opt1, SUM(opt2_rank) as opt2, SUM(opt3_rank) as opt3, SUM(opt4_rank) as opt4, polls.question_text as question
  FROM votes
  JOIN options ON votes.poll_id = options.poll_id
  JOIN polls ON votes.poll_id = polls.id
  WHERE votes.poll_id = $1
  GROUP BY options, polls.question_text;`, [pollId])
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
