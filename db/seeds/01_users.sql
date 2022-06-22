-- Users table seeds here (Example)
INSERT INTO users (name, email, password) 
VALUES ('Eva Stanley', 'sebastianguerra@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Louisa Meyer', 'jacksonrose@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Dominic Parks', 'victoriablackwell@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Roger Pelican', 'rogerpelican@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO polls (created_by, question_text, created_at, end_date, active)
VALUES (1, 'Where should we eat tonight?', CURRENT_TIME, 2022-09-22, TRUE),
(2, 'What movie should we watch this weekend?', CURRENT_TIME, 2022-09-22, TRUE),
(3, 'Which TV show is best?', CURRENT_TIME, 2022-09-22, TRUE),
(4, 'Which is the best travel destination?', CURRENT_TIME, 2022-09-22, TRUE);

INSERT INTO options (poll_id, option_text)
VALUES (1, 'Sunshine Diner'),
(1, 'Jam Cafe'),
(1, 'Au Comptoir'),
(1, 'Sophies Cosmic Cafe),
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


