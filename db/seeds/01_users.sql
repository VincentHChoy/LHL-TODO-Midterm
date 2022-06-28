-- Users table seeds here (Example)
INSERT INTO users (name, email, password) 
VALUES ('Eva Stanley', 'sebastianguerra@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Louisa Meyer', 'jacksonrose@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Dominic Parks', 'victoriablackwell@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Roger Pelican', 'rogerpelican@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO polls (owner_email, admin_link, submit_link, question_text, created_at, end_date, active)
VALUES ('victoriablackwell@outlook.com', 'admin link', 'submit link', 'Where should we eat tonight?', current_timestamp, '2022-09-22', TRUE),
('sebastianguerra@ymail.com', 'admin link', 'submit link', 'What movie should we watch this weekend?', current_timestamp, '2022-09-22', TRUE),
('jacksonrose@hotmail.com', 'admin link', 'submit link', 'Which TV show is best?', current_timestamp, '2022-09-22', TRUE),
('rogerpelican@gmail.com', 'admin link', 'submit link', 'Which is the best travel destination?', current_timestamp, '2022-09-22', TRUE);

INSERT INTO options (poll_id, option_text, description_text)
VALUES (1, 'Sunshine Diner', '50s diner'),
(1, 'Jam Cafe', 'bougie brunch with a long lineup'),
(1, 'Au Comptoir', 'bougie french'),
(1, 'Sophies Cosmic Cafe', 'funky brunch'),
(2, 'Terminator 2', 'action'),
(2, 'First Blood', 'action'),
(2, 'Tampopo', 'art'),
(2, 'Enter The Dragon', 'kung fu'),
(3, 'Seinfeld', 'sitcom'),
(3, 'Friends', 'sitcom'),
(3, 'Arrested Development', 'sitcom'),
(3, 'Buffy the Vampire Slayer', 'drama');
-- (4, 'Europe'),
-- (4, 'Asia'),
-- (4, 'Africa'),
-- (4, 'South America');

--poll 1
INSERT INTO votes 
(user_email, user_name, poll_id, vote_1, vote_2, vote_3, vote_4, voted_at)
VALUES ('sebastianguerra@ymail.com', 'Sebastian', 1, 1, 2, 3, 4, current_timestamp),

('jacksonrose@hotmail.com', 'jackson', 1, 3, 2, 4, 1, current_timestamp),

('victoriablackwell@outlook.com', 'victoria', 1, 3, 2, 1, 4, current_timestamp),

('rogerpelican@gmail.com', 'roger', 1, 3, 1, 4, 2, current_timestamp);

 --poll 2
-- INSERT INTO votes (user_id, poll_id, user_vote, vote_rank, voted_at)
-- VALUES (1, 2, 1, 1, current_timestamp),
-- (1, 2, 2, 2, current_timestamp),
-- (1, 2, 4, 3, current_timestamp),
-- (1, 2, 3, 4, current_timestamp),
-- (2, 2, 3, 1, current_timestamp),
-- (2, 2, 1, 2, current_timestamp),
-- (2, 2, 4, 3, current_timestamp),
-- (2, 2, 2, 4, current_timestamp),
-- (3, 2, 2, 2, current_timestamp),
-- (3, 2, 4, 3, current_timestamp),
-- (3, 2, 3, 4, current_timestamp),
-- (3, 2, 1, 2, current_timestamp),
-- (4, 2, 3, 1, current_timestamp),
-- (4, 2, 4, 3, current_timestamp),
-- (4, 2, 1, 2, current_timestamp),
-- (4, 2, 2, 4, current_timestamp);

-- --poll 3
-- INSERT INTO votes (user_id, poll_id, user_vote, vote_rank, voted_at)
-- VALUES (1, 3, 1, 1, current_timestamp),
-- (1, 3, 2, 2, current_timestamp),
-- (1, 3, 4, 3, current_timestamp),
-- (1, 3, 3, 4, current_timestamp),
-- (2, 3, 3, 1, current_timestamp),
-- (2, 3, 1, 2, current_timestamp),
-- (2, 3, 4, 3, current_timestamp),
-- (2, 3, 2, 4, current_timestamp),
-- (3, 3, 2, 2, current_timestamp),
-- (3, 3, 4, 3, current_timestamp),
-- (3, 3, 3, 4, current_timestamp),
-- (3, 3, 1, 2, current_timestamp),
-- (4, 3, 3, 1, current_timestamp),
-- (4, 3, 4, 3, current_timestamp),
-- (4, 3, 1, 2, current_timestamp),
-- (4, 3, 2, 4, current_timestamp);

-- --poll 4
-- INSERT INTO votes (user_id, poll_id, user_vote, vote_rank, voted_at)
-- VALUES (1, 4, 1, 1, current_timestamp),
-- (1, 4, 2, 2, current_timestamp),
-- (1, 4, 4, 3, current_timestamp),
-- (1, 4, 3, 4, current_timestamp),
-- (2, 4, 3, 1, current_timestamp),
-- (2, 4, 1, 2, current_timestamp),
-- (2, 4, 4, 3, current_timestamp),
-- (2, 4, 2, 4, current_timestamp),
-- (3, 4, 2, 2, current_timestamp),
-- (3, 4, 4, 3, current_timestamp),
-- (3, 4, 3, 4, current_timestamp),
-- (3, 4, 1, 2, current_timestamp),
-- (4, 4, 3, 1, current_timestamp),
-- (4, 4, 4, 3, current_timestamp),
-- (4, 4, 1, 2, current_timestamp),
-- (4, 4, 2, 4, current_timestamp);


