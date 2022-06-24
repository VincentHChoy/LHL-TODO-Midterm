--get poll by email
SELECT id, owner_email, created_at, active
FROM polls
WHERE owner_email = $1;

--vote on poll by email
INSERT INTO votes 
(user_email, poll_id, user_vote, vote_rank, voted_at)
VALUES ($1, $2, $3, $4, current_timestamp)
RETURNING *;

--create poll by email
INSERT INTO polls (owner_email, admin_link, submit_link, question_text, created_at, end_date, active)
VALUES ($1, $2, $3, $4, current_timestamp, $5, TRUE)
RETURNING *;

--get votes (all) 
SELECT votes.poll_id, user_email, options.option_text, vote_rank
FROM votes
JOIN options on options.poll_id = votes.poll_id
WHERE votes.poll_id = $1
ORDER BY vote_rank;

--get votes by email





-- SELECT polls.question_text as poll, users.name as name, options.option_text as option, votes.vote_rank as rank
-- FROM votes
-- JOIN polls on polls.id = poll_id
-- JOIN users on users.id = user_id
-- JOIN options on polls.id = poll_id
-- WHERE poll_id = 1
-- GROUP BY options.option_text;

SELECT count(*), options.option_text as options, votes.poll_id as poll
    FROM votes
    INNER JOIN options ON options.poll_id = votes.poll_id
    WHERE votes.poll_id = 1;

SELECT count(*), options.option_text as option
FROM votes
JOIN options ON options.id = votes.user_vote
WHERE votes.poll_id = 1
ORDER BY options.option_text;


-- SELECT polls.question_text as poll, users.name as name, vote_rank as rank, options.option_text as option
-- FROM votes
-- JOIN polls on polls.id = poll_id
-- JOIN users on users.id = user_id
-- INNER JOIN options on options.poll_id = votes.poll_id
-- WHERE votes.poll_id = 1 AND user_id = 2
-- ORDER BY rank;