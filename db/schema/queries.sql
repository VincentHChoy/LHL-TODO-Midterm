--get poll by email
SELECT DISTINCT polls.id, question_text, options.option_text as option, polls.owner_email, created_at, active
FROM polls
JOIN options ON polls.id = options.poll_id
WHERE polls.owner_email = 'sebastianguerra@ymail.com';

--vote on poll
INSERT INTO votes 
(user_email, user_name, poll_id, opt1_rank, opt2_rank, opt3_rank, opt4_rank, voted_at)
VALUES ($1, $2, $3, $4, $5, $6, $7, current_timestamp)
RETURNING *;

--create poll by email
INSERT INTO polls (owner_email, admin_link, submit_link, question_text, created_at, end_date, active)
VALUES ($1, $2, $3, $4, current_timestamp, $5, TRUE)
RETURNING *;

--create options for poll
INSERT INTO options (owner_email, poll_id, option_text) 
VALUES ($1, $2, $3, $4)
RETURNING *;

-- --get all first votes
-- SELECT count(vote_1) as vote_count, options.option_text as vote
-- FROM votes
-- JOIN options ON vote_1 = options.id
-- WHERE votes.poll_id = 1
-- GROUP BY options.option_text
-- ORDER BY vote_count;

-- --get all first votes by email
-- SELECT count(vote_1) as count, options.option_text as vote
-- FROM votes
-- JOIN options ON vote_1 = options.id
-- WHERE votes.poll_id = $1
-- AND user_email = $2
-- GROUP BY options.option_text
-- ORDER BY count;

--get all votes -> receives points ranking options. order reflects fixed place options
SELECT SUM(opt1_rank) as opt1, SUM(opt2_rank) as opt2, SUM(opt3_rank) as opt3, SUM(opt4_rank) as opt4
FROM votes
WHERE votes.poll_id = 1;

SELECT SUM(opt1_rank) as opt1, SUM(opt2_rank) as opt2, SUM(opt3_rank) as opt3, SUM(opt4_rank) as opt4
FROM votes
JOIN options ON opt1_rank = options.id
WHERE votes.poll_id = 1
GROUP BY options.option_text;



