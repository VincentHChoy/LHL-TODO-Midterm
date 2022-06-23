-- Users table seeds here (Example)
INSERT INTO users (name, email, password) 
VALUES ('Eva Stanley', 'sebastianguerra@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Louisa Meyer', 'jacksonrose@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Dominic Parks', 'victoriablackwell@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Roger Pelican', 'rogerpelican@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO polls (created_by, question_text, created_at, end_date, active)
VALUES (1, 'Where should we eat tonight?', current_timestamp, '2022-09-22', TRUE),
(2, 'What movie should we watch this weekend?', current_timestamp, '2022-09-22', TRUE),
(3, 'Which TV show is best?', current_timestamp, '2022-09-22', TRUE),
(4, 'Which is the best travel destination?', current_timestamp, '2022-09-22', TRUE);

INSERT INTO options (poll_id, option_text)
VALUES (1, 'Sunshine Diner'),
(1, 'Jam Cafe'),
(1, 'Au Comptoir'),
(1, 'Sophies Cosmic Cafe'),
(2, 'Terminator 2'),
(2, 'First Blood'),
(2, 'Tampopo'),
(2, 'Enter The Dragon'),
(3, 'Seinfeld'),
(3, 'Friends'),
(3, 'Arrested Development'),
(3, 'Buffy the Vampire Slayer'),
(4, 'Europe'),
(4, 'Asia'),
(4, 'Africa'),
(4, 'South America');

--poll 1
INSERT INTO votes (user_id, poll_id, user_vote, vote_rank, voted_at)
VALUES (1, 1, 1, 1, current_timestamp),
(1, 1, 2, 2, current_timestamp),
(1, 1, 4, 3, current_timestamp),
(1, 1, 3, 4, current_timestamp),
(2, 1, 3, 1, current_timestamp),
(2, 1, 1, 2, current_timestamp),
(2, 1, 4, 3, current_timestamp),
(2, 1, 2, 4, current_timestamp),
(3, 1, 2, 2, current_timestamp),
(3, 1, 4, 3, current_timestamp),
(3, 1, 3, 4, current_timestamp),
(3, 1, 1, 2, current_timestamp),
(4, 1, 3, 1, current_timestamp),
(4, 1, 4, 3, current_timestamp),
(4, 1, 1, 2, current_timestamp),
(4, 1, 2, 4, current_timestamp);
 --poll 2
INSERT INTO votes (user_id, poll_id, user_vote, vote_rank, voted_at)
VALUES (1, 2, 1, 1, current_timestamp),
(1, 2, 2, 2, current_timestamp),
(1, 2, 4, 3, current_timestamp),
(1, 2, 3, 4, current_timestamp),
(2, 2, 3, 1, current_timestamp),
(2, 2, 1, 2, current_timestamp),
(2, 2, 4, 3, current_timestamp),
(2, 2, 2, 4, current_timestamp),
(3, 2, 2, 2, current_timestamp),
(3, 2, 4, 3, current_timestamp),
(3, 2, 3, 4, current_timestamp),
(3, 2, 1, 2, current_timestamp),
(4, 2, 3, 1, current_timestamp),
(4, 2, 4, 3, current_timestamp),
(4, 2, 1, 2, current_timestamp),
(4, 2, 2, 4, current_timestamp);

--poll 3
INSERT INTO votes (user_id, poll_id, user_vote, vote_rank, voted_at)
VALUES (1, 3, 1, 1, current_timestamp),
(1, 3, 2, 2, current_timestamp),
(1, 3, 4, 3, current_timestamp),
(1, 3, 3, 4, current_timestamp),
(2, 3, 3, 1, current_timestamp),
(2, 3, 1, 2, current_timestamp),
(2, 3, 4, 3, current_timestamp),
(2, 3, 2, 4, current_timestamp),
(3, 3, 2, 2, current_timestamp),
(3, 3, 4, 3, current_timestamp),
(3, 3, 3, 4, current_timestamp),
(3, 3, 1, 2, current_timestamp),
(4, 3, 3, 1, current_timestamp),
(4, 3, 4, 3, current_timestamp),
(4, 3, 1, 2, current_timestamp),
(4, 3, 2, 4, current_timestamp);

--poll 4
INSERT INTO votes (user_id, poll_id, user_vote, vote_rank, voted_at)
VALUES (1, 4, 1, 1, current_timestamp),
(1, 4, 2, 2, current_timestamp),
(1, 4, 4, 3, current_timestamp),
(1, 4, 3, 4, current_timestamp),
(2, 4, 3, 1, current_timestamp),
(2, 4, 1, 2, current_timestamp),
(2, 4, 4, 3, current_timestamp),
(2, 4, 2, 4, current_timestamp),
(3, 4, 2, 2, current_timestamp),
(3, 4, 4, 3, current_timestamp),
(3, 4, 3, 4, current_timestamp),
(3, 4, 1, 2, current_timestamp),
(4, 4, 3, 1, current_timestamp),
(4, 4, 4, 3, current_timestamp),
(4, 4, 1, 2, current_timestamp),
(4, 4, 2, 4, current_timestamp);


