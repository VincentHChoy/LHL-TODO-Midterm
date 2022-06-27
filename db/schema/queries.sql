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

--create options for poll
INSERT INTO options (owner_email, poll_id, option_text) 
VALUES ($1, $2, $3, $4)
RETURNING *;

--get all first votes
SELECT count(vote_1) as vote_count, options.option_text as vote
FROM votes
JOIN options ON vote_1 = options.id
WHERE votes.poll_id = 1
GROUP BY options.option_text
ORDER BY vote_count;

--get all first votes by email
SELECT count(vote_1) as count, options.option_text as vote
FROM votes
JOIN options ON vote_1 = options.id
WHERE votes.poll_id = $1
AND user_email = $2
GROUP BY options.option_text
ORDER BY count;



SELECT count(vote_1) as vote_count, options.option_text as vote
FROM votes
JOIN options ON vote_1 = options.id
WHERE votes.poll_id = 1
GROUP BY options.option_text
ORDER BY count;

