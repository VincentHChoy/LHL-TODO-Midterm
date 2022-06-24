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

const showPoll = (id, ownerEmail, createdAt, active) => {
  return dbParams
    .query(
      `SELECT id, owner_email, created_at, active
      FROM polls
      WHERE owner_email = $1;`
    )
    .then(data => data.rows)
    .catch(err => console.error(err.stack));
};

const voteOnPoll = (email, pollId, userVote, voteRank) => {
  return dbParams
    .query(
      `INSERT INTO votes 
      (user_email, poll_id, user_vote, vote_rank, voted_at)
      VALUES ($1, $2, $3, $4, current_timestamp)
      RETURNING *;`, [email, pollId, userVote, voteRank]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const createPoll = (email, adminLink, submitLink, questionText, endDate, active) => {
  return dbParams 
    .query(
      `INSERT INTO polls (owner_email, admin_link, submit_link, question_text, created_at, end_date, active)
      VALUES ($1, $2, $3, $4, current_timestamp, $5, TRUE)
      RETURNING *;`, [email, adminLink, submitLink, questionText, endDate, active]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const createOptions = (email, pollId, optionText) => {
  return dbParams
    .query(
      `INSERT INTO options (owner_email, poll_id, option_text) 
      VALUES ($1, $2, $3)
      RETURNING *;`, [email, pollId, optionText]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};
    
const getAllVotes = (pollId) => {
  return dbParams
  .query(`SELECT votes.poll_id, user_email, options.option_text, vote_rank
  FROM votes
  JOIN options on options.poll_id = votes.poll_id
  WHERE votes.poll_id = $1 
  ORDER BY vote_rank;`, [pollId])
  .then(data => data.rows)
  .catch(err => console.error(err.stack));
};

const getAllVotesByEmail = (email) => {
  return dbParams
  .query(`SELECT votes.poll_id, user_email, options.option_text, vote_rank
  FROM votes
  JOIN options on options.poll_id = votes.poll_id
  WHERE votes.poll_id = $1 
  AND user_email = $2
  ORDER BY vote_rank;`, [email])
  .then(data => data.rows)
  .catch(err => console.error(err.stack));
} 

module.exports = dbParams; 