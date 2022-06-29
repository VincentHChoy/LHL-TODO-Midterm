DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS polls CASCADE;
DROP TABLE IF EXISTS options CASCADE;
DROP TABLE IF EXISTS votes CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE polls (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_email VARCHAR(255),
  -- admin_link VARCHAR(255),
  -- submit_link VARCHAR(255),
  question_text VARCHAR(255) NOT NULL,
  created_at DATE NOT NULL,
<<<<<<< HEAD
  end_date DATE,
=======
  -- end_date DATE NOT NULL,
>>>>>>> master
  active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE options (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_email VARCHAR(255),
  poll_id INTEGER REFERENCES polls(id),
<<<<<<< HEAD
  option_text VARCHAR(255),
  description_text VARCHAR(255) 
=======
  option_text VARCHAR(255)
>>>>>>> master
);

CREATE TABLE votes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_email VARCHAR(255),
  user_name VARCHAR(255),
  poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE,
  opt1_rank INTEGER,
  opt2_rank INTEGER,
  opt3_rank INTEGER,
  opt4_rank INTEGER,
  voted_at TIMESTAMP
);
